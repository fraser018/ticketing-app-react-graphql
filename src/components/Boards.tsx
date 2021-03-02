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
    { loading: mutationLoading, error: mutationError },
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
    <div style={{ borderColor: "red", borderWidth: 2 }}>
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
        {data.organisation.boards.map((board) => {
          return (
            <div
              onClick={() => setActiveBoard(board.id)}
              style={{
                margin: 50,
                width: 100,
                height: 100,
                backgroundColor: "grey",
              }}
            >
              <div>{board.name}</div>
              <div onClick={() => handleDelete(board.id)}>Delete</div>
            </div>
          );
        })}
      </div>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
};
