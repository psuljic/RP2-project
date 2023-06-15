package com.gifty.api;

import java.util.List;

public interface IWishlistService {
    List<Wishlist> find();
    Wishlist create(Wishlist wishlist);
    Wishlist update(Long id, Wishlist wishlist);
    void delete(Long id);
}
