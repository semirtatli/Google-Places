package com.example.google_places.Repository;


import com.example.google_places.Entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

//Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {

    Optional<Place> findByLongitudeAndLatitudeAndRadius(double longitude, double latitude, int radius);
}

