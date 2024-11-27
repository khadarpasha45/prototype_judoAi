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
            const botResponse = {
                sender: "bot",
                text: "This is a placeholder response.",
            };

            // Update messages with both userMessage and botResponse
            setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);

            // Add the input to the history
            setHistory((prevHistory) => [...prevHistory, input]);

            // Clear the input
            setInput("");
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const clearChats = () => {
        setMessages([]);  // Clear the messages
        setHistory([]);   // Clear the history
    };

    return (
        <div className="chat-container">
            <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                {isSidebarOpen && (
                    <>
                        <h2>History</h2>
                        <ul>
                            {history.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}
            </aside>
            <button
                className={`toggle-sidebar-btn ${isSidebarOpen ? "open" : "closed"}`}
                onClick={toggleSidebar}
            >
                ☰
            </button>
            {/* New Chat Button - Replacing the Trash Icon */}
            <button
                className={`clear-chat-btn ${isSidebarOpen ? "open" : "closed"}`}
                onClick={clearChats}
            >
                💬 {/* New Chat Icon */}
            </button>
            <div className="chat-content">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.sender}`}
                            style={{ maxWidth: "70%", wordWrap: "break-word" }}
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
