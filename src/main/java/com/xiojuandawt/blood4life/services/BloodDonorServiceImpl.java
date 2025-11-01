package com.xiojuandawt.blood4life.services;

import com.xiojuandawt.blood4life.dto.BloodDonorDTO;
import com.xiojuandawt.blood4life.entities.BloodDonor;
import com.xiojuandawt.blood4life.repositories.BloodDonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BloodDonorServiceImpl implements BloodDonorService{

  @Autowired
  private BloodDonorRepository bloodDonorRepository;

  @Override
  public List<BloodDonorDTO> findAll() {
    List<BloodDonor> bloodDonorList = (List<BloodDonor>) this.bloodDonorRepository.findAll();
    List<BloodDonorDTO> bloodDonorDTOList = new ArrayList<>();

    for (BloodDonor bloodDonor: bloodDonorList) {
      BloodDonorDTO bloodDonorDTO = this.parseEntityToDto(bloodDonor);

      bloodDonorDTOList.add(bloodDonorDTO);
    }

    return bloodDonorDTOList;
  }

  @Override
  public BloodDonorDTO createNew(BloodDonor bloodDonor) {
    BloodDonor newBloodDonor = this.bloodDonorRepository.save(bloodDonor);
    BloodDonorDTO newBloodDonorDTO = this.parseEntityToDto(newBloodDonor);

    return newBloodDonorDTO;
  }



  @Override
  public void delete(int id) {
    this.bloodDonorRepository.deleteById(id);
  }

  public BloodDonorDTO parseEntityToDto(BloodDonor bloodDonor) {
    BloodDonorDTO bloodDonorDTO = new BloodDonorDTO();
    bloodDonorDTO.setId(bloodDonor.getId());
    bloodDonorDTO.setDni(bloodDonor.getDni());
    bloodDonorDTO.setFirstName(bloodDonor.getFirstName());
    bloodDonorDTO.setLastName(bloodDonor.getLastName());
    bloodDonorDTO.setGender(bloodDonor.getGender());
    bloodDonorDTO.setEmail(bloodDonor.getEmail());
    bloodDonorDTO.setPhoneNumber(bloodDonor.getPhoneNumber());
    bloodDonorDTO.setDateOfBirth(bloodDonor.getDateOfBirth());

    return bloodDonorDTO;
  }

}
