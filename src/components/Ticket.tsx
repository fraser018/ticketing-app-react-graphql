import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { DeleteTicketVariables, DELETE_TICKET } from "../queries/mutations";
import {
  BOARD_QUERY,
  TicketResponse,
  TicketVariables,
  TICKET_QUERY,
} from "../queries/queries";

export interface TicketProps {
  companyId: string;
  ticketId: string;
  boardId: string;
}

export const Ticket: React.FunctionComponent<TicketProps> = ({
  companyId,
  ticketId,
  boardId,
}) => {
  const { loading: queryTicket, error: queryError, data } = useQuery<
    TicketResponse,
    TicketVariables
  >(TICKET_QUERY, {
    variables: { ticketOrganisationId: companyId, ticketTicketId: ticketId },
  });

  const [
    deleteTicket,
    { loading: deletingTicket, error: deletingTicketError },
  ] = useMutation<DeleteTicketVariables>(DELETE_TICKET, {
    refetchQueries: () => [
      {
        query: BOARD_QUERY,
        variables: { boardOrganisationId: companyId, boardBoardId: boardId },
      },
    ],
  });

  const handleDeleteTicket = (ticketId: string) => {
    deleteTicket({
      variables: {
        deleteTicketOrganisationId: companyId,
        deleteTicketTicketId: ticketId,
      },
    });
  };

  return (
    <>
      {queryTicket ? (
        <div> Loading Ticket... </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 20,
            borderRadius: 10,
            backgroundColor: "#F1F2EB",
            height: 400,
            width: 250,
          }}
        >
          <div
            style={{
              margin: 20,
              padding: 3,
              borderRadius: 10,
              backgroundColor: "#A4C2A5",
              width: 200,
            }}
          >
            {data?.ticket.name}
          </div>
          <div
            style={{
              flex: 1,
              padding: 2,
              margin: 20,
              borderRadius: 10,
              backgroundColor: "#A4C2A5",
              width: 200,
            }}
          >
            {data?.ticket.description}
          </div>

          <div
            style={{
              alignSelf: "flex-end",
              padding: 2,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#566246",
              height: 20,
              width: 60,
            }}
            onClick={() => handleDeleteTicket(ticketId)}
          >
            Delete
          </div>
        </div>
      )}
    </>
  );
};
