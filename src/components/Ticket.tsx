import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  DeleteTicketVariables,
  DELETE_TICKET,
  EditTicketResponse,
  EditTicketVariables,
  EDIT_TICKET,
} from "../queries/mutations";
import {
  BOARD_QUERY,
  TicketResponse,
  TicketVariables,
  TICKET_QUERY,
} from "../queries/queries";
import { styles } from "./styles";

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
  const [editingTicket, setEditingTicket] = useState(false);
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [ticketVisible, setTicketVisible] = useState(false);
  const [ticketStatus, setTicketStatus] = useState("");

  const { loading: queryTicket, error: queryError, data } = useQuery<
    TicketResponse,
    TicketVariables
  >(TICKET_QUERY, {
    variables: { ticketOrganisationId: companyId, ticketTicketId: ticketId },
  });

  const [
    editTicket,
    { loading: updatingTicket, error: updatingTicketError },
  ] = useMutation<EditTicketResponse, EditTicketVariables>(EDIT_TICKET, {
    refetchQueries: () => [
      {
        query: BOARD_QUERY,
        variables: { boardOrganisationId: companyId, boardBoardId: boardId },
      },
    ],
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

  const handleSubmit = (e: any) => {
    setEditingTicket(false);
    e.preventDefault();
    editTicket({
      variables: {
        putTicketOrganisationId: companyId,
        putTicketBoardId: boardId,
        putTicketInput: {
          description: ticketDescription,
          name: ticketName,
          visible: ticketVisible,
          status: ticketStatus,
        },
        putTicketTicketId: ticketId,
      },
    });
  };

  const handleDeleteTicket = (ticketId: string) => {
    deleteTicket({
      variables: {
        deleteTicketOrganisationId: companyId,
        deleteTicketTicketId: ticketId,
      },
    });
  };

  return (
    <div>
      {updatingTicketError || deletingTicketError || queryError ? (
        <div>An Error has occurred</div>
      ) : null}
      {queryTicket || updatingTicket || deletingTicket ? (
        <div> Loading Ticket... </div>
      ) : (
        <div style={{ ...styles.cardContainer, height: 400 }}>
          <div style={styles.cardTitle}>{data?.ticket.name}</div>

          <div style={styles.cardDescription}>
            <div>{data?.ticket.description}</div>
          </div>
          <div style={styles.cardTitle}>{data?.ticket.status}</div>
          <div style={styles.cardButton} onClick={() => setEditingTicket(true)}>
            Edit
          </div>
          <div
            style={styles.cardButton}
            onClick={() => handleDeleteTicket(ticketId)}
          >
            Delete
          </div>
        </div>
      )}
      {editingTicket ? (
        <div style={styles.cardEditContainer}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Ticket Name:
                <input
                  type="text"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Ticket Description:
                <input
                  type="text"
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Status:
                <select
                  defaultValue="TODO"
                  value={ticketStatus}
                  onChange={(e) => setTicketStatus(e.target.value)}
                >
                  <option value="DONE">Done</option>
                  <option value="INPROGRESS">In Progrss</option>
                  <option selected value="TODO">
                    Todo
                  </option>
                </select>
              </label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : null}
    </div>
  );
};
