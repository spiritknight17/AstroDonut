package com.payor.service;

import com.payor.model.Product;

import java.util.*;

public interface ProductService {

    List<Product> getAllProducts();
    Product[] getAll();
    Product get(Integer id);
    Product create(Product product);
    Product update(Product product);
    void delete(Integer id);
}
