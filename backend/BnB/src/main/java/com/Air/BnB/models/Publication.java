package com.Air.BnB.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPub;
    private Date releaseDate;
    private String title;

    @ManyToOne
    private Property property;

    @JsonIgnore
    @ManyToOne
    private User owner;

    public Publication(Publication publication) {
        this.idPub = publication.getIdPub();
        this.releaseDate = publication.getReleaseDate();
        this.property = publication.getProperty();
        this.owner = publication.getOwner();

    }

}
