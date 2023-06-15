package com.gifty.api;

import javax.persistence.*;

@Entity
@Table(name = "wishlist")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemname;
    private String image;
    private String link;

    public Wishlist() {}

    public Wishlist(String itemname, String image, String link) {
        this.itemname = itemname;
        this.image = image;
        this.link = link;
    }

    public Long getId(){
        return id;
    }

    public String getItemName() {
        return itemname;
    }

    public void setItemName(String itemname) {
        this.itemname = itemname;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
