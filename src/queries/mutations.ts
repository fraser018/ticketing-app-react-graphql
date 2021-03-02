import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation PutBoardMutations(
    $putBoardOrganisationId: ID!
    $putBoardInput: BoardInput!
    $putBoardBoardId: ID
  ) {
    putBoard(
      organisationId: $putBoardOrganisationId
      input: $putBoardInput
      boardId: $putBoardBoardId
    ) {
      name
      id
      createdAt
      updatedAt
    }
  }
`;

export type CreateBoardResponse = {
  board: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type CreateBoardVariables = {};

export const DELETE_BOARD = gql`
  mutation DeleteBoardMutations(
    $deleteBoardOrganisationId: ID!
    $deleteBoardBoardId: ID!
  ) {
    deleteBoard(
      organisationId: $deleteBoardOrganisationId
      boardId: $deleteBoardBoardId
    )
  }
`;

export type DeleteBoardVariables = {
  deleteBoardOrganisationId: string;
  deleteBoardBoardId: string;
};

export const CREATE_TICKET = gql`
  mutation PutTicketMutations(
    $putTicketOrganisationId: ID!
    $putTicketBoardId: ID!
    $putTicketInput: TicketInput!
  ) {
    putTicket(
      organisationId: $putTicketOrganisationId
      boardId: $putTicketBoardId
      input: $putTicketInput
    ) {
      visible
      description
      name
      status
      id
      createdAt
      updatedAt
    }
  }
`;

export type CreateTicketResponse = {
  company: {
    visible: boolean;
    description: string;
    name: string;
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export enum ticketStatusEnum {
  DONE = "DONE",
  INPROGRESS = "INPROGRESS",
  TODO = "TODO",
}

export type CreateTicketVariables = {
  putTicketOrganisationId: string;
  putTicketBoardId: string;
  putTicketInput: {
    description: string;
    name: string;
    visible: boolean;
    status: ticketStatusEnum;
  };
};

export const DELETE_TICKET = gql`
  mutation Mutations(
    $deleteTicketOrganisationId: ID!
    $deleteTicketTicketId: ID!
  ) {
    deleteTicket(
      organisationId: $deleteTicketOrganisationId
      ticketId: $deleteTicketTicketId
    ) {
      id
    }
  }
`;

export type DeleteTicketVariables = {
  deleteTicketOrganisationId: string;
  deleteTicketTicketId: string;
};
