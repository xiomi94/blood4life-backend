package com.xiojuandawt.blood4life.repositories;

import com.xiojuandawt.blood4life.entities.BloodDonor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodDonorRepository extends CrudRepository<BloodDonor, Integer> {
}

