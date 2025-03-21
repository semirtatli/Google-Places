package com.example.google_places.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.web.client.RestTemplate;
import com.example.google_places.Entity.Place;
import com.example.google_places.Repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class PlaceService {


    @Autowired
    private PlaceRepository placeRepository;

    @Value("${google.places.api.key}")
    private String googlePlacesApiKey;

    @Cacheable(value = "placesCache", key = "#longitude + '-' + #latitude + '-' + #radius")
    public Object findPlaces(double longitude, double latitude, int radius) {
        // Check if current search exist in database
        Optional<Place> optionalPlace =
                placeRepository.findByLongitudeAndLatitudeAndRadius(longitude, latitude, radius);

        //If current search exits retrieve from database
        //Later I will add Redis for caching
        if (optionalPlace.isPresent()) {

            return optionalPlace.get().getResponse();
        }

        String googleApiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
                + latitude + "," + longitude + "&radius=" + radius + "&key=" + googlePlacesApiKey;

        // If no record exists, create a new dummy response for now for testing
//        String response = "Google Places API ("
//                + latitude + ", " + longitude + ", " + radius;
try {
    RestTemplate restTemplate = new RestTemplate();

    String response = restTemplate.getForObject(googleApiUrl, String.class);

    // Create a new item and save from repository if not exists in database
    Place newPlace = new Place();
    newPlace.setLongitude(longitude);
    newPlace.setLatitude(latitude);
    newPlace.setRadius(radius);
    newPlace.setResponse(response);

    placeRepository.save(newPlace);

    return response;
} catch (Exception e) {
    return "An error occurred. Please try again.";
}
    }
}
