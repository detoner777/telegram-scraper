import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4001";
const ENDPOINT = "https://127.0.0.1:go-together-fastov.herokuapp.com/";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    socket.on("chatBar", (data) => {
      console.log(data);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    fetch(`${ENDPOINT}/get-bar-chat`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
