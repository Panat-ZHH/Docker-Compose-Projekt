package com.soundify.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private SongRepository songRepo;

    @PostMapping("/add")
    public String addFavorite(@RequestParam Long userId, @RequestParam Long songId) {
        if (favoriteRepo.existsByUserIdAndSongId(userId, songId)) {
            return "✅ Bereits als Favorit vorhanden";
        }

        User user = userRepo.findById(userId).orElse(null);
        Song song = songRepo.findById(songId).orElse(null);
        if (user != null && song != null) {
            Favorite fav = new Favorite();
            fav.setUser(user);
            fav.setSong(song);
            favoriteRepo.save(fav);
            return "💚 Song geliked!";
        }

        return "❌ Fehler beim Liken";
    }

    @DeleteMapping("/remove")
    public String removeFavorite(@RequestParam Long userId, @RequestParam Long songId) {
        favoriteRepo.deleteByUserIdAndSongId(userId, songId);
        return "🗑️ Song entfernt!";
    }

    @GetMapping("/all")
    public List<Favorite> getFavorites(@RequestParam Long userId) {
        return favoriteRepo.findByUserId(userId);
    }
}
