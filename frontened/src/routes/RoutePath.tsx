import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup, Cart, Profile, 
  Wallet, ToMasterCard, Account, MemberModify, Address, 
  Orders, OrderDetail, RegularOrder, Review, Wishlist, 
  FindInfo, Category, Search, Product, Checkout, 
  CompleteCheckout, Post, PostDetail, MemberTest,
  LoginPage, SignupPage, FindInfoPage, DashboardPage,
  MemberListPage, MemberDetailPage, WalletHistoryPage,
  ProductListPage, ProductDetailPage, ProductReviewPage,
  RegisterProductPage, CataloguePage, OrderListPage,
  OrderDetailPage, InvoiceListPage, InvoiceDetailPage,
  ShipmentListPage, ShipmentDetailPage, RegularOrderListPage,
  RegularOrderDetailPage, ShareLineListPage, ShareLineDetailPage,
  ShareMoneyListPage, ShareMoneyDetailPage, TransferRequestPage,
  PaymentRequestPage, TransferCancelPage, TakebackRequestPage,
  RefundRequestPage, StoreListPage, StoreDetailPage,
  StoreManagePage, NoticePage, LetterPage, DonationPage,
  SettingPage } from '../pages';

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
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/signup" element={<SignupPage />} />
        <Route path="/admin/findinfo" element={<FindInfoPage />} />
        <Route path="/admin" element={<DashboardPage />} />
        
        {/* Customer Management */}
        <Route path="/admin/member" element={<MemberListPage />} />
        <Route path="/admin/memberdetail/:id" element={<MemberDetailPage />} />
        <Route path="/admin/memberdetail/:id/wallet" element={<WalletHistoryPage />} />

        {/* Product Management */}
        <Route path="/admin/product" element={<ProductListPage />} />
        <Route path="/admin/productdetail/:id" element={<ProductDetailPage />} />
        <Route path="/admin/productdetail/:id/review" element={<ProductReviewPage />} />
        <Route path="/admin/registproduct" element={<RegisterProductPage />} />
        <Route path="/admin/catalogue" element={<CataloguePage />} />

        {/* Sales Management */}
        <Route path="/admin/order" element={<OrderListPage />} />
        <Route path="/admin/orderdetail/:id" element={<OrderDetailPage />} />
        <Route path="/admin/invoice" element={<InvoiceListPage />} />
        <Route path="/admin/invoicedetail/:id" element={<InvoiceDetailPage />} />
        <Route path="/admin/shipment" element={<ShipmentListPage />} />
        <Route path="/admin/shipmentdetail/:id" element={<ShipmentDetailPage />} />
        <Route path="/admin/regularorder" element={<RegularOrderListPage />} />
        <Route path="/admin/regularorderdetail/:id" element={<RegularOrderDetailPage />} />

        {/* Share Management */}
        <Route path="/admin/share" element={<ShareLineListPage />} />
        <Route path="/admin/sharedetail/:id" element={<ShareLineDetailPage />} />
        <Route path="/admin/sharemoney" element={<ShareMoneyListPage />} />
        <Route path="/admin/sharemoneydetail/:id" element={<ShareMoneyDetailPage />} />

        {/* Request Management */}
        <Route path="/admin/transfer" element={<TransferRequestPage />} />
        <Route path="/admin/payment" element={<PaymentRequestPage />} />
        <Route path="/admin/transfercancel" element={<TransferCancelPage />} />
        <Route path="/admin/takeback" element={<TakebackRequestPage />} />
        <Route path="/admin/refund" element={<RefundRequestPage />} />

        {/* Store Management */}
        <Route path="/admin/store" element={<StoreListPage />} />
        <Route path="/admin/storedetail/:id" element={<StoreDetailPage />} />
        <Route path="/admin/storemanage" element={<StoreManagePage />} />

        {/* Board Management */}
        <Route path="/admin/board/post" element={<NoticePage />} />
        <Route path="/admin/board/letter" element={<LetterPage />} />
        <Route path="/admin/board/donation" element={<DonationPage />} />

        {/* Settings */}
        <Route path="/admin/setting" element={<SettingPage />} />
    </Routes>
  );
}

export default RoutePath;
