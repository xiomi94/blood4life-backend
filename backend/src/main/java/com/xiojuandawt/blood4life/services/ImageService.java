package com.xiojuandawt.blood4life.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

  // Carpeta absoluta para evitar problemas de ruta
  private final String uploadDir = System.getProperty("user.dir") + "/uploads";

  public String saveImage(MultipartFile file, String filename) throws IOException {
    Path uploadPath = Paths.get(uploadDir);

    // Crear directorio si no existe
    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    Path filePath = uploadPath.resolve(filename);

    // Guardar el archivo de forma segura usando InputStream
    Files.copy(file.getInputStream(), filePath);

    return filename;
  }

  public byte[] getImage(String filename) throws IOException {
    Path filePath = Paths.get(uploadDir).resolve(filename);

    if (!Files.exists(filePath)) {
      throw new IOException("Archivo no encontrado: " + filename);
    }

    return Files.readAllBytes(filePath);
  }
}
