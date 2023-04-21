package com.Air.BnB.controllers;

import com.Air.BnB.models.Publication;
import com.Air.BnB.repositories.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class PublicationController {
    @Autowired
    PublicationRepository publicationRepository;

    @GetMapping("/publications")
    public List<Publication> getAll(Model model) {
        return this.publicationRepository.findAll();
    }

    @GetMapping("/publications/{id}")
    public Publication getById(@PathVariable int id) throws Exception {
        return this.publicationRepository.findById(id).orElseThrow(() -> new Exception("Publication not exist"));
    }

    @PostMapping("/publications")
    public ResponseEntity<Publication> addPublication(@RequestBody Publication publication) {
        Publication addedPublication = this.publicationRepository.save(publication);
        return new ResponseEntity<>(addedPublication, HttpStatus.CREATED);
    }

    @PutMapping("/publications")
    public Publication putById(@RequestBody Publication publication) throws Exception {
        Publication p = new Publication(publicationRepository.findById(publication.getIdPub()).orElseThrow(() -> new Exception("Publication not exist")));
        return this.publicationRepository.save(publication);
    }
}
