// App.tsx
import React, { useState, useEffect, FormEvent, useRef } from "react";
import { io } from "socket.io-client";
import { useUserStore } from "../../Stores/User.store";
// import axios from 'axios';

const socket = io("http://localhost:5000");

export const ChatComponent: React.FC = () => {
  const sessionUser = useUserStore((state) => state.user);
  const [username, setusername] = useState(sessionUser);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [isRoomActive, setisRoomActive] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const joinRoom = () => {
    if (username && room) {
      setisRoomActive(true);
      socket.emit("join", { username, room });
    }
  };

  const leaveRoom = () => {
    if (username && room) {
      setisRoomActive(false);
      socket.emit("leave", { username, room });
    }
  };

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  useEffect(() => {
    if (message.length > 0) {
      setValidMessage(true);
    } else {
      setValidMessage(false);
    }
  }, [message]);
  useEffect(() => {
    if (sessionUser) {
      setusername(sessionUser);
    } else {
      setusername("Anonymous");
    }
  }, [username]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {room && isRoomActive && <p>You're in room: {room}</p>}
      <div className="flex flex-col gap-2 my-2">
        <label htmlFor="join-room">Room control</label>
        <input
          type="text"
          id="join-room"
          className="text-gray-800 p-1 rounded-sm"
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
      <div className="bg-gray-300 min-h-24 h-4/5 max-h-[35vh]  rounded-lg my-2 text-gray-700 p-2 text-start overflow-auto">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="w-full">
        <div className="flex gap-1 w-full">
          <input
            type="text"
            placeholder="Message"
            className="text-gray-800 p-1 rounded-lg w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={!validMessage}
            className={`bg-gray-700 rounded-sm w-fit py-1.5 px-2 mr-auto  ${
              !validMessage ? "cursor-not-allowed" : "hover:bg-gray-600"
            }`}
          >
            Send
          </button>
        </div>
      </form>
      {messages.length > 0 && (
        <button
          onClick={() => setMessages([])}
          className="bg-gray-700 rounded-sm w-fit py-1.5 px-2 m-auto mt-2 hover:bg-gray-600"
        >
          Clear Chat
        </button>
      )}
    </div>
  );
};
