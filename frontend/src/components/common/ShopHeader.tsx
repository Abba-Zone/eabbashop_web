import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "./style.css"

const ShopHeader:React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
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
      <div className="shop-header">
          <div className="shop-header-left">
            <select onChange={(e) => changeLanguage(e.target.value)} className="language-select">
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          <div className="shop-header-right">
            <div onClick={handleGoLogin}>
                로그인
            </div>
            <div onClick={handleGoSignup}>
                회원가입
            </div>
          </div>
      </div>
    );
}
  
export default ShopHeader;
  