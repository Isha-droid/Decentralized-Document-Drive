import React from "react";
import Display from "../components/Display";

const RetrievePage = ({ contract, account }) => {
  return (
    <div className="page-container">
      <h1>Retrieve Page</h1>
      <Display contract={contract} account={account} />
    </div>
  );
};

export default RetrievePage;
