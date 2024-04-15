import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Home from "../App.jsx";
import { uploadImage } from "../apis/uploadImageAPI.js";
import { virtualRenovate } from "../apis/virtualRenovateAPI.js";

const VirtualRenovate = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [responseUrl, setResponseUrl] = useState("");
  const [loading, setLoadingBar] = useState(false);
  const [virtualRenovateURL, setVirtualRenovateURL] = useState("");
  const [roomType, setRoomType] = useState("");
  const [selectedSurface, toggleItem] = useState([]);
  const [currentPage, setCurrentPage] = useState("renovate");

  const goHome = () => {
    setCurrentPage("home");
  };

  const uploadAndSetImage = async () => {
    try {
      const secureUrl = await uploadImage(imageSelected);
      setResponseUrl(secureUrl);
      setVirtualRenovateURL("");
      console.log(secureUrl);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const renovateAndSetImage = async () => {
    try {
      setLoadingBar(true);
      const data = await virtualRenovate(responseUrl, roomType, selectedSurface);
      console.log(data);
      setVirtualRenovateURL(data.result);
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
    link.download = 'renovated_image.jpg';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {currentPage === "renovate" && (
        <div id="root-other">
          <h3 className="header-2">Renovate</h3>
          <br />
          <div className="before-after">
            <img
              src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/Bathroom.jpg"
              width="300px"
              height="200px"
            ></img>
            <img
              src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/RightArrow4.jpg"
              width="200px"
              height="65px"
            ></img>
            <img
              src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/EnhancedRenovate.jpg"
              width="300px"
              height="200px"
            ></img>
          </div>
          <h3></h3>
          <input
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
              title="Select Surfaces"
            >
              <Dropdown.Item
                onClick={() =>
                  toggleItem(
                    selectedSurface.includes("wall")
                      ? selectedSurface.filter(
                          (surface) => surface !== "wall"
                        )
                      : [...selectedSurface, "wall"]
                  )
                }
              >
                Wall
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  toggleItem(
                    selectedSurface.includes("ceiling")
                      ? selectedSurface.filter(
                          (surface) => surface !== "ceiling"
                        )
                      : [...selectedSurface, "ceiling"]
                  )
                }
              >
                Ceiling
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  toggleItem(
                    selectedSurface.includes("floor")
                      ? selectedSurface.filter(
                          (surface) => surface !== "floor"
                        )
                      : [...selectedSurface, "floor"]
                  )
                }
              >
                Floor
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <br />
          {responseUrl && !virtualRenovateURL && (
            <button onClick={renovateAndSetImage} className="my-button">
              Renovate
            </button>
          )}
          <br />
          {!virtualRenovateURL && responseUrl && (
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
          {virtualRenovateURL && (
            <div className="image-container">
              <img
                src={virtualRenovateURL}
                width="800px"
                height="600px"
                alt="Enhanced Image"
              />
            </div>
          )}
          <br />
          {virtualRenovateURL && (
            <button onClick={() => handleDownload(virtualRenovateURL)} className="my-button">
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

export default VirtualRenovate;
