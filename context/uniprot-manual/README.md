# uniprot-manual

UniProt help content is generated from the markdown files contained within this GitHub repository. Once a page has been added/updated they should be available in the [help section](https://www.uniprot.org/help) of the website within a few minutes.

## Adding a new page

There is a "New Page" button at the top right of the wiki homepage https://github.com/ebi-uniprot/uniprot-manual/wiki

1. Click the "New page" button
2. Give your page a title. This title won't be displayed but will be what appears in the url for the help article
3. Paste the meta-data snippet below at the top of your page.

```
---
title:
categories:
---
```

4. The `title:` will be the title displayed on the page in the help centre.
5. `categories:` is a list of categories, or tags, which are used to filter the data in the help centre. It is comma separated. (e.g. `categories: Entry_information,manual`)
6. You can then write the page content underneath the meta-data snippet using markdown (see [here](https://guides.github.com/features/mastering-markdown/) for a guide).

## Adding an image

1. Head over to [the images directory](https://github.com/ebi-uniprot/uniprot-manual/tree/main/images)
2. You can drag and drop the image you would like to upload
3. Once the image has finished uploading, copy its url (right click on the actual image > copy image address)
4. You can then add that image to your article using [markdown syntax](https://guides.github.com/features/mastering-markdown/).

Note: to make sure you have the right URL for the image, check that its URL starts with `https://raw.githubusercontent.com/`

## Editing categories

Categories are used to group help articles, and are used to define filters in the search user interface. They are part of the meta-data snippet at the top of every page. Before adding or editing a category, check the syntax by looking at another article from the same category.

## Creating drafts

1.  If the file already exists navigate to this within the browser (eg `help/fungi.md`)
2.  Click the pencil icon to edit
3.  Copy the text content
4.  Within your browser navigate to the drafts directory
5.  In the top right click `Add file` > `Create new file`
6.  Name the file the same file which you've just copied (eg `drafts/fungi.md`)
7.  Paste the text content. Update as you desire.
8.  When you want to publish from the draft page click the pencil and copy the text content
9.  Navigate back to the original file (eg `help/fungi.md`)
10. Click the pencil icon and paste
11. At the bottom of the page add a commit message (or use the suggested), leave as Commit directly to the `main` branch, and click Commit changes
