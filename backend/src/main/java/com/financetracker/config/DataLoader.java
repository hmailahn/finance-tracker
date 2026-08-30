package com.financetracker.config;

import com.financetracker.model.Transaction;
import com.financetracker.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private final TransactionRepository repo;

    @Override
    public void run(ApplicationArguments args) {
        // seeding disabled — transactions now require a user
        // register via the app to create your first user
    }
//    public void run(ApplicationArguments args) {
//        if (repo.count() > 0) return; // only seed once
//
//        LocalDate today = LocalDate.now();
//        LocalDate firstOfMonth = today.withDayOfMonth(1);
//
//        repo.saveAll(List.of(
//            Transaction.builder()
//                .description("Monthly salary")
//                .amount(new BigDecimal("3500.00"))
//                .category("Income")
//                .date(firstOfMonth)
//                .type(Transaction.TransactionType.INCOME)
//                .build(),
//            Transaction.builder()
//                .description("Rent")
//                .amount(new BigDecimal("-1200.00"))
//                .category("Housing")
//                .date(firstOfMonth)
//                .type(Transaction.TransactionType.EXPENSE)
//                .build(),
//            Transaction.builder()
//                .description("Grocery run")
//                .amount(new BigDecimal("-87.50"))
//                .category("Food")
//                .date(today.minusDays(3))
//                .type(Transaction.TransactionType.EXPENSE)
//                .build(),
//            Transaction.builder()
//                .description("Netflix")
//                .amount(new BigDecimal("-15.99"))
//                .category("Entertainment")
//                .date(today.minusDays(5))
//                .type(Transaction.TransactionType.EXPENSE)
//                .build(),
//            Transaction.builder()
//                .description("Bus pass")
//                .amount(new BigDecimal("-60.00"))
//                .category("Transport")
//                .date(today.minusDays(7))
//                .type(Transaction.TransactionType.EXPENSE)
//                .build()
//        ));
//    }
}
