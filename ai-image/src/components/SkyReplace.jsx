import React, { useState } from 'react';
import Home from '../App.jsx';
import { uploadImage } from '../apis/uploadImageAPI.js';
import { skyReplace } from '../apis/skyReplaceAPI.js';

const SkyReplace = () => {
  const [imageSelected, setImageSelected] = useState('');
  const [responseUrl, setResponseUrl] = useState('');
  const [loading, setLoadingBar] = useState(false);
  const [skyURL, setSkyURL] = useState('');
  const [currentPage, setCurrentPage] = useState('sky');

  const goHome = () => {
    setCurrentPage('home');
  };

  const uploadAndSetImage = async () => {
    try {
      const secureUrl = await uploadImage(imageSelected);
      setResponseUrl(secureUrl);
      setSkyURL('');
      console.log(secureUrl);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const replaceAndSetSky = async () => {
    try {
      setLoadingBar(true);
      const data = await skyReplace(responseUrl);
      console.log(data);
      setSkyURL(data.result);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    } finally {
      setLoadingBar(false);
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sky_replaced_image.jpg';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {currentPage === 'sky' && (
        <div id="root-other">
          <h3 className='header-2'>Sky Replace</h3>
          <br />
          <div className='before-after'>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/Sky.jpg" width="300px" height="200px"></img>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/RightArrow4.jpg" width="200px" height="65px"></img>
            <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/EnhancedSky.jpg" width="300px" height="200px"></img>
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
          <br />
          {responseUrl && !skyURL && (
            <button onClick={replaceAndSetSky} className="my-button">
              Sky Replace
            </button>
          )}
          <br />
          {!skyURL && responseUrl && (
            <div className="image-container">
              {loading && <div className="spinner"></div>}
              <img src={responseUrl} width="800px" height="600px" alt="Enhanced Image" />
            </div>
          )}
          {skyURL && (
            <div className="image-container">
              <img src={skyURL} width="800px" height="600px" alt="Sky Replaced Image" />
            </div>
          )}
          <br />
          {skyURL && (
            <button onClick={() => handleDownload(skyURL)} className="my-button">
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

export default SkyReplace;
