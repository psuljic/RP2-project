package com.gifty.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService implements IWishlistService {
    @Autowired
    private WishlistRepository repository;

    @Override
    public List<Wishlist> find() {
        return repository.findAllByOrderByIdAsc();
    }

    @Override
    public Wishlist create(Wishlist wishlist) {
        return repository.save(wishlist);
    }

    @Override
    public Wishlist update(Long id, Wishlist wishlist) {
        return repository.findById(id)
                .map(existingWishlist -> {
                    existingWishlist.setItemName(wishlist.getItemName());
                    existingWishlist.setImage(wishlist.getImage());
                    existingWishlist.setLink(wishlist.getLink());
                    return repository.save(existingWishlist);
                })
                .orElse(null);

    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
