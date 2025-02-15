import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Signup, Cart, 
  Wallet, ToMasterCard, Account, MemberModify, Address, 
  RegularOrder, Wishlist, 
  FindInfo, Category, Search, Product, Checkout, DirectCheckout,
  CompleteCheckout, Post, PostDetail, 
  AdminLogin, AdminSignup, AdminFindInfo, AdminDashboard,
  AdminMemberList, AdminMemberDetail, AdminWalletHistory,
  AdminProductList, AdminProductDetail, AdminProductReview,
  AdminRegisterProduct, AdminCatalogue, AdminOrderList,
  AdminOrderDetail, AdminInvoiceList, AdminInvoiceDetail,
  AdminShipmentList, AdminShipmentDetail, AdminRegularOrderList,
  AdminRegularOrderDetail, AdminShareLineList, AdminShareLineDetail,
  AdminShareMoneyList, AdminShareMoneyDetail, AdminChargeRequest,
  AdminPaymentRequest, AdminTransferCancel, AdminTakebackRequest,
  AdminRefundRequest, AdminStoreList, AdminStoreDetail,
  AdminStoreManage, AdminNotice, AdminLetter, AdminDonation,
  AdminSetting, AdminInquiryList, AdminInquiryDetail, 
  AdminBoardDetail, AdminRefundDetail, GoogleLogin, SocialSignup, KakaoLogin,
  RegistAdmin, FindIDPW, AdminRegistAdmin, Mypage, ChangePW,
  AdminWalletMembersList, AdminChargeRequestDetail, AdminWalletDetail,
  AdminChangeRequest, AdminChangeRequestDetail
} from '../pages';

const RoutePath:React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Routes>
      {isAdminPage ? (
        <>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/findinfo" element={<AdminFindInfo />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Customer Management */}
        <Route path="/admin/member" element={<AdminMemberList />} />
        <Route path="/admin/memberdetail/:id" element={<AdminMemberDetail />} />
        <Route path="/admin/customer-inquiry" element={<AdminInquiryList />} />
        <Route path="/admin/customer-inquiry/:id" element={<AdminInquiryDetail />} />
        <Route path="/admin/registadmin" element={<AdminRegistAdmin />} />
        <Route path="/admin/membersWallet" element={<AdminWalletMembersList />} />
        <Route path="/admin/wallet/:id" element={<AdminWalletHistory />} />
        <Route path="/admin/walletdetail/:id" element={<AdminWalletDetail />} />

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
        <Route path="/admin/charge-point" element={<AdminChargeRequest />} />
        <Route path="/admin/charge-request/detail" element={<AdminChargeRequestDetail />} />
        <Route path="/admin/change-point" element={<AdminChangeRequest />} />
        <Route path="/admin/change-request/detail" element={<AdminChangeRequestDetail />} />
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
        </>
      ) : (
        <>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/code/google" element={<GoogleLogin />}/>
        <Route path="/code/kakao" element={<KakaoLogin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/socialsignup" element={<SocialSignup />}/>
        <Route path="/findidpw" element={<FindIDPW />}/>
        <Route path="/changepw" element={<ChangePW />}/>
        <Route path="/cart" element={<Cart />}/>        
        <Route path="/wallet" element={<Wallet />}/>        
        <Route path="/tomastercard" element={<ToMasterCard />}/>        
        <Route path="/account" element={<Account />}/>        
        <Route path="/membermodify" element={<MemberModify />}/>        
        <Route path="/address" element={<Address />}/>           
        <Route path="/regularorder" element={<RegularOrder />}/>            
        <Route path="/wishlist" element={<Wishlist />}/>        
        <Route path="/findinfo" element={<FindInfo />}/>        
        <Route path="/category" element={<Category />}/>        
        <Route path="/search" element={<Search />}/>        
        <Route path="/productdetail/:id" element={<Product />}/>        
        <Route path="/checkout" element={<Checkout />}/>        
        <Route path="/checkout/:id/:quantity" element={<DirectCheckout />}/>        
        <Route path="/completecheckout" element={<CompleteCheckout />}/>        
        <Route path="/post/:type" element={<Post />}/>
        <Route path="/postdetail" element={<PostDetail />}/>
        <Route path="/mypage" element={<Mypage />}/>
        {/* Regist */}
        <Route path="/regist/registadmin" element={<RegistAdmin />} />
        
        <Route path="/mypage/*" element={<Mypage />} />
        </>
      )}
    </Routes>
  );
}

export default RoutePath;
