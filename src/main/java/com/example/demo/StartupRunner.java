package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import com.example.demo.repository.UserRepository;
import com.example.demo.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
@RequiredArgsConstructor
public class StartupRunner implements CommandLineRunner {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) {
    if (userRepository.findByUsername("admin").isEmpty()) {
      User u = new User();
      u.setUsername("admin");
      u.setPassword(passwordEncoder.encode("admin123"));
      userRepository.save(u);
    }
  }
}
