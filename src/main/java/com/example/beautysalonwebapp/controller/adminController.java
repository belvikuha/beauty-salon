package com.example.beautysalonwebapp.controller;

import com.example.beautysalonwebapp.dto.MasterDto;
import com.example.beautysalonwebapp.entity.Master;
import com.example.beautysalonwebapp.entity.Request;
import com.example.beautysalonwebapp.entity.Service;
import com.example.beautysalonwebapp.repository.MasterRepository;
import com.example.beautysalonwebapp.repository.RequestRepository;
import com.example.beautysalonwebapp.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path="/admin")
public class adminController {

    @Autowired
    private MasterRepository masterRepository;

//    @Autowired
//    private MasterService masterService;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private RequestRepository requestRepository;

    ///мастера
    @GetMapping(value = "/masters")
    public List<Master> allMasters() {
        return (List<Master>) masterRepository.findAll();
    }
    @PostMapping("/savemaster")
    public Master saveMaster(@RequestBody Master master) {

        return masterRepository.save(master);
    }
    @DeleteMapping("/deletemaster/{id}")
    public void deleteUsers(@PathVariable Integer id) {
        masterRepository.deleteById(id);
    }
    @GetMapping("/masterSlider")
    public ArrayList<MasterDto> showMaster() {
        List<Master> masters = (List<Master>) masterRepository.findAll();
        ArrayList<MasterDto> masters_ = new ArrayList<>();
        for(var m : masters){
            MasterDto master = new MasterDto(
                    m.getName(),
                    m.getPhone(),
                    m.getImg(),
                    serviceRepository.findById(m.getService_id()).get().getNameServ()
            );
            masters_.add(master);
        }

        return masters_;
    }

    ///сервисы
    @GetMapping(value = "/services")
    public List<Service> allServ() {
        return (List<Service>) serviceRepository.findAll();
    }
    @PostMapping("/saveservice")
    public Service saveServ(@RequestBody Service service) {
        return serviceRepository.save(service);
    }
    @DeleteMapping("/deleteservice/{id}")
    public void deleteServ(@PathVariable Integer id) {
        serviceRepository.deleteById(id);
    }
    @GetMapping("/findservice/{id}")
    public String findServ(@PathVariable Integer id) {
        return serviceRepository.findById(id).get().getNameServ();
    }

    ///////заявки

    @GetMapping(value = "/requests/{orderb}")
    public  List<Request> allReq(@PathVariable String orderb) {
        if(orderb.equals("date")) {
            return  requestRepository.findByOrderByDateRequestAsc();
        }
        else{
            List<Request>  regRequests = new ArrayList<>();
            List<Request>  NotRegRequests = new ArrayList<>();
            for ( var req:requestRepository.findByOrderByTotalPriceDesc())
            {
                if(req.getTotalPrice() !=0 )
                    regRequests.add(req);
                else NotRegRequests.add(req);
            }
            if(orderb.equals("registr") )
                 return  regRequests;
            if(orderb.equals("!registr"))
                return  NotRegRequests;
            else
                return (List<Request>) requestRepository.findAll();
        }
    }

    @DeleteMapping("/deleterequest/{id}")
    public void deleteReq(@PathVariable Integer id) {
        requestRepository.deleteById(id);
    }
}
