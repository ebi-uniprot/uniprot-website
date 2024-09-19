const indent = (string: string, indentation = '  ', levels = 1) =>
  string
    .split('\n')
    .map(
      (line, index) => `${indentation.repeat(index === 0 ? 0 : levels)}${line}`
    )
    .join('\n');

export const requestSnippets = {
  generators: {
    // Default ones
    curl_bash: {
      title: 'cURL (bash)',
      syntax: 'bash',
    },
    // curl_powershell: {
    //   title: "cURL (PowerShell)",
    //   syntax: "powershell"
    // },
    // curl_cmd: {
    //   title: "cURL (CMD)",
    //   syntax: "bash"
    // },
    // Extra ones, need corresponding plugins added below
    python_requests: {
      title: 'requests (Python)',
      syntax: 'python',
    },
    js_fetch: {
      title: 'JS Fetch (JS / NodeJS)',
      syntax: 'javascript',
    },
    perl: {
      title: 'HTTP::Tiny (Perl)',
      syntax: 'perl',
    },
    r: {
      title: 'httr (R)',
      syntax: 'R',
    },
  },
  // Make sure to not display the other curls, even if they're not
  // in the "generators" field
  languages: ['curl_bash', 'python_requests', 'js_fetch', 'perl', 'r'],
  // Note that there's no apparent way to force an specific order
};

// Not really, but only this will be useful
// Also, not really a Map, but methods overlap
export type RequestMap = Map<
  'url' | 'method' | 'headers' | 'body',
  string | Map<string, string>
>;

type ParsedRequest = {
  url: URL;
  searchParams?: URLSearchParams;
  method?: string;
  headers: Headers;
  body?: Record<string, unknown>;
  isJSON: boolean;
};

const requestExtract = (request: RequestMap): ParsedRequest => {
  const url = new URL(request.get('url') as string);
  // Transforming to standard Headers to not care about casing
  const headers = new Headers(
    Object.fromEntries(
      (request.get('headers') as Map<string, string>).entries() || []
    )
  );

  return {
    url,
    searchParams: url.search ? new URLSearchParams(url.search) : undefined,
    method: request.get('method') as string,
    headers,
    body: JSON.parse((request.get('body') as string) || 'null'),
    isJSON: headers.get('Accept') === 'application/json',
  };
};

type SnippetGeneratorPlugin = {
  fn: Partial<
    Record<
      `requestSnippetGenerator_${keyof typeof requestSnippets.generators}`,
      (request: RequestMap) => string
    >
  >;
};

// PYTHON
const SnippetGeneratorPythonPlugin: SnippetGeneratorPlugin = {
  fn: {
    // use `requestSnippetGenerator_` + key from config (node_native) for generator fn
    requestSnippetGenerator_python_requests: (request) => {
      const { url, searchParams, method, headers, isJSON } =
        requestExtract(request);

      if (method === 'POST') {
        return '# No automatic snippet, work in progress';
      }

      return `import requests, sys${isJSON ? ', json' : ''}
${
  searchParams
    ? `
params = ${JSON.stringify(
        Object.fromEntries(searchParams),
        (key, value) => {
          if (key === 'fields') {
            return value.split(',');
          }
          return value;
        },
        2
      )}`
    : ''
}
headers = ${JSON.stringify(Object.fromEntries(headers.entries()), null, 2)}
base_url = "${url.origin + url.pathname}"

response = requests.get(base_url, headers=headers, params=params)
if not r.ok:
  r.raise_for_status()
  sys.exit()

data = response.${isJSON ? 'json()' : 'text'}

print(${isJSON ? 'json.dumps(data, indent=2)' : 'data'})
`;
    },
  },
};

