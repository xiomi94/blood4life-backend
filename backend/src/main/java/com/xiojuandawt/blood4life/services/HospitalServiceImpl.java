package com.xiojuandawt.blood4life.services;


import com.xiojuandawt.blood4life.dto.HospitalDTO;
import com.xiojuandawt.blood4life.entities.Hospital;
import com.xiojuandawt.blood4life.exception.ResourceNotFoundException;
import com.xiojuandawt.blood4life.repositories.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HospitalServiceImpl implements HospitalService {

  @Autowired
  private HospitalRepository hospitalRepository;

  @Override
  public List<HospitalDTO> findAll() {
    List<Hospital> hospitalList = (List<Hospital>) this.hospitalRepository.findAll();
    List<HospitalDTO> hospitalDTOList = new ArrayList<>();

    for (Hospital hospital : hospitalList) {
      HospitalDTO hospitalDTO = this.parseEntityToDTO(hospital);

      hospitalDTOList.add(hospitalDTO);
    }
    return hospitalDTOList;
  }

  @Override
  public HospitalDTO createNew(Hospital hospital) {
    Hospital newHospital = this.hospitalRepository.save(hospital);
    HospitalDTO hospitalDTO = this.parseEntityToDTO(newHospital);

    return hospitalDTO;
  }

  @Override
  public HospitalDTO update(Hospital hospital) {
    Optional<Hospital> hospitalInDataBase = this.hospitalRepository.findById(hospital.getId());

    if (hospitalInDataBase.isEmpty()){
      throw new ResourceNotFoundException();
    }

    Hospital updatedHospital = this.hospitalRepository.save(hospital);
    HospitalDTO updatedHospitalDTO = this.parseEntityToDTO(updatedHospital);

    return updatedHospitalDTO;
  }

  @Override
  public void delete(int id) { this.hospitalRepository.deleteById(id); }

  public HospitalDTO parseEntityToDTO(Hospital hospital) {
    HospitalDTO hospitalDTO = new HospitalDTO();
    hospitalDTO.setId(hospital.getId());
    hospitalDTO.setCif(hospital.getCif());
    hospitalDTO.setName(hospital.getName());
    hospitalDTO.setAddress(hospital.getAddress());
    hospitalDTO.setEmail(hospital.getEmail());
    hospitalDTO.setPhoneNumber(hospital.getPhoneNumber());
    return hospitalDTO;
  }

  @Override
  public Optional<Hospital> findById(Integer id) {
    return this.hospitalRepository.findById(id);
  }

  @Override
  public Optional<Hospital> findHospitalByEmail(String email) {
    return this.hospitalRepository.findHospitalByEmail(email);
  }
}
