package com.soundify.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/spotify")
@CrossOrigin
public class SpotifyController {

    @Autowired
    private SpotifyService spotifyService;

    @GetMapping("/search")
    public List<Map<String, Object>> searchTracks(@RequestParam String query) {
        return spotifyService.searchTracks(query);
    }
}
