package com.Air.BnB.controllers;

import com.Air.BnB.models.User;
import com.Air.BnB.models.Property;
import com.Air.BnB.models.Publication;
import com.Air.BnB.repositories.UserRepository;
import com.Air.BnB.repositories.PropertyRepository;
import com.Air.BnB.repositories.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000/")

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PublicationRepository publicationRepository;
    @Autowired
    PropertyRepository propertyRepository;




    @GetMapping("/users")
    public List<User> getall(Model model) {
        return this.userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getbyid(@PathVariable int id) throws Exception {
        return this.userRepository.findById(id).orElseThrow(() -> new Exception("User does not exist"));
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {

        return this.userRepository.save(user);
    }

    @PostMapping("/{userId}/addpublication")
    public ResponseEntity<Publication> addPublication(@PathVariable int userId, @RequestBody Publication publication) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = optionalUser.get();
        if (!user.isOwner()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        publication.setOwner(user);
        publicationRepository.save(publication);
        user.addPublicationId(publication);
        userRepository.save(user);
        return ResponseEntity.ok(publication);
    }

    @PostMapping("/{userId}/addproperty")
    public ResponseEntity<Property> addProperty(@PathVariable int UserId, @RequestBody Property property) {
        Optional<User> optionalUser = userRepository.findById(UserId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = optionalUser.get();
        if (!user.isOwner()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        property.setOwner(user);
        propertyRepository.save(property);
        user.addPropertyId(property);
        userRepository.save(user);
        return ResponseEntity.ok(property);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return this.userRepository.findById(id).map(x -> {
            x.setFirstName(user.getFirstName());
            x.setLastName(user.getLastName());
            x.setOwner(false);
            return this.userRepository.save(x);
        }).orElseGet(() -> this.userRepository.save(user));

    }


    @GetMapping("/users/email/{email}")
    public User getByUserEmail(@PathVariable String email) throws Exception {
        return this.userRepository.findByEmail(email).orElseThrow(() -> new Exception("Property not exist"));
    }

    @GetMapping("/users/getid/{email}")
    public int getuserid(@PathVariable String email) throws Exception {
        User u = this.userRepository.findByEmail(email).orElseThrow(() -> new Exception("Property not exist"));
        return u.getUserid();

    }
    @DeleteMapping("/users/{id}")
    public void deleteUserById(@PathVariable int id) throws Exception {
        this.userRepository.deleteById(id);
    }

    @DeleteMapping("/users")
    public void deleteAllUsers() {
        this.userRepository.deleteAll();
    }

}
