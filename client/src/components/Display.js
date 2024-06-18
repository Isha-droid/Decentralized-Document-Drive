import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [inputAddress, setInputAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getData = async () => {
    try {
      let dataArray;
      if (inputAddress) {
        dataArray = await contract.display(inputAddress);
      } else {
        dataArray = await contract.display(account);
      }
      if (dataArray && dataArray.length > 0) {
        const images = dataArray.map((item, index) => (
          <a
            href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt={`Image ${index}`}
              className="image-item"
            />
          </a>
        ));
        setData(images);
        setErrorMessage("");
      } else {
        setData([]);
        setErrorMessage("No images to display");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setInputAddress(e.target.value.trim());
  };

  return (
    <div className="display-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Address"
          className="address-input"
          onChange={handleInputChange}
        />
        <button className="fetch-button" onClick={getData}>
          Get Data
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="image-list">
        {data.length > 0 ? (
          data
        ) : (
          <p className="no-images-msg">No images to display</p>
        )}
      </div>
    </div>
  );
};

export default Display;
