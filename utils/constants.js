export const CREATE_ETH_ACCOUNT = `
 mutation CreateEthAccount($input: CreateEthAccountInput!) {
    createEthAccount(input: $input) {
        document {
        id
        siteID
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

export const CREATE_SITE = `mutation CreateSite($input: CreateSiteInput!) {
    createSite(input: $input) {
      document {
        id
        name
      }
  }
}
`;
export const UPDATE_SITE = `mutation UpdateSiteMutation($input: UpdateSiteInput!){
  updateSite(input: $input) {
    document {
      id
    }
  }
}`
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

export const CREATE_FEATURED = `mutation CreateFeaturedMutation($input: CreateFeaturedInput!) {
 createFeatured(input: $input) {
    document {
      id
    }
  }
}
`;

export const subscriptionFragment = `fragment SubscriptionFragment on Subscription {
  id
  siteID
  subscribedID
	inactive
  createdAt
  updatedAt
}`
export const CREATE_SUBSCRIPTION = `mutation CreateSubscriptionMutation($input: CreateSubscriptionInput!) {
createSubscription(input: $input) {
    document {
      ...SubscriptionFragment
  }
}
}
${subscriptionFragment}
`

export const UPDATE_SUBSCRIPTION = `mutation UpdateSubscriptionMutation($input: UpdateSubscriptionInput!) {
  updateSubscription(input: $input) {
      document {
        id
    }
  }
}
`
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

export const defaultThemeColors = {
  "background": "#221F1F",
  "background_lighten_1": "#303030",
  "background_lighten_2": "#363B65",
  "background_darken_1": "#191919",
  "background_darken_2": "#141414",
  "primary": "#A020F0",
  "primary_lighten_1": "#BA52FB",
  "primary_darken_1": "#7918B5",
  "secondary": "#D027C1",
  "secondary_lighten_1": "#F24BE3",
  "secondary_darken_1": "#AD18A0",
  "surface": "#141414",
  "error": "#F44336",
  "info": "#2986CC",
  "success": "#51BF32",
  "warning": "#F1C232"
}