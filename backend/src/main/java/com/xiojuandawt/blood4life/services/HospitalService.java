package com.xiojuandawt.blood4life.services;


import com.xiojuandawt.blood4life.dto.HospitalDTO;
import com.xiojuandawt.blood4life.entities.Hospital;

import java.util.List;

public interface HospitalService {
  List<HospitalDTO> findAll();

  HospitalDTO createNew(Hospital hospital);

  HospitalDTO update(Hospital hospital);

  void delete(int id);
}
