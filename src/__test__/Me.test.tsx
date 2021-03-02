import React from "react";
import { render, wait } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ME_QUERY } from "../queries/me";
import Me from "../components/Me";

const mocks = [
  {
    request: {
      query: ME_QUERY,
    },
    result: () => ({
      data: {
        me: {
          id: "123",
          firstName: "test",
          lastName: "user",
          email: "user@example.com",
        },
      },
    }),
  },
];

it("renders without error", async () => {
  const component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Me />
    </MockedProvider>
  );

  const loading = component.getByText("loading...");

  expect(loading).toBeDefined();
  //will not be in loading state
  await wait();
  const user = component.getByText("test user");
  expect(user).toBeDefined();
});
