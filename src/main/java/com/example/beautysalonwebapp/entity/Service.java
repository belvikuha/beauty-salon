package com.example.beautysalonwebapp.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String nameServ;

    private Integer price;

    private String img;

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameServ() {
        return nameServ;
    }

    public void setNameServ(String nameServ) {
        this.nameServ = nameServ;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
