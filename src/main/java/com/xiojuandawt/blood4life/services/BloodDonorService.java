package com.xiojuandawt.blood4life.services;

import com.xiojuandawt.blood4life.dto.BloodDonorDTO;
import com.xiojuandawt.blood4life.entities.BloodDonor;

import java.util.List;

public interface BloodDonorService {

  List<BloodDonorDTO> findAll();

  BloodDonorDTO createNew(BloodDonor bloodDonor);

  void delete(int id);
}
