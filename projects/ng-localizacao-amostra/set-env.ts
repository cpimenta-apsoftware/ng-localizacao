import 'dotenv/config';
import { writeFile } from 'fs'; 

const environmentFile = `import { commonEnv } from "./environment.common";

const env: Partial<typeof commonEnv> = {
  production: ${process.env.PRODUCTION},  
  environmentName: '${process.env.ENVIRONMENT_NAME}',
  apiMapboxToken: '${process.env.API_MAPBOX_TOKEN}',
};

// Export all settings of common replaced by dev options
export const environment = Object.assign(commonEnv, env);
`;

// Generate environment.ts file
writeFile(__dirname + '/src/environments/environment.ts', environmentFile, function (err) {
  console.log(__dirname);
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated`);
  }
});