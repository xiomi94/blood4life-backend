package com.xiojuandawt.blood4life.controllers;

import com.xiojuandawt.blood4life.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:5173") // Para desarrollo
public class ImageController {

  @Autowired
  private ImageService imageService;

  @PostMapping("/upload")
  public ResponseEntity<Map<String, String>> uploadImage(
    @RequestParam("image") MultipartFile file) {
    try {
      System.out.println("📤 Recibiendo archivo: " + file.getOriginalFilename());
      String imageUrl = imageService.saveImage(file);

      Map<String, String> response = new HashMap<>();
      response.put("message", "Imagen subida exitosamente");
      response.put("url", imageUrl);

      return ResponseEntity.ok(response);
    } catch (IOException e) {
      System.err.println("❌ Error subiendo imagen: " + e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @GetMapping("/{imageName}")
  public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
    try {
      System.out.println("📥 Solicitando imagen: " + imageName);
      byte[] imageData = imageService.getImage(imageName);

      // Determinar content type dinámicamente
      String contentType = "image/jpeg";
      if (imageName.toLowerCase().endsWith(".png")) {
        contentType = "image/png";
      }

      return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(contentType))
        .body(imageData);
    } catch (IOException e) {
      System.err.println("❌ Imagen no encontrada: " + imageName);
      return ResponseEntity.notFound().build();
    }
  }

  private String determineContentType(String filename) {
    if (filename.toLowerCase().endsWith(".png")) {
      return "image/png";
    } else {
      return "image/jpeg";
    }
  }
}