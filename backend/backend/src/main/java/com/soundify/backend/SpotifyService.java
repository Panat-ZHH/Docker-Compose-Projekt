package com.soundify.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@Service
public class SpotifyService {

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    private String accessToken;

    // 1. Token holen
    private void fetchAccessToken() {
        String url = "https://accounts.spotify.com/api/token";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        String auth = Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());
        headers.set("Authorization", "Basic " + auth);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> request = new HttpEntity<>("grant_type=client_credentials", headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            accessToken = (String) response.getBody().get("access_token");
        } else {
            throw new RuntimeException("Fehler beim Holen des Access Tokens");
        }
    }

    // 2. Suche Song
    public List<Map<String, Object>> searchTracks(String query) {
        if (accessToken == null) {
            fetchAccessToken();
        }

        String url = UriComponentsBuilder
                .fromHttpUrl("https://api.spotify.com/v1/search")
                .queryParam("q", query)
                .queryParam("type", "track")
                .queryParam("limit", 5)
                .toUriString();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.set("Accept", "application/json");

        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);

        List<Map<String, Object>> tracks = new ArrayList<>();

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> body = response.getBody();
            Map<String, Object> tracksObj = (Map<String, Object>) body.get("tracks");
            List<Map<String, Object>> items = (List<Map<String, Object>>) tracksObj.get("items");

            for (Map<String, Object> item : items) {
                Map<String, Object> trackInfo = new HashMap<>();
                trackInfo.put("name", item.get("name"));
                trackInfo.put("artist", ((Map)((List)item.get("artists")).get(0)).get("name"));
                trackInfo.put("url", ((Map)((Map)item.get("external_urls"))).get("spotify"));
                tracks.add(trackInfo);
            }
        }

        return tracks;
    }
}
