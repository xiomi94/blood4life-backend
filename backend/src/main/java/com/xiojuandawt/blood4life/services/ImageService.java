package com.xiojuandawt.blood4life.services;

import com.xiojuandawt.blood4life.entities.Image;
import com.xiojuandawt.blood4life.repositories.ImageRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageService {

  @Autowired
  private ImageRepository imageRepository;

  private final Path rootLocation = Paths.get("uploads");

  @PostConstruct
  public void init() {
    try {
      System.out.println("🟡 INICIANDO ImageService...");
      System.out.println("📂 Ruta actual: " + Paths.get("").toAbsolutePath());

      if (!Files.exists(rootLocation)) {
        Files.createDirectories(rootLocation);
        System.out.println("✅ Directorio uploads creado en: " + rootLocation.toAbsolutePath());
      } else {
        System.out.println("✅ Directorio uploads ya existe en: " + rootLocation.toAbsolutePath());
      }

      // Verificar permisos
      System.out.println("🔐 Permisos de escritura: " + Files.isWritable(rootLocation));

    } catch (IOException e) {
      System.err.println("❌ Error creando directorio: " + e.getMessage());
      e.printStackTrace();
    }
  }

  public String saveImage(MultipartFile file) throws IOException {
    // 1. Guardar archivo en sistema de archivos
    String originalFilename = file.getOriginalFilename();
    String filename = System.currentTimeMillis() + "_" + originalFilename.replace(" ", "_");
    Path destinationFile = rootLocation.resolve(filename);

    Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

    // 2. Guardar metadata en BD
    Image image = new Image();
    image.setName(originalFilename);
    image.setRoute(destinationFile.toString());
    image.setUrl("/api/images/" + filename);

    imageRepository.save(image);

    return filename;
  }

  public byte[] getImage(String filename) throws IOException {
    Path file = rootLocation.resolve(filename);
    return Files.readAllBytes(file);
  }
}