import React, { useState } from 'react';
import MenuCard1 from "./MenuCard1";
import MenuCard2 from "./MenuCard2";
import { useTranslation } from "react-i18next";
interface MenuProps {
    toggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ toggleMenu }) => {
    const { t , i18n } = useTranslation();

    const menuList: menu[] = [
        {
            icon: <>ㄷ</>, 
            headerName: t("Menu01.Title"), 
            url: "/admin", 
            items: []
        },
        {
            icon: <>ㄱ</>, 
            headerName: t("Menu02.Title"), 
            url: "", 
            items: [
                { name: t("Menu02.SubMenu01"), url: "/admin/member" },
                { name: t("Menu02.SubMenu02"), url: "/admin/customer-inquiry" },
                { name: t("Menu02.SubMenu03"), url: "/admin/change-referral" },
                { name: '등급업', url: "/admin/member-grade" }
            ]
        },
        {
            icon: <>ㅅ</>, 
            headerName: t("Menu03.Title"), 
            url: "", 
            items: [
                { name: t("Menu03.SubMenu01"), url: "/admin/product" },
                { name: t("Menu03.SubMenu02"), url: "/admin/category" },
                { name: '상품 리뷰', url: "/admin/product/review" }
            ]
        },
        {
            icon: <>ㅍ</>, 
            headerName: t("Menu04.Title"), 
            url: "", 
            items: [
                { name: t("Menu04.SubMenu01"), url: "/admin/order" },
                { name: t("Menu04.SubMenu02"), url: "/admin/invoice" },
                { name: t("Menu04.SubMenu03"), url: "/admin/shipment" },
                { name: t("Menu04.SubMenu04"), url: "/admin/regular-order" }
            ]
        },
        {
            icon: <>ㅅ</>, 
            headerName: t("Menu05.Title"), 
            url: "", 
            items: [
                { name: t("Menu05.SubMenu01"), url: "/admin/share-line" },
                { name: t("Menu05.SubMenu02"), url: "/admin/share-distribution" }
            ]
        },
        {
            icon: <>ㅇ</>, 
            headerName: t("Menu06.Title"), 
            url: "", 
            items: [
                { name: t("Menu06.SubMenu01"), url: "/admin/charge-point" },
                { name: t("Menu06.SubMenu02"), url: "/admin/change-point" },
                { name: t("Menu06.SubMenu03"), url: "/admin/cancle-transfer" },
                { name: t("Menu06.SubMenu04"), url: "/admin/refund-request" }
            ]
        },
        {
            icon: <>ㅁ</>, 
            headerName: t("Menu07.Title"), 
            url: "", 
            items: [
                { name: t("Menu07.SubMenu01"), url: "/admin/store-management" },
                { name: t("Menu07.SubMenu02"), url: "/admin/store-support" }
            ]
        },
        {
            icon: <>ㄱ</>, 
            headerName: t("Menu08.Title"), 
            url: "", 
            items: [
                { name: t("Menu08.SubMenu01"), url: "/admin/board/notice" },
                { name: t("Menu08.SubMenu02"), url: "/admin/board/letter" },
                { name: t("Menu08.SubMenu03"), url: "/admin/board/donation" }
            ]
        },
        {
            icon: <>ㅅ</>, 
            headerName: t("Menu09.Title"), 
            url: "/admin/other", 
            items: []
        },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    }

    const rendering = (): JSX.Element[] => {
        const result = [];
        for (let i = 0; i < menuList.length; i++) {
            if (menuList[i].items.length === 0)
                result.push(<MenuCard1 key={`MenuCard-${menuList[i].headerName}-${i}`} menu={menuList[i]} />);
            else
                result.push(<MenuCard2 key={`MenuCard-${menuList[i].headerName}-${i}`} menu={menuList[i]} />);
        }
        return result;
    }

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-menu-button" onClick={toggleMenu}>햄버거</div>
            <div className="admin-sidebar-logo">
            </div>
                <select onChange={(e) => changeLanguage(e.target.value)} className="language-select" value={i18n.language}>
                    <option value="ko">{t("Common:Language.Korean")}</option>
                    <option value="en">{t("Common:Language.English")}</option>
                    <option value="zh">{t("Common:Language.Chinese")}</option>
                    <option value="ja">{t("Common:Language.Japanese")}</option>
                </select>
            {rendering()}
        </div>
    );
}

export default Menu;