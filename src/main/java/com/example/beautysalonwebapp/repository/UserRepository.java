package com.example.beautysalonwebapp.repository;

import com.example.beautysalonwebapp.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findByPhone(String phone);
}
