package com.payor.repository;

import com.payor.entity.OrderItemData;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderItemDataRepository extends CrudRepository<OrderItemData, Integer> {
   // Customer-related queries removed - no longer supported
   //List<OrderItemData> saveAll(List<OrderItemData> orderItemData);
}
