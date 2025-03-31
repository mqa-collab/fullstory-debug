import configPlugins from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';

const { withDangerousMod } = configPlugins;

// Helper function to patch the file by replacing 'true' with 'false'
function patchRCTAppDelegate(contents) {
  const regex =
    /((?:-\s*\(BOOL\)|bool)\s+batchRenderingUpdatesInEventLoop\s*\(\)\s*(?:override\s*)?\{[\s\S]*?return\s+)(true)(\s*;)/;
  if (regex.test(contents)) {
    console.log('Custom Expo plugin withFullstoryBatchRenderingPlugin - Patching RCTAppDelegate.mm...');
    return contents.replace(regex, '$1false$3');
  }
  console.log(
    'Custom Expo plugin withFullstoryBatchRenderingPlugin - Did not match code RCTAppDelegate.mm...'
  );
  return null;
}

const withFullstoryBatchRenderingPlugin = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const filePath = path.join(
        projectRoot,
        'node_modules',
        'react-native',
        'Libraries',
        'AppDelegate',
        'RCTAppDelegate.mm'
      );

      console.log(
        'Custom Expo plugin withFullstoryBatchRenderingPlugin - while on react native 0.76, we need to patch a specific file in react native package'
      );

      if (fs.existsSync(filePath)) {
        let contents = fs.readFileSync(filePath, 'utf8');

        if (contents.match(/batchRenderingUpdatesInEventLoop[\s\S]*?return\s+false\s*;/)) {
          console.log(
            'Custom Expo plugin withFullstoryBatchRenderingPlugin - RCTAppDelegate.mm already patched.'
          );
        } else if (contents.match(/batchRenderingUpdatesInEventLoop[\s\S]*?return\s+true\s*;/)) {
          const newContents = patchRCTAppDelegate(contents);
          if (newContents) {
            fs.writeFileSync(filePath, newContents, 'utf8');
            console.log(
              'Custom Expo plugin withFullstoryBatchRenderingPlugin - RCTAppDelegate.mm written...'
            );
          }
        } else {
          console.warn(
            'Custom Expo plugin withFullstoryBatchRenderingPlugin - Could not find batchRenderingUpdatesInEventLoop method in RCTAppDelegate.mm.'
          );
        }
      } else {
        console.warn(
          'Custom Expo plugin withFullstoryBatchRenderingPlugin - RCTAppDelegate.mm file not found. Please ensure you are using a compatible version of react-native.'
        );
      }
      return config;
    }
  ]);
};

export default withFullstoryBatchRenderingPlugin;
