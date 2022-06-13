package com.example.beautysalonwebapp.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.xml.crypto.Data;
import java.util.Date;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String phoneClient;

    private Date dateRequest;

    private Integer totalPrice;

    private Integer idMaster;

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPhoneClient() {
        return phoneClient;
    }

    public void setPhoneClient(String phoneClient) {
        this.phoneClient = phoneClient;
    }

    public Date getDateRequest() {
        return dateRequest;
    }

    public void setDateRequest(Date dateRequest) {
        this.dateRequest = dateRequest;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getIdMaster() {
        return idMaster;
    }

    public void setIdMaster(Integer idMaster) {
        this.idMaster = idMaster;
    }
}
