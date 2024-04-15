import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Home from "../App.jsx";
import { uploadImage } from "../apis/uploadImageAPI.js";
import { virtualStage } from "../apis/virtualStageAPI.js";

const VirtualRefurnish = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [responseUrl, setResponseUrl] = useState("");
  const [loading, setLoadingBar] = useState(false);
  const [virtualRefurnishURL, setVirtualRefurnishURL] = useState("");
  const [roomType, setRoomType] = useState("");
  const [arcStyle, setArcStyle] = useState("");
  const [currentPage, setCurrentPage] = useState("refurnish");

  const goHome = () => {
    setCurrentPage("home");
  };

  const uploadAndSetImage = async () => {
    try {
      const secureUrl = await uploadImage(imageSelected);
      setResponseUrl(secureUrl);
      setVirtualRefurnishURL("");
      console.log(secureUrl);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const refurnishAndSetImage = async () => {
    try {
      setLoadingBar(true);
      const data = await virtualStage(responseUrl, roomType);
      console.log(data);
      setVirtualRefurnishURL(data.result);
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
    link.download = 'refurnished_image.jpg';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {currentPage === "refurnish" && (
        <div id="root-other">
          <h3 className="header-2">Refurnish</h3>
          <br />
          <div className="before-after">
            <img
              src="https://res.cloudinary.com/dlllanhrs/image/upload/v1712674173/Button%20Images/PreRefurnish.jpg"
              width="300px"
              height="200px"
            ></img>
            <img
              src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/RightArrow4.jpg"
              width="200px"
              height="65px"
            ></img>
            <img
              src="https://res.cloudinary.com/dlllanhrs/image/upload/v1712674621/Button%20Images/Refurnished.png"
              width="300px"
              height="200px"
            ></img>
          </div>
          <h3></h3>
          <input
            id="file"
            type="file"
            onChange={(event) => setImageSelected(event.target.files[0])}
          />
          <button onClick={uploadAndSetImage} className="my-button">
            Upload Image
          </button>
          <ButtonGroup>
            <DropdownButton
              className="dropdown"
              id="dropdown-basic-button"
              title="Set Room Type"
            >
              <Dropdown.Item onClick={() => setRoomType("kitchen")}>
                Kitchen
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRoomType("living room")}>
                Living Room
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRoomType("bedroom")}>
                Bedroom
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRoomType("bathroom")}>
                Bathroom
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              className="dropdown"
              id="dropdown-basic-button"
              title="Select Architecture Style"
            >
              <Dropdown.Item onClick={() => setArcStyle("modern")}>
                Modern
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("traditional")}>
                Traditional
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("italian")}>
                Italian
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("mediterranean")}>
                Mediterranean
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("contemporary")}>
                Contemporary
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("coastal")}>
                Coastal
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("rustic")}>
                Rustic
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("wooden")}>
                Wooden
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("scandinavian")}>
                Scandinavian
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setArcStyle("industrial")}>
                Industrial
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <br />
          {responseUrl && !virtualRefurnishURL && (
            <button onClick={refurnishAndSetImage} className="my-button">
              Refurnish
            </button>
          )}
          <br />
          {!virtualRefurnishURL && responseUrl && (
            <div className="image-container">
              {loading && <div className="spinner"></div>}
              <img
                src={responseUrl}
                width="800px"
                height="600px"
                alt="Enhanced Image"
              />
            </div>
          )}
          {virtualRefurnishURL && (
            <div className="image-container">
              <img
                src={virtualRefurnishURL}
                width="800px"
                height="600px"
                alt="Refurnished Image"
              />
            </div>
          )}
          <br />
          {virtualRefurnishURL && (
            <button
              onClick={() => handleDownload(virtualRefurnishURL)}
              className="my-button"
            >
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
};

export default VirtualRefurnish;
