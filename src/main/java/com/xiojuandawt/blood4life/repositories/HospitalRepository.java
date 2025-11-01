package com.xiojuandawt.blood4life.repositories;

import com.xiojuandawt.blood4life.entities.Hospital;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends CrudRepository<Hospital, Integer> {
}
