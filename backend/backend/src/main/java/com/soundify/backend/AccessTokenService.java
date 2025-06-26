package com.soundify.backend;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class AccessTokenService {
    private final ConcurrentHashMap<String, String> tokenStore = new ConcurrentHashMap<>();

    public void saveToken(String userId, String token) {
        tokenStore.put(userId, token);
    }

    public String getToken(String userId) {
        return tokenStore.get(userId);
    }
}
