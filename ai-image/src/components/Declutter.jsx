import React, { useState } from "react";
import Axios from "axios";
import ReactLassoSelect, { getCanvas } from "react-lasso-select";
import domtoimage from 'dom-to-image';

function Declutter() {
  const [imageSelected, setImageSelected] = useState("");
  const [responseUrl, setResponseUrl] = useState("");
  const [loading, setLoadingBar] = useState(false);
  const [setDeclutterURL, declutterURL] = useState("");

  async function jpgFromSVG() {
    const svgContainer = document.createElement("div");
    svgContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <polyline fill="black" points="${points
          .map(({ x, y }) => `${x},${y}`)
          .join(" ")}" />
      </svg>
    `;

    try {
      const dataUrl = await domtoimage.toJpeg(svgContainer, { quality: 0.95 });
      return dataUrl;
    } catch (error) {
      console.error("Error while rendering SVG:", error);
    }
  }

  {
    /*const uploadMask = () => {
    const formData = new FormData();
    formData.append("file", jpgFromSVG());
    formData.append("upload_preset", "nfg2qtpb");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dlllanhrs/upload",
      formData
    ).then((response) => {
      const secureUrl = response.data.secure_url;
      setMaskImg(secureUrl);
      console.log(secureUrl);
    });
  };*/
  }

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "nfg2qtpb");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dlllanhrs/upload",
      formData
    ).then((response) => {
      const secureUrl = response.data.secure_url;
      setResponseUrl(secureUrl);
      console.log(secureUrl);
    });
  };

  const declutter = async () => {
    const options = {
      method: "POST",
      url: "https://us-central1-lucid-box-387617.cloudfunctions.net/object-removal",
      headers: {
        Authorization: "5G8H2A3B1C6D9E0F4",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        instances: [
          {
            mask_url: maskImg,
            image_url: responseUrl,
          },
        ],
      },
    };

    try {
      setLoadingBar(true);
      const { data } = await Axios.request(options);
      console.log(data);
      setDeclutterURL(data.result);
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
      <input
        type="file"
        onChange={(event) => setImageSelected(event.target.files[0])}
      />
      <button onClick={uploadImage} className="my-button">
        Upload Image
      </button>
      <h1>Declutter</h1>
      <button onClick={declutter} className="my-button">
        Deluctter
      </button>
      <ReactLassoSelect
          value={points}
          src={responseUrl}
          imageStyle={{ width: `800px` }}
          onChange={(value) => {
            setPoints(value);
          }}
          onComplete={(value) => {
            if (!value.length) return;
            getCanvas(responseUrl, value, (err, canvas) => {
              if (!err) {
                setClippedImg(canvas.toDataURL());                          
              }
            });

            console.log("responseUrl:", responseUrl);
            jpgFromSVG().then((result) => {
                console.log(result); // This will log the result of the promise
                setMaskImg(result);
              }).catch((error) => {
                console.error('Error:', error);
              });
            console.log("Mask Img:", maskImg);
          }}
        />
        {loading && <div className="loading-bar">Loading...</div>}
        {declutterURL && (
        <div className="image-container">
          <img src={declutterURL} alt="Enhanced Image" />
        </div>
      )}
    </div>
  );
}

export default Declutter;
