import React, { useState } from "react";
import FileUpload from "../components/FileUpload";

const UploadPage = ({ contract, account, provider }) => {
  return (
    <div className="page-container">
      <h1>Upload Page</h1>
      <FileUpload contract={contract} account={account} provider={provider} />
    </div>
  );
};

export default UploadPage;
