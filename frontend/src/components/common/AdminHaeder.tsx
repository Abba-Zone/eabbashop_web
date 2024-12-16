import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Menu from "../menu/Menu";
import "./style.css"
import { useNavigate } from "react-router-dom";
const AdminHaeder:React.FC = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const [ visible, setVisible ] = useState<boolean>(false)
    const openMenu = () => {
        setVisible(!visible);
    }
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }
    const handleGoLogin = () =>{
        navigate("/login");
    }
    const handleGoSignup = () =>{
        navigate("/signup");
    }
    return (
        <div className="admin-header-and-menu">
            <div className="admin-header">
                <div className="admin-header-left">
                    <div className="admin-header-menu-button" onClick={openMenu}>햄버거</div> 
                    <div className="admin-header-logo">로고</div>
                    <select onChange={(e) => changeLanguage(e.target.value)} className="language-select">
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="ja">日本語</option>
                    </select>
                </div>
                <div className="admin-header-right">
                    <div>도움말</div>
                    <div>프로필</div>
                    <div>유저명</div>
                    <div onClick={handleGoLogin}>
                        로그인
                    </div>
                    <div onClick={handleGoSignup}>
                        회원가입
                    </div>
                </div>
            </div>
            {visible?<Menu/>:<></>}
        </div>
    );
  }
  
  export default AdminHaeder;
  