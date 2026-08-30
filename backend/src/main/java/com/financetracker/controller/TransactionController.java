package com.financetracker.controller;

import com.financetracker.config.JwtUtil;
import com.financetracker.model.Transaction;
import com.financetracker.model.User;
import com.financetracker.repository.TransactionRepository;
import com.financetracker.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {

    private final TransactionRepository repo;
    private final UserRepository userRepository;

    private User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public List<Transaction> getAll(@AuthenticationPrincipal String email) {
        User user = getCurrentUser(email);
        return repo.findByUserOrderByDateDesc(user);
    }

    @PostMapping
    public ResponseEntity<Transaction> create(
            @Valid @RequestBody Transaction transaction,
            @AuthenticationPrincipal String email) {
        User user = getCurrentUser(email);
        transaction.setId(null);
        transaction.setUser(user);
        return ResponseEntity.status(201).body(repo.save(transaction));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(
            @PathVariable Long id,
            @Valid @RequestBody Transaction transaction,
            @AuthenticationPrincipal String email) {
        User user = getCurrentUser(email);
        return repo.findById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    transaction.setId(id);
                    transaction.setUser(user);
                    return ResponseEntity.ok(repo.save(transaction));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal String email) {
        User user = getCurrentUser(email);
        return repo.findById(id)
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .map(t -> {
                    repo.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}