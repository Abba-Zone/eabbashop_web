import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "./style.css"


const ShopHeader: React.FC = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{ firstName: string, lastName: string, role: string } | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const Cookies = require('js-cookie');

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

  const openMenu = () => {
    setVisible(!visible);
  }

  const handleLogout = () => {
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    Cookies.remove('first-name');
    Cookies.remove('last-name');
    Cookies.remove('role');
    alert(t('Common:Alert.LogoutSuccess'));
    window.location.reload();
    setDropdownVisible(false);
    navigate('/');
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // 선택한 언어를 로컬 스토리지에 저장
  }

  const handleGoLogin = () => {
    navigate("/login");
  }

  const handleGoSignup = () => {
    navigate("/signup");
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const renderUserName = () => {
    if (!userInfo) return null;
    const { firstName, lastName } = userInfo;
    const currentLanguage = i18n.language;

    if (currentLanguage === 'ko') {
      return `${lastName}${firstName} 님 안녕하세요!`;
    } else {
      return `${firstName} ${lastName} 님 안녕하세요!!`;
    }
  };

  const handleMypage = () => {
    setDropdownVisible(false);
    navigate("/mypage");
  }

  const handleGoShop = () => {
    navigate("/");
  }

  return (
    <div className="shop-header">
      <div className="shop-header-left">
        <div onClick={handleGoShop} className="shop-header-left-logo">
          <img src={require("../../static/img/AbbazonLogo.png")} alt="logo" />
        </div>
        <select onChange={(e) => changeLanguage(e.target.value)} className="language-select" value={i18n.language}>
          <option value="ko">{t("Common:Language.Korean")}</option>
          <option value="en">{t("Common:Language.English")}</option>
          <option value="zh">{t("Common:Language.Chinese")}</option>
          <option value="ja">{t("Common:Language.Japanese")}</option>
        </select>
      </div>
      <div className="shop-header-right">
        {userInfo ? (
          <div className="shop-header-profile-header">
            <h2>
              {renderUserName()}
            </h2>
            <div className="shop-header-profile-container">
              <div className="shop-header-profile-container-left" onClick={toggleDropdown} style={{ position: 'relative' }}>
                <img
                  src={require("../../static/img/user.png")}
                  alt="Profile"
                  className="shop-header-profile-image"
                />
                <div className="shop-header-profile-container-left-text">나의 ABBA</div>
                {dropdownVisible && (
                  <div className="dropdown-container">
                    <div className="dropdown-menu">
                      <button onClick={handleMypage}>{t("Common:Header.Mypage")}</button>
                    </div>
                  </div>
                )}
              </div>
              <button className="shop-header-profile-logout" onClick={handleLogout}>{t("Common:Header.Logout")}</button>
            </div>
          </div>
        ) : (
          <>
            <div onClick={handleGoLogin}>
              {t("Common:Header.Login")}
            </div>
            <div onClick={handleGoSignup}>
              {t("Common:Header.Signup")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShopHeader;
  