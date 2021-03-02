import { gql } from "@apollo/client";

// export const ORGANISATION_QUERY = gql`
//   query Query($organisationOrganisationId: ID!) {
//     organisation(organisationId: $organisationOrganisationId) {
//       timezone
//       name
//       createdAt
//       updatedAt
//       id
//       boards {
//         name
//         id
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `;
export const ORGANISATION_QUERY = gql`
  query Query($organisationOrganisationId: ID!) {
    organisation(organisationId: $organisationOrganisationId) {
      name
      id
      boards {
        name
        id
        tickets {
          visible
          description
          name
          status
          id
        }
      }
    }
  }
`;

export type OrganisationResponse = {
  organisation: {
    name: string;
    id: string;
    boards: [
      {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tickets: [
          {
            name: string;
            id: string;
            description: string;
            status: string;
            visible: boolean;
          }
        ];
      }
    ];
  };
};

export type OrganisationVariables = {
  organisationOrganisationId: string;
};

export const BOARD_QUERY = gql`
  query Query($boardOrganisationId: ID!, $boardBoardId: ID!) {
    board(organisationId: $boardOrganisationId, boardId: $boardBoardId) {
      name
      id
      createdAt
      updatedAt
      tickets {
        name
        visible
        description
        status
        id
        createdAt
        updatedAt
      }
    }
  }
`;

export type BoardResponse = {
  board: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    tickets: [
      {
        name: string;
        visible: boolean;
        description: string;
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
      }
    ];
  };
};

export type BoardVariables = {};

export const TICKET_QUERY = gql`
  query Query($ticketOrganisationId: ID!, $ticketTicketId: ID!) {
    ticket(organisationId: $ticketOrganisationId, ticketId: $ticketTicketId) {
      id
      name
      description
      visible
      status
      createdAt
      updatedAt
    }
  }
`;

export type TicketResponse = {
  ticket: {
    name: string;
    id: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    visible: boolean;
  };
};

export type TicketVariables = {
  ticketOrganisationId: string;
  ticketTicketId: string;
};
