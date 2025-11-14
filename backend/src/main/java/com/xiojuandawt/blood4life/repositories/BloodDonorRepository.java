package com.xiojuandawt.blood4life.repositories;

import com.xiojuandawt.blood4life.entities.BloodDonor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BloodDonorRepository extends CrudRepository<BloodDonor, Integer> {
  Optional<BloodDonor> findByEmail(String email);
  Optional<BloodDonor> findById(Integer id);
}

