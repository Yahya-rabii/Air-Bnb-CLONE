package com.Air.BnB.controllers;

import com.Air.BnB.models.User;
import com.Air.BnB.models.Property;
import com.Air.BnB.models.Reservation;
import com.Air.BnB.repositories.UserRepository;
import com.Air.BnB.repositories.PropertyRepository;
import com.Air.BnB.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReservationController {
    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PropertyRepository propertyRepository;

    @GetMapping("/reservations")
    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    @GetMapping("/reservations/{id}")
    public Reservation getById(@PathVariable int id) throws Exception {
        return reservationRepository.findById(id).orElseThrow(() -> new Exception("Reservation not found"));
    }

    @PostMapping("/people/{userId}/properties/{propertyId}/reservations")
    public ResponseEntity<String> addReservation(@PathVariable int userId, @PathVariable int propertyId,
                                                 @RequestBody Reservation reservation) throws Exception {
        User tempuser = userRepository.findById(userId).orElseThrow(() -> new Exception("user not found"));
        Property tempProperty = propertyRepository.findById(propertyId).orElseThrow(() -> new Exception("property not found"));

        tempProperty.setRentAvailability(false);
        propertyRepository.save(tempProperty);
        Reservation newreservation = new Reservation(tempuser, tempProperty, reservation.getStartDate(), reservation.getEndDate());

        reservationRepository.save(newreservation);

        return ResponseEntity.ok(newreservation.toString());
    }


    @PutMapping("/reservations")
    public Reservation putById(@RequestBody Reservation reservation) throws Exception {
        Reservation r = reservationRepository.findById(reservation.getIdReserv())
                .orElseThrow(() -> new Exception("Reservation not found"));
        return reservationRepository.save(reservation);
    }
}
