import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  OrganisationResponse,
  OrganisationVariables,
  ORGANISATION_QUERY,
} from "../queries/queries";
import {
  CreateBoardResponse,
  CreateBoardVariables,
  CREATE_BOARD,
  DeleteBoardVariables,
  DELETE_BOARD,
} from "../queries/mutations";
import { Tickets } from "./Tickets";
import { styles } from "./styles";
export interface BoardProps {
  companyId: string;
}

export const Boards: React.FunctionComponent<BoardProps> = ({ companyId }) => {
  const [boardName, setBoardName] = useState("");
  const [activeBoard, setActiveBoard] = useState("");

  const { loading: queryLoading, error: queryError, data } = useQuery<
    OrganisationResponse,
    OrganisationVariables
  >(ORGANISATION_QUERY, {
    variables: { organisationOrganisationId: companyId },
  });

  const [
    createBoard,
    { loading: createBoardLoading, error: createBoardError },
  ] = useMutation<CreateBoardResponse, CreateBoardVariables>(CREATE_BOARD, {
    refetchQueries: () => [
      {
        query: ORGANISATION_QUERY,
        variables: { organisationOrganisationId: companyId },
      },
    ],
  });

  const [deleteBoard] = useMutation<DeleteBoardVariables>(DELETE_BOARD, {
    refetchQueries: () => [
      {
        query: ORGANISATION_QUERY,
        variables: { organisationOrganisationId: companyId },
      },
    ],
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createBoard({
      variables: {
        putBoardOrganisationId: companyId,
        putBoardInput: {
          name: boardName,
        },
      },
    });
  };

  const handleDelete = (boardId: string) => {
    deleteBoard({
      variables: {
        deleteBoardOrganisationId: companyId,
        deleteBoardBoardId: boardId,
      },
    });
  };

  return (
    <div>
      {createBoardError || queryError ? <div>An Error has occurred</div> : null}
      {queryLoading || createBoardLoading ? (
        <div> Loading Boards... </div>
      ) : (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Board Name:
                <input
                  type="text"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {data?.organisation.boards.map((board) => {
              return (
                <div
                  style={styles.cardContainer}
                  onClick={() => setActiveBoard(board.id)}
                >
                  <div style={styles.cardTitle}>{board.name}</div>
                  <div
                    style={styles.cardDelete}
                    onClick={() => handleDelete(board.id)}
                  >
                    Delete
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {activeBoard ? (
              <Tickets companyId={companyId} boardId={activeBoard} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
