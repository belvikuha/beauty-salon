package com.example.beautysalonwebapp.controller;

import com.example.beautysalonwebapp.entity.Master;
import com.example.beautysalonwebapp.entity.Request;
import com.example.beautysalonwebapp.entity.User;
import com.example.beautysalonwebapp.exception.ValidationException;
import com.example.beautysalonwebapp.repository.RequestRepository;
import com.example.beautysalonwebapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RequestRepository requestRepository;
//    private UserService userService;


    private void validateUserRegistr(User demouser) throws ValidationException {
        List<User> user = userRepository.findByPhone(demouser.getPhone());
        if (user.size() != 0 ) {
            System.out.println("o no o no!");
            throw new ValidationException("Пользователь с таким телефоном уже существует");
        }
        if(demouser.getPhone().length() < 10){
            throw new ValidationException("Неверный формат номера");
        }
    }




    private User saveUsers( User user) {
            return userRepository.save(user);
    }
    @PostMapping("/save")
    public String validate(@RequestBody User user)  {
        String answer = "Регистрация успешна";
        try{
            validateUserRegistr(user);
            saveUsers(user);
        }catch (ValidationException e){
            System.out.println(e.getMessage());
            answer = e.getMessage();
        }

        return answer;
    }



    @PostMapping(value = "/enter")
    public String  entered(@RequestBody User ifUser, HttpServletResponse response) {
        String uns = "";

//        model.addAttribute("phone", userRepository.findById(id));
        try {
//            List<User> users = ;
            User user = userRepository.findByPhone(ifUser.getPhone()).get(0);
            if(user.getPassword().equals(ifUser.getPassword())){
                uns = "good";
                Cookie cookie = new Cookie("id_user", user.getId().toString());
                cookie.setMaxAge(60*60);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
            else uns ="Не верный пароль";
        }
        catch (Exception e){
            uns = "Такого пользователя не существует";
        }
//        try{}catch ()


        return uns;
    }

    @GetMapping(value = "/userinfo")
    public User userInfo(@CookieValue(value = "id_user", required = false)Cookie id, HttpServletResponse response) {
        int id_user = Integer.parseInt(id.getValue());

        User user = userRepository.findById(id_user).get();
        return user;

    }

//    @PostMapping("/sendRequest")
//    public Request saveRequest(@RequestBody Request request) {
//
//        return requestRepository.save(request);
//    }

//    @GetMapping(value = "/exit")
//    public void userExit(@CookieValue(name = "id_user")Cookie cookies, HttpServletResponse response) {
//        Cookie cookie = new Cookie (cookies.getName (), null); // Перед удалением вы должны создать новое и одно значение будет пустым;
//        //cookie.setPath("/");// Путь должен быть таким же
//        cookie.setMaxAge (0); // Жизненный цикл установлен на 0
//
//    }

}
