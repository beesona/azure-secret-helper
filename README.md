# Azure KeyVault Tool (Secrets)

A simple tool for searching and getting values of secrets in Azure KeyVault.

## Getting Started

2. `npm install`
3. `tsc` (or whatever transpiler you use)
4. login to AZ CLI: `az login`
5. Searching all Secrets: `node dist/index --vault-url https://qa.vault.azure.net --name MY_SECRET --search`

- `--vault-url https://qa.vault.azure.net`: Your Azure KeyVault URL
- `--name MY_SECRET`: find will return all secrets with this arg in the name. (MY_SECRET, MY_SECRET2, NOT_MY_SECRET, etc.)
- `--search`: The app will perform a vault-wide secret search and return a collection of names that contain `--name`

6. Getting a Secret: `node dist/index --vault-url https://qa.vault.azure.net --name MY_SECRET`

- Everything is the same as the search, but by omitting the `--search`, you will get back the _value_ of the secret that matches `--name`

## Useful tips

- Create a bash, zsh, or powershell alias to make this accessible from the terminal(s).
- `alias qa-secret="node ~/my/source/secret-helper/dist/index --vault-url https://qa.vault.azure.net "`
- call from terminal with: `qa-secret--name MY_SECRET`
- add secret value directly to your clipboard with pbcopy: `qa-secret --name MY_SECRET | pbcopy`
