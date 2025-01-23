import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MypageSidebar: React.FC = () => {
  const pathname = useLocation();
  const rendering = (): JSX.Element[] => {
    const result = [];
    switch (pathname.pathname) {
      case "/login": case "/signup": case "/admin/login": case "/admin/signup":
        result.push(<></>);
        return result;
      default: //12
        if (pathname.pathname.substring(0, 7) === "/mypage")
          result.push(
          <div className="mypage-sidebar-container">
            <h1><Link to="/mypage">대시보드</Link></h1>
            <h2>EABBASHOP 관리</h2>
              <ul>
                <li><Link to="/mypage/transactions">입출금내역</Link></li>
                <li><Link to="/mypage/recommendations">추천인 정보</Link></li>
                <li><Link to="/mypage/recharge">요청(출금,환급,충전)</Link></li>
                <li><Link to="/mypage/withdraw">이체하기</Link></li>
                <li><Link to="/mypage/account-registration">계좌등록</Link></li>
                <li><Link to="/mypage/billing">정기요금납부</Link></li>
              </ul>
              <h2>내 계정</h2>
              <ul>
                <li><Link to="/mypage/profile">계정 정보 확인/수정</Link></li>
                <li><Link to="/mypage/addresses">주소록</Link></li>
                <li><Link to="/mypage/orders">내 주문</Link></li>
                <li><Link to="/mypage/contract-payments">계약 결제</Link></li>
                <li><Link to="/mypage/reviews">내 상품 리뷰</Link></li>
                <li><Link to="/mypage/tags">내 태그</Link></li>
                <li><Link to="/mypage/wishlist">내 위시리스트</Link></li>
                <li><Link to="/mypage/subscriptions">소식지 구독</Link></li>
                <li><Link to="/mypage/downloads">내 다운로드 가능한 상품</Link></li>
              </ul>
          </div>
          );
    }
    return result;
  }

  return (
    <div>
      {rendering()}
    </div>
  );
};

export default MypageSidebar;