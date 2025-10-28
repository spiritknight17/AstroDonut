package com.payor.model;

import lombok.Data;

@Data
public class Product {
    int id;
    String name;
    String description;
    String imageFile;
    String unitOfMeasure;
    double price;
    int ratings;
}
