package com.payor.repository;

import com.payor.entity.OrderItemData;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderItemDataRepository extends CrudRepository<OrderItemData, Integer> {
    List<OrderItemData> findAllByCustomerId(Integer customerId);
//    List<OrderItemData> saveAll(List<OrderItemData> orderItemData);
}
