package com.example.google_places.Entity;

import jakarta.persistence.*;

//Creates a database table with name "place"
@Entity
@Table(name = "place")
public class Place {

    //ID creation
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double longitude;
    private double latitude;
    private int radius;

    //Another column except input parameters for checking the response
    @Column(columnDefinition = "TEXT")
    private String response;

    //Constructor, getter, setter...
    public Place() {
    }

    public Place(double longitude, double latitude, int radius, String response) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.radius = radius;
        this.response = response;
    }


    public Long getId() {
        return id;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

}
