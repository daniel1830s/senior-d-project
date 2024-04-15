import React, { useState } from "react";
import Home from "../App.jsx";
import { uploadImage } from "../apis/uploadImageAPI.js";
import { grassReplace } from "../apis/grassReplaceAPI.js";

const GrassReplace = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [responseUrl, setResponseUrl] = useState("");
  const [loading, setLoadingBar] = useState(false);
  const [grassURL, setGrassURL] = useState("");
  const [currentPage, setCurrentPage] = useState("grass");

  const goHome = () => {
    setCurrentPage("home");
  };

  const uploadAndSetImage = async () => {
    try {
      const secureUrl = await uploadImage(imageSelected);
      setResponseUrl(secureUrl);
      setGrassURL("");
      console.log(secureUrl);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const replaceAndSetGrass = async () => {
    try {
      setLoadingBar(true);
      const data = await grassReplace(responseUrl);
      console.log(data);
      setGrassURL(data.result);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingBar(false);
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grass_replaced_image.jpg';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {currentPage === "grass" && (
        <div id="root-other">
          <h3 className='header-2'>Grass Replace</h3>
          <br />
          <div className='before-after'>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/Grass.jpg" width="300px" height="200px"></img>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/RightArrow4.jpg" width="200px" height="65px"></img>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/EnhancedGrass.jpg" width="300px" height="200px"></img>
          </div>
          <h3></h3>
          <input
            type="file"
            onChange={(event) => setImageSelected(event.target.files[0])}
          />
          <button onClick={uploadAndSetImage} className="my-button">
            Upload Image
          </button>
          <br />
          {responseUrl && !grassURL && (
            <button onClick={replaceAndSetGrass} className="my-button">
              Grass Replace
            </button>
          )}
          <br />
          {!grassURL && responseUrl && (
            <div className="image-container">
              {loading && <div className="spinner"></div>}
              <img src={responseUrl} width="800px" height="600px" alt="Enhanced Image" />
            </div>
          )}
          {grassURL && (
            <div className="image-container">
              <img src={grassURL} width="800px" height="600px" alt="Grass Replaced Image" />
            </div>
          )}
          <br />
          {grassURL && (
            <button onClick={() => handleDownload(grassURL)} className="my-button">
              Download
            </button>
          )}
          <br />
          <button onClick={goHome} className="my-button">
            Home
          </button>
        </div>
      )}

      {currentPage === "home" && <Home />}
    </div>
  );
}

export default GrassReplace;
