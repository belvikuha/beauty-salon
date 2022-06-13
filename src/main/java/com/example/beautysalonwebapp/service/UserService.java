package com.example.beautysalonwebapp.service;


import com.example.beautysalonwebapp.entity.User;
import com.example.beautysalonwebapp.exception.ValidationException;
import com.example.beautysalonwebapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    private void validateUser(User user) throws ValidationException {
        if (isNull(user)) {
            throw new ValidationException("Object user is null");
        }
        if (isNull(user.getPhone()) || user.getPhone().isEmpty()) {
            throw new ValidationException("Login is empty");
        }
    }

    public void validateUserRegistr(User demouser) throws ValidationException {
      User user = userRepository.findByPhone(demouser.getPhone()).get(0);
        if (isNull(user)) {
            throw new ValidationException("Пользователь с таким телефоном уже существует");
        }
    }

}
