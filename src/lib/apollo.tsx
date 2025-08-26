import { toast } from '@/hooks/use-toast';
import { ApolloClient, ApolloLink, CombinedGraphQLErrors, CombinedProtocolErrors, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ErrorLink } from "@apollo/client/link/error";

const errorLink = new ErrorLink(({ error, result }) => {
  console.log(result, 'ier');
  if(result?.errors) {
    result.errors.forEach(({ message }) =>
      toast({
        title: message,
        variant: "destructive"
      })
    );
  } else if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) =>
      toast({
        title: message,
        variant: "destructive"
      })
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message }) =>
      toast({
        title: message,
        variant: "destructive"
      })
    );
  } else {
    toast({
      title: error.message,
      variant: "destructive"
    })

  }
});

// Mock GraphQL client setup
export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, new HttpLink({ uri: "https://supply-sight-backend-production.up.railway.app/graphql" })]),  // Mock endpoint
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'none',
    },
  },
});

// GraphQL Queries
export const GET_KPIS = gql`
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($filters: ProductFilters, $pagination: PaginationInput) {
    products(filters: $filters, pagination: $pagination) {
      items {
        id
        name
        sku
        warehouse {
          id
          name
        }
        stock
        demand
        status
      }
      total
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

// GraphQL Mutations
export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($productId: ID!, $demand: Int!) {
    updateDemand(productId: $productId, demand: $demand) {
      id
      demand
    }
  }
`;

export const TRANSFER_STOCK = gql`
  mutation TransferStock($productId: ID!, $fromWarehouse: ID!, $toWarehouse: ID!, $quantity: Int!) {
    transferStock(productId: $productId, fromWarehouse: $fromWarehouse, toWarehouse: $toWarehouse, quantity: $quantity) {
      id
      stock
    }
  }
`;