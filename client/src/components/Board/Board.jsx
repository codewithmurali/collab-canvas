import React from 'react'
import ReactPainter from "react-painter"

const Board = () => {
  return (
    <div>
      import React, { useRef, useEffect, useState } from "react";
import ReactPainter from "react-painter";
import io from "socket.io-client";

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
    </div>
  )
}

export default Board
onDraw={({ line }) => {
          socket.emit("draw", line);
        }}