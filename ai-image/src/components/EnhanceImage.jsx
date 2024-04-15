import React, { useState } from 'react';
import Home from "../App.jsx";
import { enhanceImage } from "../apis/enhanceImageAPI.js";
import { uploadImage } from "../apis/uploadImageAPI.js";

  const EnhanceImage = () => {
    const [imageSelected, setImageSelected] = useState("");
    const [responseUrl, setResponseUrl] = useState("");
    const [loading, setLoadingBar] = useState(false);
    const [enhancedImageURL, setEnhancedImage] = useState("");
    const [currentPage, setCurrentPage] = useState("enhance");
  
    const goHome = () => {
      setCurrentPage("home");
    };
  
    const uploadAndSetImage = async () => {
      try {
        const secureUrl = await uploadImage(imageSelected);
        setResponseUrl(secureUrl);
        setEnhancedImage("");
        console.log(secureUrl);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    };
  
    const enhanceAndSetImage = async () => {
      try {
        setLoadingBar(true);
        const data = await enhanceImage(responseUrl);
        console.log(data);
        setEnhancedImage(data.result);
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
      link.download = 'enhanced_image.jpg';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div>
      {currentPage === "enhance" && (
        <div id="root-other">
          <h3 className='header-2'>Image Enhancement</h3>
          <br />
          <div className='before-after'>
          <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/Kitchen1.jpg" width="300px" height="200px"></img>
          <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/RightArrow4.jpg" width="200px" height="65px" ></img>
          <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/EnhancedKitchen.jpg" width="300px" height="200px"></img>
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
          {responseUrl && !enhancedImageURL && (<button onClick={enhanceAndSetImage} className="my-button">
            Enhance Image
          </button>) 
          }
          <br />
          {!enhancedImageURL && responseUrl && (
            <div className="image-container" >
              {loading && <div className="spinner"></div>}
              <img src={responseUrl} width="800px" height="600px" alt="Enhanced Image" />
            </div>
          )}
          {enhancedImageURL && (
            <div className="image-container">
              <img src={enhancedImageURL} width="800px" height="600px" alt="Enhanced Image" />
            </div>
          )}
          <br />
          {enhancedImageURL && (<button onClick={handleDownload(enhancedImageURL)} className="my-button">
            Download
          </button>)}
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

export default EnhanceImage;
