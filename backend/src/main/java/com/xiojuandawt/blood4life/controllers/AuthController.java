package com.xiojuandawt.blood4life.controllers;

import com.xiojuandawt.blood4life.entities.BloodDonor;
import com.xiojuandawt.blood4life.services.BloodDonorService;
import com.xiojuandawt.blood4life.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private BloodDonorService bloodDonorService;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  // 🔹 Registro de nuevo donante
  @PostMapping("/bloodDonor/register")
  public ResponseEntity<Map<String, String>> registerBloodDonor(@RequestBody BloodDonor bloodDonor) {
    // Comprobamos que no exista otro usuario con el mismo email
    Optional<BloodDonor> existing = bloodDonorService.findByEmail(bloodDonor.getEmail());
    if (existing.isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(Map.of("error", "Email already registered"));
    }

    // Encriptar contraseña
    bloodDonor.setPassword(passwordEncoder.encode(bloodDonor.getPassword()));
    bloodDonorService.createNew(bloodDonor);

    return ResponseEntity.status(HttpStatus.CREATED)
      .body(Map.of("status", "OK"));
  }

  // 🔹 Login con Authorization: Basic base64(email:password)
  @PostMapping("/bloodDonor/login")
  public ResponseEntity<?> loginBloodDonor(@RequestHeader(value = "Authorization", required = true) String authHeader) {
    try {
      System.out.println("Tiburcio-1");
      String[] credentials = extractCredentials(authHeader);
      System.out.println("Tiburcio-2");
      String email = credentials[0];
      String password = credentials[1];
      System.out.println("Tiburcio-3");

      Optional<BloodDonor> bloodDonorOpt = bloodDonorService.findByEmail(email);
      System.out.println("Tiburcio-4");
      if (bloodDonorOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("error", "Invalid credentials"));
      }

      BloodDonor bloodDonor = bloodDonorOpt.get();
      System.out.println("Tiburcio-5");

      // Comparar contraseñas
      if (!passwordEncoder.matches(password, bloodDonor.getPassword())) {
        System.out.println("Tiburcio-6");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("error", "Invalid credentials"));
      }
      System.out.println("Tiburcio-6ymedio");
      // Generar token JWT
      String token = jwtService.generateToken(bloodDonor.getId(), "bloodDonor");
      System.out.println("Tiburcio-7");

      Map<String, String> responseBody = new HashMap<>();
      responseBody.put("token", token);
      System.out.println("Tiburcio-8");
      responseBody.put("status", "OK");
      return ResponseEntity.ok(responseBody);

    } catch (IllegalArgumentException e) {
      System.out.println("Tiburcio-9");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(Map.of("error", e.getMessage()));
    }
  }

  // 🔹 Extrae usuario y contraseña del header Basic Auth
  private String[] extractCredentials(String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Basic ")) {
      throw new IllegalArgumentException("Missing or invalid Authorization header");
    }

    String base64Credentials = authHeader.substring("Basic ".length());
    byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
    String decodedString = new String(decodedBytes);

    if (!decodedString.contains(":")) {
      throw new IllegalArgumentException("Invalid Basic Auth format. Expected 'email:password'");
    }

    return decodedString.split(":", 2);
  }
}
