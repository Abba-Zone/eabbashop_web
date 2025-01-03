import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "./style.css"


const ShopHeader: React.FC = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{ firstName: string, lastName: string, role: string } | null>(null);
  const Cookies = require('js-cookie');

  useEffect(() => {
    const updateUserInfo = () => {
      const accessToken = Cookies.get('access-token');
      if (accessToken) {
        const firstName = Cookies.get('first-name');
        const lastName = Cookies.get('last-name');
        const role = Cookies.get('role');
        if (firstName && lastName && role) {
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
  }, [i18n]);

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

  const renderUserName = () => {
    if (!userInfo) return null;
    const { firstName, lastName } = userInfo;
    const currentLanguage = i18n.language;

    if (currentLanguage === 'ko') {
      return `${lastName} ${firstName} 님 안녕하세요!`;
    } else {
      return `${firstName} ${lastName} 님 안녕하세요!!`;
    }
  };

  return (
    <div className="shop-header">
      <div className="shop-header-left">
        <select onChange={(e) => changeLanguage(e.target.value)} className="language-select" value={i18n.language}>
          <option value="ko">{t("Common:Language.Korean")}</option>
          <option value="en">{t("Common:Language.English")}</option>
          <option value="zh">{t("Common:Language.Chinese")}</option>
          <option value="ja">{t("Common:Language.Japanese")}</option>
        </select>
      </div>
      <div className="shop-header-right">
        {userInfo ? (
          <div>
            {renderUserName()} ({userInfo.role}) &nbsp;
            <span>
              <button onClick={handleLogout}>{t("Common:Header.Logout")}</button>
            </span>
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
  