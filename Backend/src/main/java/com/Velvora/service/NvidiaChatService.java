package com.Velvora.service;

import com.Velvora.request.ChatRequest;

public interface NvidiaChatService {
    String createChatCompletion(ChatRequest request);
}
