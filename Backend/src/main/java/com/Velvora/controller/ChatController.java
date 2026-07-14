package com.Velvora.controller;

import com.Velvora.request.ChatRequest;
import com.Velvora.response.ChatResponse;
import com.Velvora.service.NvidiaChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final NvidiaChatService nvidiaChatService;

    @PostMapping("/completion")
    public ResponseEntity<ChatResponse> createChatCompletion(@RequestBody ChatRequest request) {
        String assistantResponse = nvidiaChatService.createChatCompletion(request);
        ChatResponse chatResponse = new ChatResponse(assistantResponse, request.getModel());
        return ResponseEntity.ok(chatResponse);
    }
}
