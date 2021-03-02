import React from "react";
import "./App.css";
import { Boards } from "./components/Boards";
import { companyId } from ".";

function App() {
  return (
    <div className="App">
      <div>
        <h1> Ticket System</h1>
        <h3>Please select a ticketing board.</h3>
      </div>
      <div>
        <Boards companyId={companyId} />
      </div>
    </div>
  );
}

export default App;
