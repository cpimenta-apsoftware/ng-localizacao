import 'dotenv/config';
import { writeFile, mkdir } from 'fs';

const commonEnvironmentFile = `export const commonEnv = {
  production: false,
  environmentName: 'development',
  apiMapboxToken: '',
};
`;

const prodEnvironmentFile = `import { commonEnv } from "./environment.common";

const env: Partial<typeof commonEnv> = {
  production: true,  
  environmentName: 'production',
  apiMapboxToken: '${process.env.API_MAPBOX_TOKEN}',
};

// Export all settings of common replaced by dev options
export const environment = Object.assign(commonEnv, env);
`;

const stagingEnvironmentFile = `import { commonEnv } from "./environment.common";

const env: Partial<typeof commonEnv> = {
  production: true,  
  environmentName: 'staging',
  apiMapboxToken: '${process.env.API_MAPBOX_TOKEN}',
};

// Export all settings of common replaced by dev options
export const environment = Object.assign(commonEnv, env);
`;

const environmentFile = `import { commonEnv } from "./environment.common";

const env: Partial<typeof commonEnv> = {
  production: ${process.env.PRODUCTION},  
  environmentName: '${process.env.ENVIRONMENT_NAME}',
  apiMapboxToken: '${process.env.API_MAPBOX_TOKEN}',
};

// Export all settings of common replaced by dev options
export const environment = Object.assign(commonEnv, env);
`;

mkdir(__dirname + '/src/environments/', { recursive: true }, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    // Generate environment.common.ts file
    writeFile(__dirname + '/src/environments/environment.common.ts', commonEnvironmentFile, function (err) {
      console.log(__dirname);
      if (err) {
        throw console.error(err);
      } else {
        console.log(`Angular environment.common.ts file generated`);
      }
    });
    // Generate environment.prod.ts file
    writeFile(__dirname + '/src/environments/environment.prod.ts', prodEnvironmentFile, function (err) {
      console.log(__dirname);
      if (err) {
        throw console.error(err);
      } else {
        console.log(`Angular environment.prod.ts file generated`);
      }
    });
    // Generate environment.staging.ts file
    writeFile(__dirname + '/src/environments/environment.staging.ts', stagingEnvironmentFile, function (err) {
      console.log(__dirname);
      if (err) {
        throw console.error(err);
      } else {
        console.log(`Angular environment.staging.ts file generated`);
      }
    });
    // Generate environment.ts file
    writeFile(__dirname + '/src/environments/environment.ts', environmentFile, function (err) {
      console.log(__dirname);
      if (err) {
        throw console.error(err);
      } else {
        console.log(`Angular environment.ts file generated`);
      }
    });
  }
})

