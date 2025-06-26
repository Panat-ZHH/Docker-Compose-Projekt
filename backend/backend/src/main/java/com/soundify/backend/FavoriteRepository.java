package com.soundify.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
    boolean existsByUserIdAndSongId(Long userId, Long songId);
    void deleteByUserIdAndSongId(Long userId, Long songId);
}
