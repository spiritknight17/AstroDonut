package com.payor.service;

import com.payor.model.Product;
import com.payor.model.ProductCategory;

import java.util.*;

public interface ProductService {

    List<Product> getAllProducts();
    Product[] getAll();
    Product get(Integer id);
    Product create(Product product);
    Product update(Product product);
    void delete(Integer id);
    Map<String, List<Product>> getCategoryMappedProducts();
    List<ProductCategory> listProductCategories();
}
