import React, { useState } from "react";

import "./App.css";
import EnhanceImage from "./components/EnhanceImage.jsx";
import SkyReplace from "./components/SkyReplace.jsx";
import GrassReplace from "./components/GrassReplace.jsx";
import VirtualStage from "./components/VirtualStage.jsx";
import VirtualRenovate from "./components/VirtualRenovate.jsx";
import VirtualRefurnish from "./components/VirtualRefurnish.jsx";
import DetectImage from "./components/SmartDetect.jsx";
{/*import Declutter from "./components/Declutter.jsx";*/}


function App() {
  const [currentPage, setCurrentPage] = useState("home");
  
  return (
    <div  >
      {currentPage === "home" && (
        <div id="root-home">
          <div className="header">
          <h2>AI Photo Improvement</h2>
          <h4>Instantly improve the quality of your listing photo using the functions listed below.</h4>
          </div>
          <button onClick={() => setCurrentPage("enhance")} className="image-button">
            <div className="button-content">
              <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368587/Button%20Images/Kitchen1.jpg" alt="Kitchen" width="300px" height="200px" />
              <div className="button-label">Image Enhancement</div>
            </div>
          </button>
          <button onClick={() => setCurrentPage("sky")} className="image-button">
            <div className="button-content">
              <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368806/Button%20Images/Sky.jpg" alt="Sky" width="300px" height="200px" />
              <div className="button-label">Sky Replacement</div>
            </div>
          </button>
          <button onClick={() => setCurrentPage("grass")} className="image-button">
            <div className="button-content">
              <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699368936/Button%20Images/Grass.jpg" alt="Grass" width="300px" height="200px" />
              <div className="button-label">Grass Replacement</div>
            </div>
          </button>
          <br />
          <button onClick={() => setCurrentPage("stage")} className="image-button">
            <div className="button-content">
              <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699369046/Button%20Images/Stage.jpg" alt="Stage" width="300px" height="200px" />
              <div className="button-label">AI Virtual Staging</div>
            </div>
          </button>
          <button onClick={() => setCurrentPage("renovate")} className="image-button">
            <div className="button-content">
              <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699369107/Button%20Images/Bathroom.jpg" alt="Bathroom" width="300px" height="200px" />
              <div className="button-label">AI Virtual Renovation</div>
            </div>
          </button>
          <button onClick={() => setCurrentPage("refurnish")} className="image-button">
            <div className="button-content">
              <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699369210/Button%20Images/Bedroom.jpg" alt="Bedroom" width="300px" height="200px" />
              <div className="button-label">AI Virtual Refurnishing</div>
            </div>
          </button>
          <button onClick={() => setCurrentPage("detect")} className="image-button">
            <div className="button-content">
              <img src="https://res.cloudinary.com/dlllanhrs/image/upload/v1699369210/Button%20Images/LivingRoom.jpg" alt="Living Room" width="300px" height="200px" />
              <div className="button-label">AI Smart Detection</div>
            </div>
          </button>
          {/*<button onClick={() => setCurrentPage("declutter")}>Declutter</button>*/}
        </div>  
      )}
      {currentPage === "enhance" && <EnhanceImage />}
      {currentPage === "sky" && <SkyReplace />}
      {currentPage === "grass" && <GrassReplace />}
      {currentPage === "stage" && <VirtualStage />}
      {currentPage === "renovate" && <VirtualRenovate />}
      {currentPage === "refurnish" && <VirtualRefurnish />}
      {currentPage === "detect" && <DetectImage />}
      {/*{currentPage === "declutter" && <Declutter />}*/}
    </div>
  );
}

export default App;
