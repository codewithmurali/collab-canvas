import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./container.css";

const socket = io("http://localhost:4000");

const Container = () => {
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [lineCap, setLineCap] = useState("round");
  const [lineJoin, setLineJoin] = useState("round");
  const [lines, setLines] = useState([]);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    socket.on("draw", (line) => {
      setLines((prevLines) => [...prevLines, line]);
    });

    return () => {
      socket.off("draw");
    };
  }, []);

  const startDrawing = (e) => {
    isDrawing.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    lastPos.current = { x: offsetX, y: offsetY };
  };

  const draw = (e) => {
    if (!isDrawing.current) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const newLine = {
      start: lastPos.current,
      end: { x: offsetX, y: offsetY },
      color,
      size: lineWidth,
      cap: lineCap,
      join: lineJoin,
    };

    setLines((prevLines) => [...prevLines, newLine]);
    socket.emit("draw", newLine);

    lastPos.current = { x: offsetX, y: offsetY };
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.size;
      ctx.lineCap = line.cap;
      ctx.lineJoin = line.join;
      ctx.stroke();
    });
  }, [lines]);

  return (
    <div>
      <h1>Collab Canvas</h1>
      <div className="toolbox">
        <div className="flex">
          <label htmlFor="brushColor">Brush</label>
          <input
            id="brushColor"
            type="color"
            value={color}
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
            value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)}
          />
        </div>
        <div className="flex">
          <label htmlFor="lineJoin">Line Join</label>
          <select
            id="lineJoin"
            value={lineJoin}
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
            value={lineCap}
            onChange={(e) => setLineCap(e.target.value)}
          >
            <option value="round">Round</option>
            <option value="butt">Butt</option>
            <option value="square">Square</option>
          </select>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
};

export default Container;
