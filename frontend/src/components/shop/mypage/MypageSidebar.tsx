import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MypageSidebar: React.FC = () => {
  const pathname = useLocation();
  const rendering = (): JSX.Element[] => {
    const result = [];
    switch (pathname.pathname) {
      case "/login": case "/signup": case "/admin/login": case "/admin/signup":
        result.push(<div key={pathname.pathname}></div>);
        return result;
      default:
        if (pathname.pathname.substring(0, 7) === "/mypage")
          result.push(
          <div key={pathname.pathname} className="mypage-sidebar-container">
            <h1><Link to="/mypage">대시보드</Link></h1>
            <h2>MY A-PAY</h2>
              <ul>
                <li><Link to="/mypage/request">요청하기(출금,환급,충전)</Link></li>
                <li><Link to="/mypage/transactions">내 지갑</Link></li>
                <li><Link to="/mypage/auto-withdraw">자동이체</Link></li>
                <li><Link to="/mypage/account">내 계좌</Link></li>
              </ul>
              <h2>내 계정</h2>
              <ul>
                <li><Link to="/mypage/orders">내 주문</Link></li>
                <li><Link to="/mypage/addresses">주소록</Link></li>
                <li><Link to="/mypage/downloads">다운로드 상품</Link></li>
                <li><Link to="/mypage/profile">계정 정보 확인/수정</Link></li>
                <li><Link to="/mypage/recommendations">추천인 정보</Link></li>
                <li><Link to="/mypage/reviews">내 상품 리뷰</Link></li>
                <li><Link to="/mypage/tags">내 태그</Link></li>
                <li><Link to="/mypage/wishlist">내 위시리스트</Link></li>
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