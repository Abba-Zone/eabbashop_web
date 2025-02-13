package com.zon.abba.wishlist.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.wishlist.request.RegisterWishlistRequest;
import com.zon.abba.wishlist.request.WishlistIdRequest;
import com.zon.abba.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wishlist")
public class WishlistController {
    private static final Logger logger = LoggerFactory.getLogger(WishlistController.class);

    private final WishlistService wishlistService;

    @GetMapping("/list")
    public ResponseEntity<Object> wishlistList(){

        ResponseListBody response = wishlistService.wishlistList();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerWishlist(@RequestBody RegisterWishlistRequest request){

        ResponseBody response = wishlistService.registerWishlist(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/delete")
    public ResponseEntity<Object> deleteWishlist(@RequestBody WishlistIdRequest request){

        ResponseBody response = wishlistService.deleteWishlist(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
