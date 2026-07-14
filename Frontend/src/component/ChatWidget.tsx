import React, { useState } from "react";
import { Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { api } from "../config/Api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await api.post("/api/chat/completion", {
        model: "meta/llama-3.2-3b-instruct",
        messages: [{ role: "user", content: userMessage.content }],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024,
        stream: false,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.content || "I could not generate a response." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "There was an error connecting to the helper. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1500 }}>
      {open && (
        <Paper elevation={12} sx={{ width: 360, maxWidth: "calc(100vw - 48px)", p: 2, mb: 2 }}>
          <Box className="flex items-center justify-between mb-2">
            <Typography variant="h6">Velvora Assistant</Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ maxHeight: 420, overflowY: "auto", mb: 2 }}>
            {messages.length === 0 ? (
              <Typography color="text.secondary">Ask me anything about products, orders, or sellers.</Typography>
            ) : (
              messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: message.role === "assistant" ? "#F0FDF4" : "#EFF6FF",
                    textAlign: message.role === "assistant" ? "left" : "right",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {message.role === "assistant" ? "Assistant" : "You"}
                  </Typography>
                  <Typography variant="body2">{message.content}</Typography>
                </Box>
              ))
            )}
          </Box>
          <Box className="flex gap-2">
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about orders, products, or seller support"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              variant="contained"
              disabled={loading || !input.trim()}
              onClick={handleSend}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
      <Button
        variant="contained"
        startIcon={<ChatIcon />}
        onClick={() => setOpen((prev) => !prev)}
        sx={{ borderRadius: "999px", minWidth: 56, width: 56, height: 56, p: 0 }}
      />
    </Box>
  );
};

export default ChatWidget;
