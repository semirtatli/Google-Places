package com.example.google_places.Controller;

import com.example.google_places.Services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    //GetRequest that calls Service method
    @GetMapping
    public ResponseEntity<?> getNearbyPlaces(
            @RequestParam double longitude,
            @RequestParam double latitude,
            @RequestParam int radius) {
        Object result = placeService.findPlaces(longitude, latitude, radius);
        return ResponseEntity.ok(result);
    }
}

