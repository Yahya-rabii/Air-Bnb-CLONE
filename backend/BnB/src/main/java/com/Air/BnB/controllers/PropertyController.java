package com.Air.BnB.controllers;

import com.Air.BnB.models.User;
import com.Air.BnB.models.Property;
import com.Air.BnB.repositories.UserRepository;
import com.Air.BnB.repositories.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class PropertyController {
    @Autowired
    PropertyRepository propertyRepository;
    @Autowired
    UserRepository userRepository;

    // Every property must have an owner id
    @PostMapping("/{userId}/addPropertybyowner")
    public ResponseEntity<Property> addPropertybyowner(@PathVariable int userId, @RequestBody Property property) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = optionalUser.get();
        property.setOwner(user);
        propertyRepository.save(property);
        user.addPropertyId(property);
        userRepository.save(user);
        return ResponseEntity.ok(property);
    }

    @GetMapping("/properties")
    public List<Property> getAll(Model model) {
        return this.propertyRepository.findAll();
    }

    @GetMapping("/properties/{id}")
    public Property getById(@PathVariable int id) throws Exception {
        return this.propertyRepository.findById(id).orElseThrow(() -> new Exception("Property not exist"));
    }
    @GetMapping("/properties/email/{email}")
    public List<Property> getById(@PathVariable String email) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(email);
            User user = optionalUser.get();
        return this.propertyRepository.findAllByOwner(user);
    }

    @PostMapping("/properties")
    public Property addProperty(@RequestBody Property property) {
        return this.propertyRepository.save(property);
    }

    @PutMapping("/properties")
    public Property putById(@RequestBody Property property) throws Exception {
        Property p = propertyRepository.findById(property.getIdProperty()).orElseThrow(() -> new Exception("Property not exist"));
        p.setIdProperty( property.getIdProperty());
        p.setType(property.getType());
        p.setImage(property.getImage()) ;
        p.setSize(property.getSize());

        p.setOwner(property.getOwner());
        p.setAddress(property.getAddress());
        p.setRentPaytype(property.getRentPaytype());
        p.setRentAvailability(property.isRentAvailability());
        p.setPrice(property.getPrice());
        p.setChambers(property.getChambers());
        return this.propertyRepository.save(p);
    }
}
