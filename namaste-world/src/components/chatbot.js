import React, { useState } from "react";
import "./chatbot.css";

function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSend = () => {
        if (input.trim() !== "") {
            const userMessage = { sender: "user", text: input };
            setMessages([...messages, userMessage]);

            const botResponse = {
                sender: "bot",
                text: "This is a placeholder response.",
            };
            setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);

            setHistory([...history, input]);
            setInput("");
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="chat-container">
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                ☰
            </button>
            {isSidebarOpen && (
                <aside className="sidebar">
                    <h2>History</h2>
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </aside>
            )}
            <div className={`chat-content ${isSidebarOpen ? "with-sidebar" : ""}`}>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        rows={1}
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatInterface;
