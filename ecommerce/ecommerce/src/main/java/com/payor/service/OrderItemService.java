package com.payor.service;
import com.payor.enums.OrderItemStatus;
import com.payor.model.OrderItem;

import java.util.List;

public interface OrderItemService {
    List<OrderItem> getAll();
    OrderItem create(OrderItem orderItem);
    List<OrderItem> create(List<OrderItem> orderItems);
    OrderItem update(OrderItem orderItem);
    List<OrderItem> update(List<OrderItem> orderItems);
    List<OrderItem> updateStatus(List<Integer> id, OrderItemStatus orderItemStatus);
    OrderItem get(Integer id);
    void delete (Integer id);
    void deleteAll();
}
