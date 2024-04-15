import React, { useState } from 'react';
import Home from '../App.jsx';
import { uploadImage } from '../apis/uploadImageAPI.js';
import { virtualStage } from '../apis/virtualStageAPI.js';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const VirtualStage = () => {
  const [imageSelected, setImageSelected] = useState('');
  const [responseUrl, setResponseUrl] = useState('');
  const [loading, setLoadingBar] = useState(false);
  const [virtualStageURL, setVirtualStageURL] = useState('');
  const [roomType, setRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState('stage');

  const goHome = () => {
    setCurrentPage('home');
  };

  const uploadAndSetImage = async () => {
    try {
      const secureUrl = await uploadImage(imageSelected);
      setResponseUrl(secureUrl);
      setVirtualStageURL('');
      console.log(secureUrl);
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const stageAndSetImage = async () => {
    try {
      setLoadingBar(true);
      const data = await virtualStage(responseUrl, roomType);
      console.log(data);
      setVirtualStageURL(data.result);
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingBar(false);
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'staged_image.jpg';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {currentPage === 'stage' && (
        <div id="root-other">
          <h3 className='header-2'>Stage</h3>
          <br />
          <div className='before-after'>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/Stage.jpg" width="300px" height="200px"></img>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/RightArrow4.jpg" width="200px" height="65px"></img>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/EnhancedStage.jpg" width="300px" height="200px"></img>
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
            <DropdownButton className="dropdown" id="dropdown-basic-button" title="Set Room Type">
              <Dropdown.Item onClick={() => setRoomType('kitchen')}>
                Kitchen
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRoomType('living room')}>
                Living Room
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRoomType('bedroom')}>
                Bedroom
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setRoomType('bathroom')}>
                Bathroom
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <br />
          {responseUrl && !virtualStageURL && (
            <button onClick={stageAndSetImage} className="my-button">
              Stage
            </button>
          )}
          <br />
          {!virtualStageURL && responseUrl && (
            <div className="image-container">
              {loading && <div className="spinner"></div>}
              <img src={responseUrl} width="800px" height="600px" alt="Enhanced Image" />
            </div>
          )}
          {virtualStageURL && (
            <div className="image-container">
              <img src={virtualStageURL} width="800px" height="600px" alt="Enhanced Image" />
            </div>
          )}
          <br />
          {virtualStageURL && (
            <button onClick={() => handleDownload(virtualStageURL)} className="my-button">
              Download
            </button>
          )}
          <br />
          <button onClick={goHome} className="my-button">
            Home
          </button>
        </div>
      )}

      {currentPage === 'home' && <Home />}
    </div>
  );
}

export default VirtualStage;
