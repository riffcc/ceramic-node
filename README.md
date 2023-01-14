# ceramic-node
Ceramic tooling for Riff.CC. Required for the Riff.CC Ceramic Prototype.

## Requirements 

Install the hotfix version ceramic/cli and composedb/cli

```bash
yarn global add @ceramicnetwork/cli@hotfix
```
```bash
yarn global add @composedb/cli@next
```

## Usage

Install project packages.

```bash
yarn install
```

Generate DID private key

```bash
yarn run generate:private-key
```

Copy .env.example to .env and fill in PRIVATE_KEY
```bash
PRIVATE_KEY=
```

Fill in the node url variable, if you run your own node it should be http://localhost:7007
```bash
NODE_URL=
```

Run the Ceramic node for a few seconds and then stop it to generate a configuration file
```bash
yarn run ceramic-node
```

Create DID key from private key
```bash
yarn run generate:did-key <PRIVATE_KEY>
```

Copy the DID key and insert it into your node configuration file (normally this file will be at `~/.ceramic/daemon.config.json`)

```json
{
  "anchor": {},
  "http-api": {
    "cors-allowed-origins": [
      ".*"
    ],
    "admin-dids": [
      "did:key:<INSERT_DID_KEY_HERE>"
    ]
  },
  "ipfs": {
    "mode": "bundled"
  },
  "logger": {
    "log-level": 2,
    "log-to-files": false
  },
  "metrics": {
    "metrics-exporter-enabled": false
  },
  "network": {
    "name": "testnet-clay"
  },
  "node": {},
  "state-store": {
    "mode": "fs",
    "local-directory": "/home/user/.ceramic/statestore/"
  },
  "indexing": {
    "db": "sqlite:///home/user/.ceramic/indexing.sqlite",
    "allow-queries-before-historical-sync": true
  }
}
```

Run the ceramic node (we suggest using something like `screen` to keep it running in the background)

```bash
yarn run ceramic-node
```

Indexing composites at node

```bash
yarn run indexing:composites
```

Fill out ADMIN_ETH_ADDRESS on .env file to create an website admin. Must be a valid Ethereum Address
```bash
ADMIN_ETH_ADDRESS=
```

Create a new website

```bash
yarn run generate:website
```

For testing development you can execute graphql example queries.

```bash
yarn run graphql:example-queries
```
> This script generates a Test WebsiteID, must be copied into **riff.cc-data-manager-poc/.env.local**

Optionally you can run a GraphQL server with the GraphQL interface
```bash
yarn run graphql:server
```
