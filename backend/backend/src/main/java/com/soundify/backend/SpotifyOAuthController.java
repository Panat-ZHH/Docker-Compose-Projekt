package com.soundify.backend;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.net.URI;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

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

    @Autowired
    private AccessTokenService accessTokenService;

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

    @GetMapping("/callback")
public ResponseEntity<Map<String, Object>> callback(@RequestParam String code) {
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
            .toUriString().substring(1);

    HttpEntity<String> request = new HttpEntity<>(body, headers);
    ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);

    if (response.getStatusCode() == HttpStatus.OK) {
        Map<String, Object> tokenData = response.getBody();
        String accessToken = (String) tokenData.get("access_token");

        // User-Daten holen
        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setBearerAuth(accessToken);
        HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);

        ResponseEntity<Map> userResponse = restTemplate.exchange(
                "https://api.spotify.com/v1/me", HttpMethod.GET, userRequest, Map.class);

        Map<String, Object> userData = userResponse.getBody();

        // Optional speichern
        accessTokenService.saveToken((String) userData.get("id"), accessToken);

        Map<String, Object> result = new HashMap<>();
        result.put("access_token", accessToken);
        result.put("id", userData.get("id"));
        result.put("display_name", userData.get("display_name"));

String redirectUrl = "http://localhost:5173/login"
	+ "?token=" + accessToken
	+ "&id=" + userData.get("id")
	+ "&user=" + URLEncoder.encode((String) userData.get("display_name"), StandardCharsets.UTF_8);

return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(redirectUrl)).build();
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Login fehlgeschlagen"));
    }
}



    @GetMapping("/me/playlists")
    public ResponseEntity<Object> getMyPlaylists(@RequestParam String userId) {
        String accessToken = accessTokenService.getToken(userId);
        if (accessToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("⚠️ Kein Access-Token gefunden.");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        String url = "https://api.spotify.com/v1/me/playlists";

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);
        return ResponseEntity.ok(response.getBody());
    }
}
