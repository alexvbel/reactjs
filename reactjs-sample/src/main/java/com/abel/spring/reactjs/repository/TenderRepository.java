package com.abel.spring.reactjs.repository;

import com.abel.spring.reactjs.model.Tender;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Alex Belikov
 */
public interface TenderRepository extends PagingAndSortingRepository<Tender, Long> {
}