// JAVASCRIPT
const SnippetGeneratorNodeJsPlugin: SnippetGeneratorPlugin = {
  fn: {
    // use `requestSnippetGenerator_` + key from config (node_native) for generator fn
    requestSnippetGenerator_js_fetch: (request) => {
      const { url, searchParams, method, headers, body, isJSON } =
        requestExtract(request);

      if (method === 'POST') {
        return '// No automatic snippet, work in progress';
      }

      return `// requirement: NodeJS >= 14.8.0, or Firefox, Chrome, or Edge >= 89
${
  searchParams
    ? `
const searchParams = new URLSearchParams(${JSON.stringify(
        Object.fromEntries(searchParams),
        (key, value) => {
          if (key === 'fields') {
            return value.split(',');
          }
          return value;
        },
        2
      )});`
    : ''
}
const url = \`${url.origin + url.pathname}${searchParams ? `?$\{searchParams}` : ''}\`;

const response = await fetch(url, {
  headers: ${indent(JSON.stringify(Object.fromEntries(headers.entries()), null, 2))},${
    method === 'GET'
      ? ''
      : `
  method: "${method}",`
  }${
    body
      ? `
  body: new FormData(${indent(JSON.stringify(body, null, 2))}),`
      : ''
  }
});
if (!response.ok) {
  throw new Error(\`$\{response.status}: $\{response.statusText}\`);
}

const data = await response.${isJSON ? 'json' : 'text'}();

console.log(data);
`;
    },
  },
};

// PERL
const SnippetGeneratorPerlPlugin: SnippetGeneratorPlugin = {
  fn: {
    // use `requestSnippetGenerator_` + key from config (node_native) for generator fn
    requestSnippetGenerator_perl: (request) => {
      const { url, method, headers, isJSON } = requestExtract(request);

      if (method === 'POST') {
        return '# No automatic snippet, work in progress';
      }

      return `# Perl not recommended, limited support
use strict;
use warnings;
use HTTP::Tiny;${isJSON ? '\nuse JSON;' : ''}

my $http = HTTP::Tiny->new();

my $url = '${url}';
my $response = $http->get($url, {
    headers => {
${Array.from(headers.entries())
  .map(
    ([key, value], index) =>
      `${index === 0 ? '' : ',\n'}        '${key}' = '${value}'`
  )
  .join('')}
    }
});

if (!$response->{success}) {
    die "Error " . $response->{status} . ": " . $response->{reason};
}

${
  isJSON
    ? `my $content = decode_json($response->{content});
use Data::Dumper;
print Dumper($content);`
    : `my $content = $response->{content};
print $content;`
}
`;
    },
  },
};

// R
const SnippetGeneratorRPlugin: SnippetGeneratorPlugin = {
  fn: {
    // use `requestSnippetGenerator_` + key from config (node_native) for generator fn
    requestSnippetGenerator_r: (request) => {
      const { url, searchParams, method, headers, isJSON } =
        requestExtract(request);

      if (method === 'POST') {
        return '# No automatic snippet, work in progress';
      }

      return `# R not recommended, limited support
# Install the required package if not already installed
# install.packages("httr")${isJSON ? '\n# install.packages("jsonlite")' : ''}

library(httr)${isJSON ? '\nlibrary(jsonlite)' : ''}

base_url <- "${url.origin + url.pathname}"${
        searchParams
          ? `
params <- list(
${Array.from(searchParams.entries())
  .map(
    ([key, value], index) => `${index === 0 ? '' : ',\n'}  ${key} = "${value}"`
  )
  .join('')}
)`
          : ''
      }

response <- GET(
  base_url,${
    searchParams
      ? `
  query = params,`
      : ''
  }
  add_headers(
${Array.from(headers.entries())
  .map(
    ([key, value], index) =>
      `${index === 0 ? '' : ',\n'}    ${key.includes('-') ? `\`${key}\`` : key} = "${value}"`
  )
  .join('')}
  )
)

if (http_status(response)$category != "Success") {
  stop(sprintf("Error %d: %s", status_code(response), http_status(response)$message))
}

${
  isJSON
    ? `data <- fromJSON(content(response, "text"))
print(data)`
    : `data <- content(response, "text")
cat(data)`
}
`;
    },
  },
};

export const snippetPlugins = [
  SnippetGeneratorPythonPlugin,
  SnippetGeneratorNodeJsPlugin,
  SnippetGeneratorPerlPlugin,
  SnippetGeneratorRPlugin,
] as const;
