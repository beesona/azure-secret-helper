import { getSecretClient } from './client-provider';

/**
 * searchSecret: Find a secret in the vault
 * @param url: The URL of the vault
 * @param secretName: The name of the secret to find
 * @returns: An array of secret names that match the search
 */
export async function searchSecret(
  url: string,
  secretName: string
): Promise<string[]> {
  let filteredResults: string[] = [];
  try {
    const client = getSecretClient(url);
    let results: string[] = [];
    for await (let secretProperties of client.listPropertiesOfSecrets()) {
      results.push(secretProperties.name);
    }
    filteredResults = results.filter((result: string) => {
      return result.includes(secretName);
    });
  } catch (e) {
    throw new Error(`Error searching for secret: ${e}`);
  }
  return filteredResults;
}
