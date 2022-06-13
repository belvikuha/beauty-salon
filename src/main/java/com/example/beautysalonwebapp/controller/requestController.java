package com.example.beautysalonwebapp.controller;


import com.example.beautysalonwebapp.entity.Master;
import com.example.beautysalonwebapp.entity.Request;
import com.example.beautysalonwebapp.entity.User;
import com.example.beautysalonwebapp.repository.MasterRepository;
import com.example.beautysalonwebapp.repository.RequestRepository;
import com.example.beautysalonwebapp.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class requestController {

    @Autowired
    private MasterRepository masterRepository;

    @Autowired
    private RequestRepository requestRepository;

    public List<Master> findByService(int id) {
        List<Master> masters = new ArrayList<>();
        List<Master> allMasters = (List<Master>) masterRepository.findAll();

        for(var m : allMasters){
            if(m.getService_id() == id){
                masters.add(m);
            }
        }
        return masters;
    }

    @GetMapping("/findMaster/{id}")
    public List<Master> findMaster(@PathVariable Integer id) {
        return findByService(id);
    }

    @PostMapping("/sendRequest")
    private Request send(@RequestBody Request request) {
        return requestRepository.save(request);
    }
}
