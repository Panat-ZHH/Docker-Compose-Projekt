package com.soundify.backend;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/api/spotify")
@CrossOrigin(origins = "http://localhost:5173")
public class SpotifyOAuthController {
    

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    @Value("${spotify.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();

    // 1. LOGIN: Weiterleitung zu Spotify Login-Seite
    @GetMapping("/login")
public ResponseEntity<Void> login() {
    String scope = URLEncoder.encode("user-read-private user-read-email playlist-read-private", StandardCharsets.UTF_8);

    String url = UriComponentsBuilder
            .fromHttpUrl("https://accounts.spotify.com/authorize")
            .queryParam("client_id", clientId)
            .queryParam("response_type", "code")
            .queryParam("redirect_uri", redirectUri)
            .queryParam("scope", scope)
            .queryParam("show_dialog", "true")
            .build()
            .toUriString();

    return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(url)).build();
}


    // 2. CALLBACK: Spotify sendet "code" zurück
    @GetMapping("/callback")
    public ResponseEntity<String> callback(@RequestParam String code) {
        System.out.println("🔁 Callback aufgerufen!");
        System.out.println("Code von Spotify: " + code);

        String tokenUrl = "https://accounts.spotify.com/api/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String auth = Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());
        headers.set("Authorization", "Basic " + auth);

        String body = UriComponentsBuilder.newInstance()
                .queryParam("grant_type", "authorization_code")
                .queryParam("code", code)
                .queryParam("redirect_uri", redirectUri)
                .build()
                .toUriString().substring(1); // Entfernt das führende '?'

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);
        System.out.println("🎯 Token Response Status: " + response.getStatusCode());
        System.out.println("🎯 Token Response Body: " + response.getBody());

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> tokenData = response.getBody();
            String accessToken = (String) tokenData.get("access_token");
            String refreshToken = (String) tokenData.get("refresh_token");

            // Für Demo: Userdaten holen
            HttpHeaders userHeaders = new HttpHeaders();
            userHeaders.setBearerAuth(accessToken);
            HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);

            ResponseEntity<Map> userResponse = restTemplate.exchange(
                    "https://api.spotify.com/v1/me", HttpMethod.GET, userRequest, Map.class);

            Map<String, Object> userData = userResponse.getBody();
            return ResponseEntity.ok("✅ Login erfolgreich!<br><br>Hallo " + userData.get("display_name") + " 👋<br><br>Email: " + userData.get("email"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Fehler beim Login.");
        }
    }
}
