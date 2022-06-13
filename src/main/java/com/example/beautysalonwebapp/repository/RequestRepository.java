package com.example.beautysalonwebapp.repository;

import com.example.beautysalonwebapp.entity.Request;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RequestRepository extends CrudRepository<Request, Integer> {
    List<Request> findByOrderByDateRequestAsc();
    List<Request> findByOrderByTotalPriceDesc();

}
