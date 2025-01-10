import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Menu from "../menu/Menu";
import "./style.css"
import { useNavigate } from "react-router-dom";

const AdminHaeder:React.FC<{ toggleMenu: () => void, menuVisible: boolean }> = ({ toggleMenu, menuVisible }) => {
    const Cookies = require('js-cookie');
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<{ firstName: string, lastName: string, role: string } | null>(null);

    const handleGoLogin = () =>{
        navigate("/admin/login");
    }
    const handleGoSignup = () =>{
        navigate("/admin/signup");
    }

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

    // const logoutKakao = () => {
    //     console.log(Cookies.get('access-token'));
    //     axios.post('https://kapi.kakao.com/v1/user/unlink', {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get('access-token')}`
    //         }
    //     })
    //     .then((response:any) => {
    //         console.log('카카오 계정 연결 해제 성공');
    //         console.log(response);
    //     })
    //     .catch((error:any) => {
    //         console.log('카카오 계정 연결 해제 실패');
    //         console.error(error);
    //     });
    //   };

    const handleLogout = async () => {
        Cookies.remove('access-token');
        Cookies.remove('refresh-token');
        Cookies.remove('first-name');
        Cookies.remove('last-name');
        Cookies.remove('role');
        
        alert(t('Common:Alert.LogoutSuccess'));
        navigate('/admin/login');
        window.location.reload();
    };

    
    return (
        <div className="admin-header-and-menu">
            <div className="admin-header">
                <div className="admin-header-left">
                    <div className="admin-header-menu-button" onClick={toggleMenu}>햄버거</div> 
                </div>
                <div className="admin-header-right">
                    <div>도움말</div>
                    <div>프로필</div>
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
            {menuVisible?<Menu toggleMenu={toggleMenu}/>:<></>}
        </div>
    );
  }
  
  export default AdminHaeder;
  