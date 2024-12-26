import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Menu from "../menu/Menu";
import "./style.css"
import { useNavigate } from "react-router-dom";
const AdminHaeder:React.FC = () => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const [ visible, setVisible ] = useState<boolean>(false)
    const openMenu = () => {
        setVisible(!visible);
    }
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    }
    const handleGoLogin = () =>{
        navigate("/admin/login");
    }
    const handleGoSignup = () =>{
        navigate("/admin/signup");
    }
    return (
        <div className="admin-header-and-menu">
            <div className="admin-header">
                <div className="admin-header-left">
                    <div className="admin-header-menu-button" onClick={openMenu}>햄버거</div> 
                    <div className="admin-header-logo">로고</div>
                    <select onChange={(e) => changeLanguage(e.target.value)} className="language-select" value={i18n.language}>
                        <option value="ko">{t("Common:Language.Korean")}</option>
                        <option value="en">{t("Common:Language.English")}</option>
                        <option value="zh">{t("Common:Language.Chinese")}</option>
                        <option value="ja">{t("Common:Language.Japanese")}</option>
                    </select>
                </div>
                <div className="admin-header-right">
                    <div>도움말</div>
                    <div>프로필</div>
                    <div>유저명</div>
                    <div onClick={handleGoLogin}>
                        {t("Common:Header.Login")}
                    </div>
                    <div onClick={handleGoSignup}>
                        {t("Common:Header.Signup")}
                    </div>
                </div>
            </div>
            {visible?<Menu/>:<></>}
        </div>
    );
  }
  
  export default AdminHaeder;
  