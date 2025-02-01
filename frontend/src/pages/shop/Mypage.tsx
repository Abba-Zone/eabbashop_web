import React, { useState, useEffect } from "react";
import "./Mypage.css";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import MypageSidebar from "../../components/shop/mypage/MypageSidebar";
import { MypageOrders, MypageOrderDetail, Review } from "../../pages";
import { getMemberDetailMe_s } from "../../services/member";
const Cookies = require("js-cookie");

const Mypage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ firstName: string, lastName: string, role: string } | null>(null);
  const { i18n } = useTranslation();
  const [memberDetail, setMemberDetail] = useState<memberDetailInfo | null>(null);

  const wallet = memberDetail?.wallet || { AK: 0, AP: 0, ABZ: 0, LP: 0, SP: 0 };
  const lpValue = wallet.LP;
  const spValue = wallet.SP;
  const akValue = wallet.AK;
  const abzValue = wallet.ABZ;

  const walletInfo = {
    LP: lpValue,
    SP: spValue,
    AK: akValue,
    ABZ: abzValue,
  };

  const renderUserName = () => {
      if (!userInfo) return null;
      const { firstName, lastName } = userInfo;
      const currentLanguage = i18n.language;
  
      if (currentLanguage === 'ko') {
        return `${lastName}${firstName} 님`;
      } else {
        return `${firstName} ${lastName}`;
      }
    };


  const RoleForImage = (role: string) => {
    if (role === 'A') {
      return 0;
    } else if (role === 'B') {
      return 1;
    } else if (role === 'C') {
      return 2;
    } else if (role === 'D') {
      return 3;
    } else if (role === 'E') {
      return 4;
    }
  }

  const RoleForBadge = (role: string) => {
    if (role === 'A') {
      return '일반';
    } else if (role === 'B') {
      return '판매점';
    } else if (role === 'C') {
      return '대리점';
    } else if (role === 'D') {
      return '지점';
    } else if (role === 'E') {
      return '관리자';
    }
  }

  const roleClass = (role: string) => {
    switch (role) {
      case 'A':
        return 'role-a';
      case 'B':
        return 'role-b';
      case 'C':
        return 'role-c';
      case 'D':
        return 'role-d';
      case 'E':
        return 'role-e';
    }
  }

  useEffect(() => {
    const fetchMemberDetail = async () => {
      const memberDetail = await getMemberDetailMe_s();
      setMemberDetail(memberDetail);
    };
    fetchMemberDetail();

    const updateUserInfo = () => {
      const accessToken = Cookies.get('access-token');
      if (accessToken) {
        const firstName = Cookies.get('first-name');
        const lastName = Cookies.get('last-name');
        const role = Cookies.get('role');
        if (lastName && role) {
          setUserInfo({ firstName, lastName, role });
        }
      }
    };

    // 초기 로드 시 사용자 정보 설정
    updateUserInfo();

    // 커스텀 이벤트 리스너 추가
    window.addEventListener('user-info-updated', updateUserInfo);

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      window.removeEventListener('user-info-updated', updateUserInfo);
    };
  }, [i18n , Cookies]);

  return (
    <div className="mypage-container">
      <header className="mypage-header">
        <h1>MY ABBA</h1>
        <p>ABBA 속 내 정보를 한눈에 보여드립니다!</p>
        <div className="wallet-info">
          <div className="wallet-info-title">내 지갑 잔액</div>
          <div className="wallet-info-details">
            <div className="wallet-item">AW: {walletInfo.LP}</div>
            <div className="wallet-item">SP: {walletInfo.SP}</div>
            <div className="wallet-item">AK: {walletInfo.AK}</div>
            <div className="wallet-item">ABZ: {walletInfo.ABZ}</div>
          </div>
        </div>
      </header>
      <div className="mypage-content">
        <div className="mypage-sidebar">
            <h2 className="profile-header">
                <img src={require(`../../static/img/lv${RoleForImage(userInfo?.role || 'A')}.png`)} alt="Profile" className="profile-image" /> 
                <div className="profile-name-container">
                  <div className="profile-name">
                    {renderUserName()}
                  </div>
                </div>
                <div className={`profile-role-container ${roleClass(userInfo?.role || 'A')}`}>
                    <div className="profile-role">{RoleForBadge(userInfo?.role || 'A')}</div>
                </div>
            </h2>
            <MypageSidebar />
        </div>
        <div className="mypage-main">
          <Routes>
            <Route path="orders" element={<MypageOrders />} />
            <Route path="orderdetail/:id" element={<MypageOrderDetail />} />
            <Route path="reviews" element={<Review />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default Mypage;
