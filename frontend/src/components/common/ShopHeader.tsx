import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import "./style.css"

const ShopHeader:React.FC = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
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
              <option value="ko">{t("Common:Language.Korean")}</option>
              <option value="en">{t("Common:Language.English")}</option>
              <option value="zh">{t("Common:Language.Chinese")}</option>
              <option value="ja">{t("Common:Language.Japanese")}</option>
            </select>
          </div>
          <div className="shop-header-right">
            <div onClick={handleGoLogin}>
                {t("Common:Header.Login")}
            </div>
            <div onClick={handleGoSignup}>
                {t("Common:Header.Signup")}
            </div>
          </div>
      </div>
    );
}
  
export default ShopHeader;
  