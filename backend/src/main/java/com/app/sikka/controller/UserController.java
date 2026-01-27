package com.app.sikka.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth/user")
public class UserController {
    
    @Autowired
    UserRepository userRepository;

    // all users for admin
    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // get user by id
    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable UUID id){
        return userRepository.findById(id);
    }
    
    // create user
    @PostMapping
    public User createUser(@RequestBody User user){
        user.setId(UUID.randomUUID());
        return userRepository.save(user);
    }
}
