package com.Air.BnB.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProperty;
    private String type;
    private String Image;
    private String address;
    private String rentPaytype;
    private double size;
    @JsonIgnore
    @ManyToOne
    private User owner;

    private double price;
    private int chambers;
    private boolean rentAvailability;

    public Property(Property property) {
        this.idProperty = property.getIdProperty();
        this.type = property.getType();
        this.Image = property.getImage();
        this.size = property.getSize();
        this.owner = property.getOwner();
        this.address = property.getAddress();
        this.rentPaytype = property.getRentPaytype();
        this.rentAvailability = property.isRentAvailability();
        this.price = property.getPrice();
        this.chambers = property.getChambers();


    }
}

