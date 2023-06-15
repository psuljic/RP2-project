package com.gifty.api;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends CrudRepository<Wishlist, Long> {
    List<Wishlist> findAllByOrderByIdAsc();
}
