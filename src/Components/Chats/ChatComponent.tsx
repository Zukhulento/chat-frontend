// App.tsx
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useUserStore } from "../../Stores/User.store";
// import axios from 'axios';

const socket = io("http://localhost:5000");

export const ChatComponent: React.FC = () => {
  const sessionUser = useUserStore((state) => state.user);
  const [username, setUsername] = useState(sessionUser);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join", { username, room });
    }
  };

  const leaveRoom = () => {
    if (username && room) {
      socket.emit("leave", { username, room });
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("message", { room, message, username });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", (data: { username: string; message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 my-2">
        <label htmlFor="join-room">Room control</label>
        <input
          type="text"
          id="join-room"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <div className="flex gap-1">
          <button
            onClick={joinRoom}
            className="bg-gray-700 rounded-sm w-fit py-1.5 px-2 ml-auto hover:bg-gray-600"
          >
            Join Room
          </button>
          <button
            onClick={leaveRoom}
            className="bg-gray-700 rounded-sm w-fit py-1.5 px-2 mr-auto hover:bg-gray-600"
          >
            Leave Room
          </button>
        </div>
      </div>
      <div></div>
      <div className="bg-gray-300 h-24 rounded-lg my-2">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-gray-700 rounded-sm w-fit py-1.5 px-2 mr-auto hover:bg-gray-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};
