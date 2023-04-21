package com.Air.BnB.repositories;

import com.Air.BnB.models.Property;
import com.Air.BnB.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {
    List<Property> findAllByOwner(User owner);
}
