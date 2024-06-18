import React from "react";
import "./Home.css"; // Import the CSS file for Home component

const Home = ({ account }) => {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome to Decentralized Document Drive</h1>
        <p className="account-info">Account: {account ? account : "Not connected..."}</p>
      </div>
      <div className="description">
        <p>
          This is your secure and decentralized solution for document storage.
          Upload your documents securely to the blockchain-backed storage and
          retrieve them anytime.
        </p>
      </div>
      <div className="features">
        <div className="feature-item">
          <div className="card">
            <h2>Upload Documents</h2>
            <p>Select a file and securely upload it to IPFS via Ethereum blockchain.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="card">
            <h2>Retrieve Documents</h2>
            <p>Enter an Ethereum address to retrieve documents securely.</p>
          </div>
        </div>
        <div className="feature-item">
          <div className="card">
            <h2>Share Access</h2>
            <p>Share access to your documents securely with others.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
