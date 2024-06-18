import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import UploadPage from "./pages/Upload";
import Retrieve from "./pages/Retrieve";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (provider) {
        try {
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Error loading blockchain data:", error);
        }
      } else {
        console.error("Metamask is not installed");
      }
    };

    loadBlockchainData();
  }, []);

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `f1b4603933fb7db48a72`,
          pinata_secret_api_key: `3476d3d84ae22fa03ca96eb03af773d8eea34013e2bf92d631992bad74c0b52e`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ipfsHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      await contract.add(account, ipfsHash);
      alert("Successfully uploaded image!");
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      alert("Unable to upload image to Pinata");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home account={account} contract={contract} />} />
          <Route path="/upload" element={<UploadPage handleFileUpload={handleFileUpload} account={account} provider={provider} contract={contract} />} />
          <Route path="/retrieve" element={<Retrieve contract={contract} account={account} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {!modalOpen && (
          <button className="share" onClick={handleModalOpen}>
            Share
          </button>
        )}
        {modalOpen && <Modal setModalOpen={handleModalClose} contract={contract} />}
        <footer className="footer">
          <p>&copy; 2024 Decentralized Drive. All rights reserved.</p>
          <p>Your secure and decentralized solution for document storage.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
