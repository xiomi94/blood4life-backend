package com.xiojuandawt.blood4life.repositories;

import com.xiojuandawt.blood4life.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
}