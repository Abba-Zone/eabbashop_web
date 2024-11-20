import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Cart, Profile, 
  Wallet, ToMasterCard, Account, MemberModify, Address, 
  Orders, OrderDetail, RegularOrder, Review, Wishlist, 
  FindInfo, Category, Search, Product, Checkout, 
  CompleteCheckout, Post, PostDetail, MemberTest } from '../pages';

const RoutePath:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/cart" element={<Cart />}/>        
        <Route path="/profile" element={<Profile />}/>        
        <Route path="/wallet" element={<Wallet />}/>        
        <Route path="/tomastercard" element={<ToMasterCard />}/>        
        <Route path="/account" element={<Account />}/>        
        <Route path="/membermodify" element={<MemberModify />}/>        
        <Route path="/address" element={<Address />}/>        
        <Route path="/orders" element={<Orders />}/>        
        <Route path="/orderdetail" element={<OrderDetail />}/>        
        <Route path="/regularorder" element={<RegularOrder />}/>        
        <Route path="/review" element={<Review />}/>        
        <Route path="/wishlist" element={<Wishlist />}/>        
        <Route path="/findinfo" element={<FindInfo />}/>        
        <Route path="/category" element={<Category />}/>        
        <Route path="/search" element={<Search />}/>        
        <Route path="/product" element={<Product />}/>        
        <Route path="/checkout" element={<Checkout />}/>        
        <Route path="/completecheckout" element={<CompleteCheckout />}/>        
        <Route path="/post" element={<Post />}/>
        <Route path="/postdetail" element={<PostDetail />}/>
        <Route path="/admin/member" element={<MemberTest />}/>
    </Routes>
  );
}

export default RoutePath;
