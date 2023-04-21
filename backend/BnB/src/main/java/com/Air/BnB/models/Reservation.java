package com.Air.BnB.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idReserv;

    @ManyToOne
    private User owner;

    @ManyToOne
    private Property property;

    private Date startDate;

    private Date endDate;

    public Reservation(User owner, Property property, Date startDate, Date endDate) {
        this.owner = owner;
        this.property = property;
        this.startDate = startDate;
        this.endDate = endDate;
    }


}
