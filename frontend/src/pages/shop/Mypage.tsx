import React, { useState, useEffect } from "react";
import "./Mypage.css";
import { useTranslation } from 'react-i18next';
import MypageSidebar from "../../components/common/MypageSidebar";

const Cookies = require("js-cookie");

const Mypage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ firstName: string, lastName: string, role: string } | null>(null);
  const { i18n } = useTranslation();

  const walletInfo = {
    AW: "100",
    SP: "100",
    AK: "100",
    ABZ: "100",
    };

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

  const renderUserName = () => {
      if (!userInfo) return null;
      const { firstName, lastName } = userInfo;
      const currentLanguage = i18n.language;
  
      if (currentLanguage === 'ko') {
        return `${lastName}${firstName} 님`;
      } else {
        return `${firstName} ${lastName} 님`;
      }
    };


  useEffect(() => {
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
            <div className="wallet-item">AW: {walletInfo.AW}</div>
            <div className="wallet-item">SP: {walletInfo.SP}</div>
            <div className="wallet-item">AK: {walletInfo.AK}</div>
            <div className="wallet-item">ABZ: {walletInfo.ABZ}</div>
          </div>
        </div>
      </header>
      <div className="mypage-content">
        <aside className="mypage-sidebar">
            <h2 className="profile-header">
                <img src={require("../../static/img/user.png")} alt="Profile" className="profile-image" /> {renderUserName()}
            </h2>
            <MypageSidebar />
        </aside>
        <main className="mypage-main">
            
        </main>
      </div>
    </div>
  );
};

export default Mypage;
