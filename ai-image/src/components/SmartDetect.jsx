import React, { useState } from 'react';
import Home from "../App.jsx";
import { smartDetect } from "../apis/smartDetectionAPI.js";
import { uploadImage } from "../apis/uploadImageAPI.js";

const DetectImage = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [responseUrl, setResponseUrl] = useState("");
  const [loading, setLoadingBar] = useState(false);
  const [detectedImageURL, setDetectedImage] = useState("");
  const [currentPage, setCurrentPage] = useState("detect");

  const goHome = () => {
    setCurrentPage("home");
  };

  const uploadAndSetImage = async () => {
    try {
      const secureUrl = await uploadImage(imageSelected);
      setResponseUrl(secureUrl);
      console.log(secureUrl);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const detectAndSetImage = async () => {
    try {
      setLoadingBar(true);
      const data = await smartDetect(responseUrl);
      console.log(data);
      setDetectedImage(data.result);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingBar(false);
    }
  };

  return (
    <div>
      {currentPage === "detect" && (
        <div id="root-other">
          <h3 className="header-2">Smart Detection</h3>
          <br />
          <input
            type="file"
            onChange={(event) => setImageSelected(event.target.files[0])}
          />
          <button onClick={uploadAndSetImage} className="my-button">
            Upload Image
          </button>
          <br />
          {responseUrl && !detectedImageURL && (
            <button onClick={detectAndSetImage} className="my-button">
              Detect Image
            </button>
          )}
          <br />
          <button onClick={goHome} className="my-button">
            Home
          </button>
          <br />
          {!detectedImageURL && responseUrl && (
            <div className="image-container">
              {loading && <div className="spinner"></div>}
              <img
                src={responseUrl}
                width="800px"
                height="600px"
                alt="Detected Image"
              />
            </div>
          )}
          {detectedImageURL && (
            <div className="image-container">
              <img
                src={detectedImageURL}
                width="800px"
                height="600px"
                alt="Detected Image"
              />
            </div>
          )}
          <br />
          {detectedImageURL && (
            <button
              onClick={() => handleDownload(detectedImageURL)}
              className="my-button"
            >
              Download
            </button>
          )}
        </div>
      )}

      {currentPage === "home" && <Home />}
    </div>
  );
};

export default DetectImage;
