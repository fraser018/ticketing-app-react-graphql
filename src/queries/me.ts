import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

export type MeResponse = {
  me: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type MeVariables = {};
