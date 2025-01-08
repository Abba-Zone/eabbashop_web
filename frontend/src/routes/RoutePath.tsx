import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Cart, Profile, 
  Wallet, ToMasterCard, Account, MemberModify, Address, 
  Orders, OrderDetail, RegularOrder, Review, Wishlist, 
  FindInfo, Category, Search, Product, Checkout, 
  CompleteCheckout, Post, PostDetail, MemberTest,
  AdminLogin, AdminSignup, AdminFindInfo, AdminDashboard,
  AdminMemberList, AdminMemberDetail, AdminWalletHistory,
  AdminProductList, AdminProductDetail, AdminProductReview,
  AdminRegisterProduct, AdminCatalogue, AdminOrderList,
  AdminOrderDetail, AdminInvoiceList, AdminInvoiceDetail,
  AdminShipmentList, AdminShipmentDetail, AdminRegularOrderList,
  AdminRegularOrderDetail, AdminShareLineList, AdminShareLineDetail,
  AdminShareMoneyList, AdminShareMoneyDetail, AdminTransferRequest,
  AdminPaymentRequest, AdminTransferCancel, AdminTakebackRequest,
  AdminRefundRequest, AdminStoreList, AdminStoreDetail,
  AdminStoreManage, AdminNotice, AdminLetter, AdminDonation,
  AdminSetting, AdminInquiryList, AdminInquiryDetail, 
  AdminBoardDetail, AdminRefundDetail, GoogleLogin, SocialSignup, KakaoLogin,
  AdminRegistAdmin} from '../pages';

const RoutePath:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/code/google" element={<GoogleLogin />}/>
        <Route path="/code/kakao" element={<KakaoLogin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/socialsignup" element={<SocialSignup />}/>
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
        <Route path="/productdetail/:id" element={<Product />}/>        
        <Route path="/checkout" element={<Checkout />}/>        
        <Route path="/completecheckout" element={<CompleteCheckout />}/>        
        <Route path="/post/:type" element={<Post />}/>
        <Route path="/postdetail" element={<PostDetail />}/>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/findinfo" element={<AdminFindInfo />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/registadmin" element={<AdminRegistAdmin />} />
        
        {/* Customer Management */}
        <Route path="/admin/member" element={<AdminMemberList />} />
        <Route path="/admin/memberdetail/:id" element={<AdminMemberDetail />} />
        <Route path="/admin/memberdetail/:id/wallet" element={<AdminWalletHistory />} />
        <Route path="/admin/customer-inquiry" element={<AdminInquiryList />} />
        <Route path="/admin/customer-inquiry/:id" element={<AdminInquiryDetail />} />
        

        {/* Product Management */}
        <Route path="/admin/product" element={<AdminProductList />} />
        <Route path="/admin/productdetail/:id" element={<AdminProductDetail />} />
        <Route path="/admin/productdetail/:id/review" element={<AdminProductReview />} />
        <Route path="/admin/registproduct" element={<AdminRegisterProduct />} />
        <Route path="/admin/catalogue" element={<AdminCatalogue />} />

        {/* Sales Management */}
        <Route path="/admin/order" element={<AdminOrderList />} />
        <Route path="/admin/orderdetail/:id" element={<AdminOrderDetail />} />
        <Route path="/admin/invoice" element={<AdminInvoiceList />} />
        <Route path="/admin/invoicedetail/:id" element={<AdminInvoiceDetail />} />
        <Route path="/admin/shipment" element={<AdminShipmentList />} />
        <Route path="/admin/shipmentdetail/:id" element={<AdminShipmentDetail />} />
        <Route path="/admin/regular-order" element={<AdminRegularOrderList />} />
        <Route path="/admin/regular-order-detail/:id" element={<AdminRegularOrderDetail />} />

        {/* Share Management */}
        <Route path="/admin/share-line" element={<AdminShareLineList />} />
        <Route path="/admin/sharedetail/:id" element={<AdminShareLineDetail />} />
        <Route path="/admin/share-distribution" element={<AdminShareMoneyList />} />
        <Route path="/admin/shareMoneyDetail/:id" element={<AdminShareMoneyDetail />} />

        {/* Request Management */}
        <Route path="/admin/charge-point" element={<AdminTransferRequest />} />
        <Route path="/admin/refund-point" element={<AdminPaymentRequest />} />
        <Route path="/admin/cancle-transfer" element={<AdminTransferCancel />} />
        <Route path="/admin/change-referral" element={<AdminTakebackRequest />} />
        <Route path="/admin/refund-request" element={<AdminRefundRequest />} />
        <Route path="/admin/refundDetail/:id" element={<AdminRefundDetail />} />

        {/* Store Management */}
        <Route path="/admin/store-management" element={<AdminStoreList />} />
        <Route path="/admin/storedetail/:id" element={<AdminStoreDetail />} />
        <Route path="/admin/storemanage" element={<AdminStoreManage />} />

        {/* Board Management */}
        <Route path="/admin/board/notice" element={<AdminNotice />} />
        <Route path="/admin/board/letter" element={<AdminLetter />} />
        <Route path="/admin/boardDetail/:id" element={<AdminBoardDetail />} />
        <Route path="/admin/board/donation" element={<AdminDonation />} />

        {/* Settings */}
        <Route path="/admin/setting" element={<AdminSetting />} />
    </Routes>
  );
}

export default RoutePath;
