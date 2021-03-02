import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreateTicketResponse,
  CreateTicketVariables,
  CREATE_TICKET,
} from "../queries/mutations";
import { BoardResponse, BoardVariables, BOARD_QUERY } from "../queries/queries";
import { Ticket } from "./Ticket";

export interface TicketProps {
  companyId: string;
  boardId: string;
}

export const Tickets: React.FunctionComponent<TicketProps> = ({
  companyId,
  boardId,
}) => {
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketName, setTicketName] = useState("");

  const { loading: queryLoading, error: queryError, data } = useQuery<
    BoardResponse,
    BoardVariables
  >(BOARD_QUERY, {
    variables: { boardOrganisationId: companyId, boardBoardId: boardId },
  });

  const [
    createTicket,
    { loading: creatingTicket, error: creatingTicketError },
  ] = useMutation<CreateTicketResponse, CreateTicketVariables>(CREATE_TICKET, {
    refetchQueries: () => [
      {
        query: BOARD_QUERY,
        variables: { boardOrganisationId: companyId, boardBoardId: boardId },
      },
    ],
  });

  if (queryLoading) {
    return <>loading...</>;
  }
  if (queryError) {
    return <>Error</>;
  }

  if (data === undefined) {
    throw new Error("unexpected state");
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createTicket({
      variables: {
        putTicketOrganisationId: companyId,
        putTicketBoardId: boardId,
        putTicketInput: {
          description: ticketDescription,
          name: ticketName,
          visible: true,
          status: "TODO",
        },
      },
    });
  };

  return (
    <>
      <div>
        <h1>{data.board.name}</h1>
      </div>
      <div>
        <h1> Create a new ticket below or pick an existing one:</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Ticket Name:
            <input
              type="text"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
            />
          </label>
          <label>
            Ticket Description:
            <input
              type="text"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {data.board.tickets.map((ticket) => {
          return (
            <Ticket
              companyId={companyId}
              ticketId={ticket.id}
              boardId={boardId}
            />
          );
        })}
      </div>
    </>
  );
};
