import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

/**
 * getSecretClient: Get a secret client
 * @param url getSecretClient: Get a secret client
 * @param credentialType: The type of credential to use. Right now, only Default is available, but this was created to allow expanding credential types in the future.
 * @returns A SecretClient object
 */
export const getSecretClient = (
  url: string,
  credentialType: 'default' = 'default'
) => {
  switch (credentialType) {
    case 'default':
      return new SecretClient(url, new DefaultAzureCredential());
    default:
      return new SecretClient(url, new DefaultAzureCredential());
  }
};
