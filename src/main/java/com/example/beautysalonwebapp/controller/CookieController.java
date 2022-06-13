package com.example.beautysalonwebapp.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class CookieController {



//    @GetMapping(value = "/set-cookie")
//    public ResponseEntity<?> setCookie(HttpServletResponse response) throws IOException {
//        Cookie cookie = new Cookie("data", "Come_to_the_dark_side");//создаем объект Cookie,
//        //в конструкторе указываем значения для name и value
//        cookie.setPath("/");//устанавливаем путь
//        cookie.setMaxAge(86400);//здесь устанавливается время жизни куки
//        response.addCookie(cookie);//добавляем Cookie в запрос
//        response.setContentType("text/plain");//устанавливаем контекст
//        return ResponseEntity.ok().body(HttpStatus.OK);//получилось как бы два раза статус ответа установили, выбирайте какой вариант лучше
//    }
//    @GetMapping(value = "/get-cookie")
//    public ResponseEntity<?> readCookie(@CookieValue(value = "data") String data) {
//        return ResponseEntity.ok().body(data);
//    }
//
//
//    @GetMapping("/read-spring-cookie")
//    public String readCookie2(
//            @CookieValue(name = "user-id", defaultValue = "default-user-id") String userId) {
//        return userId;
//    }



//    ResponseCookie springCookie = ResponseCookie.from("user-id", "c2FtLnNtaXRoQGV4YW1wbGUuY29t")
//            .httpOnly(true)
//            .secure(true)
//            .path("/")
//            .maxAge(60)
//            .domain("example.com")
//            .build();

}
