package com.abel.spring.reactjs;

import com.abel.spring.reactjs.model.Tender;
import com.abel.spring.reactjs.repository.TenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ReactjsSampleApplication {

    @Autowired
    private TenderRepository tenderRepository;

    @Bean
    public CommandLineRunner databasePopulator() {
        return (args) -> {
            tenderRepository.save(new Tender("Test tender", 200000));
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(ReactjsSampleApplication.class, args);
    }
}
