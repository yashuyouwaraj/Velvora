package com.Velvora.service;

import com.Velvora.model.Order;
import com.Velvora.model.Seller;
import com.Velvora.model.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
