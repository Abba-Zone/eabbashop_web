import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

const resources = {
  ko: {
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
    AdminPayment: AdminPayment_ko
  },
  en: {
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
    AdminPayment: AdminPayment_en
  },
  ja: {
    AdminMenu: AdminMenu_ja,
    AdminManagerMember: AdminManagerMember_ja,
  },
  zh: {
    AdminMenu: AdminMenu_zh,
    AdminManagerMember: AdminManagerMember_zh,
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
