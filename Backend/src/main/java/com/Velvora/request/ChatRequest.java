package com.Velvora.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequest {
    private String model;
    private List<ChatMessage> messages;
    private Double temperature;
    private Double top_p;
    private Integer max_tokens;
    private Boolean stream;
}
