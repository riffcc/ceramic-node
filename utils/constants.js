export const CREATE_ETH_ACCOUNT = `
 mutation CreateEthAccount($input: CreateEthAccountInput!) {
    createEthAccount(input: $input) {
        document {
        id
        websiteID
        address
      }
    }
  }
`;

export const UPDATE_ETH_ACCOUNT = `
  mutation UpdateEthAccount($input: UpdateEthAccountInput!) {
    updateEthAccount(input: $input) {
      document {
        id
      }
    }
  }
`;

export const GET_ETH_ACCOUNT = `
query EthAccountQuery($filters: EthAccountFiltersInput) {
  ethAccountIndex(first: 10, filters: $filters) {
    edges {
      node {
        id
        address
        isAdmin
        isSuperAdmin
        createdAt
        updatedAt
      }
    }
  }
}
`

export const CREATE_WEBSITE = `
  mutation CreateWebsite($input: CreateWebsiteInput!) {
      createWebsite(input: $input) {
				document {
					id
					name
				}
    }
  }
`;

export const CREATE_PIECE = `
  mutation CreatePiece($input: CreatePieceInput!) {
    createPiece(input: $input) {
      document {
        id
      }
    }
  }
`;
export const CREATE_PIN = `
  mutation CreatePin($input: CreatePinInput!) {
    createPin(input: $input) {
      document {
        id
      }
    }
  }
`;
export const UPDATE_PIN = `
  mutation UpdatePin($input: UpdatePinInput!) {
    updatePin(input: $input) {
      document {
        id
      }
    }
  }
`;
export const CREATE_CATEGORY = `
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      document {
        id
        name
      }
    }
  }
`;
export const CREATE_SUBSCRIPTION = `
  mutation CreateSubscription($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
    document {
        id
        websiteID
        subscribedID
      }
    }
  }
`;

export const pieceCategories = [
  "TV Shows",
  "Movies",
  "Audiobooks",
  "Games",
  "Books",
  "Music",
  "Videos",
  "Other",
];
