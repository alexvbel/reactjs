package com.abel.spring.reactjs.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getSum() {
		return sum;
	}

	public void setSum(long sum) {
		this.sum = sum;
	}

	
	
}
