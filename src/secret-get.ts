import { getSecretClient } from './client-provider';

/**
 * getSecret: Get a secret from the vault
 * @param url: The URL of the vault
 * @param secretName: The name of the secret to get
 * @returns: The value of the secret
 */
export async function getSecret(
  url: string,
  secretName: string
): Promise<string | undefined> {
  let secret = undefined;
  try {
    const client = getSecretClient(url);
    secret = await client.getSecret(secretName);
  } catch (e) {
    throw new Error(`Error getting secret: ${e}`);
  }
  return secret.value;
}
