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
  private  BloodDonorService bloodDonorService;

  @Autowired
  private  JwtService jwtService;

  @Autowired
  private  PasswordEncoder passwordEncoder;


  @PostMapping("/bloodDonor/register")
  public ResponseEntity<Map<String, String>> registerBloodDonor(
    @RequestBody BloodDonor bloodDonor
  ) {
    bloodDonor.setPassword(passwordEncoder.encode(bloodDonor.getPassword()));
    this.bloodDonorService.createNew(bloodDonor);
    Map<String, String> responseBody = new HashMap<>();
    responseBody.put("status", "OK");
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(responseBody);
  }

  @PostMapping("/bloodDonor/login")
  public ResponseEntity<?> loginBloodDonor(
    @RequestHeader("Authorization")
    String authHeader
  ) {
    String[] credentials = extractCredentials(authHeader);
    String email = credentials[0];
    String password = credentials[1];

    Optional<BloodDonor> bloodDonorOpt = bloodDonorService.findByEmail(email);
    if (bloodDonorOpt.isEmpty() || !passwordEncoder.matches(password, bloodDonorOpt.get().getPassword())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    BloodDonor bloodDonor = bloodDonorOpt.get();
    String token = jwtService.generateToken(bloodDonor.getId(), "bloodDonor");
    Map<String, String> responseBody = new HashMap<>();
    responseBody.put("token", token);
    return ResponseEntity.ok().body(responseBody);
  }

  private String[] extractCredentials(String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Basic ")) {
      throw new IllegalArgumentException("Missing or invalid Authorization header");
    }

    String base64Credentials = authHeader.substring("Basic ".length());

    byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
    String decodedString = new String(decodedBytes);

    return decodedString.split(":", 2);
  }

}
