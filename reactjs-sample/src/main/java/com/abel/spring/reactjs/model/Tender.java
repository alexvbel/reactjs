package com.abel.spring.reactjs.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Alex Belikov
 */
@Data
@Entity
public class Tender {

    @GeneratedValue
    @Id
    private long id;

    public Tender() {
    }

    public Tender(String name, long sum) {
        this.name = name;
        this.sum = sum;
    }

    private String name;
    private long sum;

}
