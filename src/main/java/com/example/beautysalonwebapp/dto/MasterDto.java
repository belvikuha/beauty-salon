package com.example.beautysalonwebapp.dto;

public class MasterDto {

    private String name;

    private String phone;

    private String img;

    private String service;

     public MasterDto(String name, String phone, String img, String service){
        this.name = name;
        this.phone = phone;
        this.img = img;
        this.service = service;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getImg() {
        return img;
    }

    public String getService() {
        return service;
    }
}
