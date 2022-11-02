import { useEffect, useRef } from 'react';
import { Loader } from 'franklin-sites';
// import 'molstar/build/viewer/molstar';
import 'molstar/build/viewer/molstar.css';

import {
  DefaultPluginUISpec,
  PluginUISpec,
} from 'molstar/lib/mol-plugin-ui/spec';
import { createPluginAsync } from 'molstar/lib/mol-plugin-ui/index';
import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';

import useDataApi from '../../../shared/hooks/useDataApi';

const MySpec: PluginUISpec = {
  ...DefaultPluginUISpec(),
  layout: {
    initial: {
      isExpanded: false,
      showControls: false,
    },
  },
  config: [
    [PluginConfig.VolumeStreaming.Enabled, false],
    [PluginConfig.Viewport.ShowExpand, false],
    [PluginConfig.Viewport.ShowAnimation, false],
    [PluginConfig.Viewport.ShowControls, false],
    [PluginConfig.Viewport.ShowSelectionMode, false],
    [PluginConfig.Viewport.ShowSettings, false],
    [PluginConfig.General.EnableWboit, false],
  ],
};

async function createPlugin(parent: HTMLElement, raw: string) {
  const plugin = await createPluginAsync(parent, MySpec);

  const data = await plugin.builders.data.rawData(
    { data: raw },
    { state: { isGhost: true } }
  );
  const trajectory = await plugin.builders.structure.parseTrajectory(
    data,
    'pdb'
  );
  await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');

  return plugin;
}

// import 'molstar/build/viewer/molstar.css';

export const StructuralPrediction = ({ sequence }: { sequence: string }) => {
  const molstarContainer = useRef<HTMLDivElement>(null);
  const pluginUIContext = useRef<PluginUIContext>();
  const { data, loading, progress, error } = useDataApi<string>(
    'https://api.esmatlas.com/foldSequence/v1/pdb/',
    { method: 'POST', data: sequence }
  );

  useEffect(() => {
    if (molstarContainer.current && data) {
      createPlugin(molstarContainer.current, data).then((context) => {
        pluginUIContext.current = context;
      });
    }
    return () => {
      pluginUIContext.current?.dispose();
    };
  }, [data]);

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error) {
    return <>{error.response?.data}</>;
  }

  return (
    <div
      ref={molstarContainer}
      style={{ position: 'relative', width: '100%', height: '50vh' }}
    />
  );
};
