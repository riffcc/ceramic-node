# Riff.CC Ceramic-Node

This repository hosts the Ceramic-Node tooling for the Riff.CC project; although part of the main Ceramic and ComposeDB platforms, and not developed by Riff.CC itself, it is required for the [Riff.CC on Ceramic](https://github.com/riffcc/ceramic-riff-web) prototype. This page **only** contains instructions on how to install ceramic-node in the context of setting up CeramicRiff, and assumes the reader viewed this from the CeramicRiff installation intructions; for general information about CeramicRiff or the main Riff.CC project as a whole, please see their respective pages.

## Getting Started

As before, although Ceramic-Node will work on any standard Linux distribution where standard utilities like a webserver and Node.JS are available, the instructions assume the reader is using **the latest LTS releases of Debian or Ubuntu**.

### Dependencies

1. Ensure that **Node.JS** and **yarn** are installed. The CeramicRiff installation guide already covers those.

2. Install the required global packages `ceramic/cli` and `composedb/cli`:

```bash
yarn global add @ceramicnetwork/cli
yarn global add @composedb/cli
```

### Installation

1. Clone ceramic-node's GitHub repository:

```bash
git clone https://github.com/riffcc/ceramic-node.git
```

2. Move into ceramic-node's directory and set up its installation packages:

```bash
cd ceramic-node
yarn install
```

3. Generate a DID private key:

```bash
yarn run generate:private-key
```

4. Copy `.env.example` to `.env` and fill in the `PRIVATE_KEY` field:

```bash
PRIVATE_KEY=
```

5. Fill in the node url variable:
    - **Tip:** If you're running your own node, you should input `http://localhost:7007`.
```bash
NODE_URL=
```

6. Run the Ceramic node for a few seconds, and then stop it to generate a configuration file:

```bash
yarn run ceramic-node
```

7. Create a DID key from private key:

```bash
yarn run generate:did-key <PRIVATE_KEY>
```

8. Copy the DID key and insert it into your node configuration file, normally located in `~/.ceramic/daemon.config.json`:

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
    "allow-queries-before-historical-sync": false
  }
}
```

9. Run the ceramic-node instance:
    - **Tip:** We suggest using something like `screen` to keep it running in the background.
```bash
yarn run ceramic-node
```

10. Index the composites on your node:

```bash
yarn run index:composites
```

11. Fill out ADMIN_ETH_ADDRESS on the .env file to create an website admin:
    - **Note:** It *must* be a valid Ethereum Address!
```bash
ADMIN_ETH_ADDRESS=
```

12. Create a new website:

```bash
yarn run generate:website
```

## Configuration

* For testing development, you can execute graphql example queries. This command generates a Test WebsiteID, which must be copied into `riff.cc-data-manager-poc/.env.local`:

```bash
yarn run graphql:example-queries
```

* In order for users and admins to create and modify documents, it is required to run the Admin Server API:

```bash
yarn run admin:server
```

For more info about the API, see the [ADMIN-SERVER-API](https://github.com/riffcc/ceramic-node/blob/main/ADMIN-SERVER-API.md) documentation file.

* Optionally, you can run a GraphQL server with the GraphQL interface:

```bash
yarn run graphql:server
```
