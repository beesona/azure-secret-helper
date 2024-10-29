import { getSecret } from './secret-get';
import { searchSecret } from './secret-search';

const AZURE_URL = process.env.SECRET_HELPER_CONSOLE_URL;
let isSearch = false;
let openInConsole = false;
let secretName = '';
let envUrl = '';
try {
  process.argv.forEach((arg) => {
    if (arg === '--console') {
      if (!AZURE_URL) {
        console.error(
          'Please provide a SECRET_HELPER_CONSOLE_URL environment variable'
        );
        process.exit(1);
      }
      openInConsole = true;
    }
    if (arg === '--search') {
      isSearch = true;
    }
    if (arg === '--vault-url') {
      envUrl = process.argv[process.argv.indexOf(arg) + 1];
    }
    if (arg === '--name') {
      secretName = process.argv[process.argv.indexOf(arg) + 1];
      // This is optional, but my use case requires it and I'm leaving it in.
      secretName = secretName.replace(/_/g, '-');
    }
  });
} catch (e) {
  console.error(`Error parsing arguments: ${e}`);
}

if (!secretName) {
  console.error('Please provide a --name argument');
  process.exit(1);
}

if (!envUrl) {
  console.error('Please provide a --vault-url argument');
  process.exit(1);
}
try {
  if (openInConsole) {
    const { exec } = require('child_process');
    exec(
      `open ${AZURE_URL}${envUrl}/secrets/${secretName}`,
      (err: any, stdout: any, stderr: any) => {
        if (err) {
          // node couldn't execute the command
          return;
        }

        console.log(`${AZURE_URL}${envUrl}/secrets/${secretName}`);
        process.exit(0);
      }
    );
  }
  if (isSearch) {
    searchSecret(envUrl, secretName).then((secrets) => {
      console.log(secrets);
      process.exit(0);
    });
  } else {
    getSecret(envUrl, secretName).then((secret) => {
      console.log(secret?.value);
      process.exit(0);
    });
  }
} catch (e) {
  console.error(`Error: ${e}`);
  process.exit(1);
}
