package com.gifty.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WishlistController {
    @Autowired
    private WishlistService service;

    @GetMapping("/wishlist")
    public List<Wishlist> find(){
        return service.find();
    }

    @PostMapping("/wishlist")
    @ResponseStatus(HttpStatus.CREATED)
    public Wishlist create(@RequestBody Wishlist wishlist){
        return service.create(wishlist);
    }

    @PutMapping("/wishlist/{id}")
    public Wishlist update(@PathVariable Long id, @RequestBody Wishlist wishlist) {
        return service.update(id, wishlist);
    }

    @DeleteMapping("/wishlist/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
}
