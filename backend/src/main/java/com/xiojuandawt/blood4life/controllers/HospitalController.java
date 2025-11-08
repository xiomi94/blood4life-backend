package com.xiojuandawt.blood4life.controllers;

import com.xiojuandawt.blood4life.dto.HospitalDTO;
import com.xiojuandawt.blood4life.entities.Hospital;
import com.xiojuandawt.blood4life.exception.ResourceNotFoundException;
import com.xiojuandawt.blood4life.services.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hospital")
public class HospitalController {

  @Autowired
  private HospitalService hospitalService;

  @GetMapping
  public ResponseEntity<List<HospitalDTO>> hospitalList() {
    List<HospitalDTO> hospitalDTOList = this.hospitalService.findAll();
    return ResponseEntity
      .status(HttpStatus.OK)
      .body(hospitalDTOList);
  }

  @PostMapping
  public ResponseEntity<HospitalDTO> addHospital(
    @RequestBody Hospital newHospital
  ) {
    HospitalDTO hospitalInDataBase = this.hospitalService.createNew(newHospital);
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(hospitalInDataBase);
  }

  @PutMapping
  public ResponseEntity<?> updateHospital(
    @RequestBody Hospital updatedHospital
  ) {
    try {
      HospitalDTO hospitalInDataBase = this.hospitalService.update(updatedHospital);
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(hospitalInDataBase);
    } catch (ResourceNotFoundException e) {
      Map<String, String> body = new HashMap<>();
      body.put("message", "No se ha encontrado el hospital con id " + updatedHospital.getId());
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(body);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteById(
    @PathVariable("id") Integer id
  ) {
    this.hospitalService.delete(id);
    Map<String, String> body = new HashMap<>();
    body.put("status", "OK");
    return ResponseEntity
      .status(HttpStatus.OK)
      .body(body);
  }

}
