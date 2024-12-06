import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const ShopHeader:React.FC = () => {
  const { i18n } = useTranslation();
  const [ visible, setVisible ] = useState<boolean>(false)
  const openMenu = () => {
    setVisible(!visible);
  }
  const changeLanguage = (lng: string) => {
    console.log(lng);
    i18n.changeLanguage(lng);
}
    return (
      <div>
          ShopHeader
          <div className="shop-header-right">
                    <select onChange={(e) => changeLanguage(e.target.value)} className="language-select">
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="ja">日本語</option>
                    </select>
                </div>
      </div>
    );
}
  
export default ShopHeader;
  