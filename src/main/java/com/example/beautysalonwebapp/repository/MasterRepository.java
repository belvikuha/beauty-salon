package com.example.beautysalonwebapp.repository;

import com.example.beautysalonwebapp.entity.Master;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MasterRepository extends CrudRepository<Master, Integer> {
//    List<Master> findByService(int id);
}
