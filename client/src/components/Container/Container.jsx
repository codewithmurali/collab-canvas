import React, { useRef, useEffect, useState } from "react";
import ReactPainter from "react-painter";
import io from "socket.io-client";
import "./container.css";
const socket = io("http://localhost:4000");

const Container = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    socket.on("draw", (data) => {
      setLines((prevLines) => [...prevLines, data]);
    });

    return () => {
      socket.off("draw");
    };
  }, []);

  const handleDraw = (line) => {
    socket.emit("draw", line);
  };

  return (
    <>
      <ReactPainter
        width={1000}
        height={600}
        render={({
          canvas,
          triggerSave,
          setColor,
          setLineWidth,
          setLineCap,
          setLineJoin,
          imageDownloadUrl,
        }) => (
          <div>
            <h1>Collab Canvas</h1>
            <div className="toolbox">
              <div className="flex">
                <label htmlFor="brushColor">Brush</label>
                <input
                  id="brushColor"
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="flex">
                <label htmlFor="brushSize">Brush Size</label>
                <input
                  id="brushSize"
                  type="range"
                  min="1"
                  max="50"
                  onChange={(e) => setLineWidth(e.target.value)}
                />
              </div>
              <div className="flex">
                <label htmlFor="lineJoin">Line Join</label>
                <select
                  id="lineJoin"
                  onChange={(e) => setLineJoin(e.target.value)}
                >
                  <option value="round">Round</option>
                  <option value="bevel">Bevel</option>
                  <option value="miter">Miter</option>
                </select>
              </div>
              <div className="flex">
                <label htmlFor="lineCap">Line Cap</label>
                <select
                  id="lineCap"
                  onChange={(e) => setLineCap(e.target.value)}
                >
                  <option value="round">Round</option>
                  <option value="butt">Butt</option>
                  <option value="square">Square</option>
                </select>
              </div>
              {imageDownloadUrl ? (
                <a href={imageDownloadUrl} download="drawing.png">
                  Download
                </a>
              ) : (
                <button onClick={triggerSave}>Save</button>
              )}
            </div>
            <div className="awesomeContainer">{canvas}</div>
          </div>
        )}
        onDraw={({ line }) => handleDraw(line)}
      />
    </>
  );
};

export default Container;
