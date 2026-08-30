package com.financetracker.repository;

import com.financetracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import com.financetracker.model.User;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByOrderByDateDesc();

    List<Transaction> findByDateBetweenOrderByDateDesc(LocalDate from, LocalDate to);

    List<Transaction> findByCategoryOrderByDateDesc(String category);

    List<Transaction> findByUserOrderByDateDesc(User user);
}
