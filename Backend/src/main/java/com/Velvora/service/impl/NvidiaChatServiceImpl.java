package com.Velvora.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.Velvora.request.ChatRequest;
import com.Velvora.service.NvidiaChatService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NvidiaChatServiceImpl implements NvidiaChatService {
    private final RestTemplate restTemplate;

    @Value("${nvidia.api.key}")
    private String apiKey;

    @Value("${nvidia.api.base-url}")
    private String baseUrl;

    @Value("${nvidia.api.model}")
    private String defaultModel;

    @Value("${nvidia.api.temperature}")
    private Double defaultTemperature;

    @Value("${nvidia.api.top-p}")
    private Double defaultTopP;

    @Value("${nvidia.api.max-tokens}")
    private Integer defaultMaxTokens;

    @Override
    public String createChatCompletion(ChatRequest request) {
        String model = request.getModel() != null && !request.getModel().isBlank()
                ? request.getModel()
                : defaultModel;
        String url = baseUrl.endsWith("/") ? baseUrl + "chat/completions" : baseUrl + "/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(apiKey);

        Double temperature = request.getTemperature() != null ? request.getTemperature() : defaultTemperature;
        Double topP = request.getTop_p() != null ? request.getTop_p() : defaultTopP;
        Integer maxTokens = request.getMax_tokens() != null ? request.getMax_tokens() : defaultMaxTokens;
        Boolean stream = request.getStream() != null ? request.getStream() : Boolean.FALSE;

        ChatRequest outgoing = new ChatRequest(
                model,
                request.getMessages(),
                temperature,
                topP,
                maxTokens,
                stream
        );

        HttpEntity<ChatRequest> entity = new HttpEntity<>(outgoing, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            Object choicesValue = response.getBody().get("choices");
            if (choicesValue instanceof List<?> choices && !choices.isEmpty()) {
                Object firstChoice = choices.get(0);
                if (firstChoice instanceof Map<?, ?> choiceMap) {
                    Object messageValue = choiceMap.get("message");
                    if (messageValue instanceof Map<?, ?> messageMap) {
                        Object contentValue = messageMap.get("content");
                        if (contentValue instanceof String content) {
                            return content;
                        }
                    }
                }
            }
        }

        throw new RuntimeException("Unexpected response from NVIDIA chat service");
    }
}
