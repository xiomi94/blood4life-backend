package com.xiojuandawt.blood4life.controllers;

import com.xiojuandawt.blood4life.dto.BloodDonorDTO;
import com.xiojuandawt.blood4life.entities.BloodDonor;
import com.xiojuandawt.blood4life.exception.ResourceNotFoundException;
import com.xiojuandawt.blood4life.services.BloodDonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bloodDonor")
public class BloodDonorController {

  @Autowired
  private BloodDonorService bloodDonorService;

  @GetMapping
  public ResponseEntity<List<BloodDonorDTO>> bloodDonorList() {
    List<BloodDonorDTO> bloodDonorList = this.bloodDonorService.findAll();
    return ResponseEntity
      .status(HttpStatus.OK)
      .body(bloodDonorList);
  }

  @PostMapping
  public ResponseEntity<BloodDonorDTO> addNewBloodDonor(
    @RequestBody BloodDonor newBloodDonor
  ) {
    BloodDonorDTO bloodDonorInDatabase = this.bloodDonorService.createNew(newBloodDonor);
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(bloodDonorInDatabase);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateBloodDonor(
    @RequestBody BloodDonor updatedBloodDonor,
    @PathVariable Integer id
  ) {
    try {
      BloodDonorDTO bloodDonorInDatabase = this.bloodDonorService.update(updatedBloodDonor, id);
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(bloodDonorInDatabase);
    } catch (ResourceNotFoundException e) {
      Map<String, String> body = new HashMap<>();
      body.put("error", "El donante con id " + updatedBloodDonor.getId() + " no existe");
      return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(body);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteById(
    @PathVariable Integer id
  ) {
    this.bloodDonorService.delete(id);
    Map<String, String> body = new HashMap<>();
    body.put("status", "OK");
    return ResponseEntity
      .status(HttpStatus.OK)
      .body(body);
  }

}
