import axios from "axios";
import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import { FaMicrophoneAlt, FaTelegramPlane, FaUserAlt } from "react-icons/fa";
import { MdMemory } from "react-icons/md";
import { io, Socket } from "socket.io-client";
import Markdown from "../library/Markdown";
import { SwtichWithLabel } from "../library/Switch";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface ChatType {
  sender: string;
  text: string;
}

interface Props {
  className?: string;
}

const Chat: FC<Props> = ({ className }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatType[]>([]);
  const [autoSend, setAutoSend] = useState(false);

  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    const socket = io(API_URL);
    socketRef.current = socket;

    socket.on("chat_response", (data) => {
      setChatHistory((prev) => [
        ...prev,
        { sender: "agent", text: data.response },
      ]);

      axios.get(`${API_URL}/api/activity-summary/user123`).then((res) => {
        window.dispatchEvent(
          new CustomEvent("activity-updated", { detail: res.data })
        );
      });
    });

    return () => {
      socket.off("chat_response");
      socketRef.current = null;
    };
  }, []);

  const handleSendMessage = async () => {
    const userMsg = { sender: "user", text: userInput };
    setChatHistory([...chatHistory, userMsg]);
    socketRef.current?.emit("chat_message", { message: userInput });
    setUserInput("");
  };

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div className="text-lg">Chat</div>
      <div className="bg-gray-800 px-2 py-5 rounded min-h-40 md:min-h-60 max-h-96 grow overflow-y-auto flex flex-col gap-2">
        {chatHistory.map((chat, index) => (
          <div
            key={`chat-${index}`}
            className="p-1.5 rounded flex gap-3 bg-gray-900"
          >
            <div>
              <div className="size-10 rounded bg-gray-800 text-gray-400 flex items-center justify-center">
                {chat.sender === "user" ? (
                  <FaUserAlt />
                ) : (
                  <MdMemory className="text-2xl" />
                )}
              </div>
            </div>
            <Markdown className="flex flex-col justify-center">
              {chat.text}
            </Markdown>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="grow flex items-center relative">
          <input
            type="text"
            className="w-full outline-0 border rounded-lg border-gray-700 focus:border-sky-800 px-3 py-2 transition-all duration-300"
            placeholder="Ask Elysia to sort your inbox"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "NumpadEnter") {
                handleSendMessage();
              }
            }}
          />
          <div className="absolute top-0 right-0 mr-2 mt-1.5">
            <button
              className="p-2 rounded hover:bg-gray-700/20 text-gray-400 transition-all duration-300 cursor-pointer"
              onClick={() => alert("Voice input not yet implemented")}
            >
              <FaMicrophoneAlt />
            </button>
            <button
              className="p-2 rounded hover:bg-sky-700/20 text-sky-400 transition-all duration-300 cursor-pointer"
              onClick={handleSendMessage}
            >
              <FaTelegramPlane />
            </button>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <SwtichWithLabel onChange={(e) => setAutoSend(e)} value={autoSend} />
          <div>Send without approval</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
