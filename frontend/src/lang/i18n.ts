import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Common_ko from './ko/Common.json';
import Common_en from './en/Common.json';
import Common_ja from './ja/Common.json';
import Common_zh from './zh/Common.json';

import SignUp_ko from './ko/SignUp.json';
import SignUp_en from './en/SignUp.json';
import SignUp_ja from './ja/SignUp.json';
import SignUp_zh from './zh/SignUp.json';

import Login_ko from './ko/Login.json';
import Login_en from './en/Login.json';
import Login_ja from './ja/Login.json';
import Login_zh from './zh/Login.json';

import AdminMenu_en from './en/AdminMenu.json';
import AdminMenu_ko from './ko/AdminMenu.json';
import AdminMenu_ja from './ja/AdminMenu.json';
import AdminMenu_zh from './zh/AdminMenu.json';

import AdminManagerMember_en from './en/AdminManagerMember.json';
import AdminManagerMember_ko from './ko/AdminManagerMember.json';
import AdminManagerMember_ja from './ja/AdminManagerMember.json';
import AdminManagerMember_zh from './zh/AdminManagerMember.json';

import AdminInquiry_ko from './ko/AdminInquiry.json';
import AdminInquiry_en from './en/AdminInquiry.json';

import AdminProduct_ko from './ko/AdminProduct.json';
import AdminProduct_en from './en/AdminProduct.json';

import AdminOrder_ko from './ko/AdminOrder.json';
import AdminOrder_en from './en/AdminOrder.json';

import AdminInvoice_ko from './ko/AdminInvoice.json';
import AdminInvoice_en from './en/AdminInvoice.json';

import AdminShipment_ko from './ko/AdminShipment.json';
import AdminShipment_en from './en/AdminShipment.json';

import AdminBoard_ko from './ko/AdminBoard.json';
import AdminBoard_en from './en/AdminBoard.json';

import AdminDonation_ko from './ko/AdminDonation.json';
import AdminDonation_en from './en/AdminDonation.json';

import AdminStore_ko from './ko/AdminStore.json';
import AdminStore_en from './en/AdminStore.json';

import AdminPayment_ko from './ko/AdminPayment.json';
import AdminPayment_en from './en/AdminPayment.json';

import AdminRefund_ko from './ko/AdminRefund.json';
import AdminRefund_en from './en/AdminRefund.json';

import AdminShareLine_ko from './ko/AdminShareLine.json';
import AdminShareLine_en from './en/AdminShareLine.json';

import AdminShareMoney_ko from './ko/AdminShareMoney.json';
import AdminShareMoney_en from './en/AdminShareMoney.json';

import AdminTransferCancel_ko from './ko/AdminTransferCancel.json';
import AdminTransferCancel_en from './en/AdminTransferCancel.json';

import AdminTransfer_ko from './ko/AdminTransfer.json';
import AdminTransfer_en from './en/AdminTransfer.json';

import AdminRegularOrder_ko from './ko/AdminRegularOrder.json';
import AdminRegularOrder_en from './en/AdminRegularOrder.json';

const resources = {
  ko: {
    Common: Common_ko,
    AdminMenu: AdminMenu_ko,
    AdminManagerMember: AdminManagerMember_ko,
    AdminInquiry: AdminInquiry_ko,
    AdminProduct: AdminProduct_ko,
    AdminOrder: AdminOrder_ko,
    AdminInvoice: AdminInvoice_ko,
    AdminShipment: AdminShipment_ko,
    AdminBoard: AdminBoard_ko,
    AdminDonation: AdminDonation_ko,
    AdminStore: AdminStore_ko,
    AdminPayment: AdminPayment_ko,
    AdminRefund: AdminRefund_ko,
    AdminShareLine: AdminShareLine_ko,
    AdminShareMoney: AdminShareMoney_ko,
    AdminTransferCancel: AdminTransferCancel_ko,
    AdminTransfer: AdminTransfer_ko,
    AdminRegularOrder: AdminRegularOrder_ko,
    SignUp: SignUp_ko,
    Login: Login_ko
  },
  en: {
    Common: Common_en,
    AdminMenu: AdminMenu_en,
    AdminManagerMember: AdminManagerMember_en,
    AdminInquiry: AdminInquiry_en,
    AdminProduct: AdminProduct_en,
    AdminOrder: AdminOrder_en,
    AdminInvoice: AdminInvoice_en,
    AdminShipment: AdminShipment_en,
    AdminBoard: AdminBoard_en,
    AdminDonation: AdminDonation_en,
    AdminStore: AdminStore_en,
    AdminPayment: AdminPayment_en,
    AdminRefund: AdminRefund_en,
    AdminShareLine: AdminShareLine_en,
    AdminShareMoney: AdminShareMoney_en,
    AdminTransferCancel: AdminTransferCancel_en,
    AdminTransfer: AdminTransfer_en,
    AdminRegularOrder: AdminRegularOrder_en,
    SignUp: SignUp_en,
    Login: Login_en
  },
  ja: {
    AdminMenu: AdminMenu_ja,
    AdminManagerMember: AdminManagerMember_ja,
    SignUp: SignUp_ja,
    Common: Common_ja,
    Login: Login_ja
  },
  zh: {
    AdminMenu: AdminMenu_zh,
    AdminManagerMember: AdminManagerMember_zh,
    SignUp: SignUp_zh,
    Common: Common_zh,
    Login: Login_zh
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: 'ko',
  fallbackLng: 'en',
  ns: ['AdminMenu'],
  defaultNS: 'AdminMenu',
  interpolation: { escapeValue: false },
});

export default i18n;
