package com.xiojuandawt.blood4life.controllers;

import com.xiojuandawt.blood4life.dto.BloodDonorDTO;
import com.xiojuandawt.blood4life.entities.BloodDonor;
import com.xiojuandawt.blood4life.services.BloodDonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

}
