import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const MypageSidebar: React.FC = () => {
  return (
    <div className="mypage-sidebar">
      <h2>EABBASHOP 관리</h2>
      <ul>
        <li><Link to="/transactions">입출금내역</Link></li>
        <li><Link to="/recommendations">추천인 정보</Link></li>
        <li><Link to="/recharge">요청(출금,환급,충전)</Link></li>
        <li><Link to="/withdraw">이체하기</Link></li>
        <li><Link to="/account-registration">계좌등록</Link></li>
        <li><Link to="/billing">정기요금납부</Link></li>
      </ul>
      <h2>내 계정</h2>
      <ul>
        <li><Link to="/dashboard">계정 대시보드</Link></li>
        <li><Link to="/account-info">계정 정보</Link></li>
        <li><Link to="/addresses">주소록</Link></li>
        <li><Link to="/orders">내 주문</Link></li>
        <li><Link to="/contract-payments">계약 결제</Link></li>
        <li><Link to="/reviews">내 상품 리뷰</Link></li>
        <li><Link to="/tags">내 태그</Link></li>
        <li><Link to="/wishlist">내 위시리스트</Link></li>
        <li><Link to="/subscriptions">소식지 구독</Link></li>
        <li><Link to="/downloads">내 다운로드 가능한 상품</Link></li>
      </ul>
    </div>
  );
};

export default MypageSidebar;