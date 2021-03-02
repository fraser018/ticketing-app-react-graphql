import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  DeleteTicketVariables,
  DELETE_TICKET,
  EditTicketResponse,
  EditTicketVariables,
  EDIT_TICKET,
  ticketStatusEnum,
} from "../queries/mutations";
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
      {queryTicket || updatingTicket ? (
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
              backgroundColor: "#D8DAD3",
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
              backgroundColor: "#D8DAD3",
              width: 200,
            }}
          >
            {data?.ticket.visible === false ? (
              <div>{data?.ticket.description}</div>
            ) : (
              <div>
                This information is hidden. Edit ticket to change visibility.
              </div>
            )}
          </div>
          <div
            style={{
              margin: 20,
              padding: 3,
              borderRadius: 10,
              backgroundColor: "#D8DAD3",
              width: 200,
            }}
          >
            {data?.ticket.status}
          </div>
          <div
            style={{
              alignSelf: "flex-end",
              padding: 2,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#A4C2A5",
              height: 20,
              width: 60,
            }}
            onClick={() => setEditingTicket(true)}
          >
            Edit
          </div>
          <div
            style={{
              alignSelf: "flex-end",
              padding: 2,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#A4C2A5",
              height: 20,
              width: 60,
            }}
            onClick={() => handleDeleteTicket(ticketId)}
          >
            Delete
          </div>
        </div>
      )}
      {editingTicket ? (
        <div
          style={{
            margin: 20,
            borderRadius: 10,
            backgroundColor: "#A4C2A5",
            height: 150,
            width: 250,
          }}
        >
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
              <label>Hiddin:</label>
              <input
                name="isHidden"
                type="checkbox"
                checked={ticketVisible}
                onChange={(e) => setTicketVisible(!ticketVisible)}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : null}
    </div>
  );
};
