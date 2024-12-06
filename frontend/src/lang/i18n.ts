import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import AdminMenu_en from './en/AdminMenu.json';
import AdminMenu_ko from './ko/AdminMenu.json';
import AdminManagerMember_en from './en/AdminManagerMember.json';
import AdminManagerMember_ko from './ko/AdminManagerMember.json';

const resources = {
  ko: {
    AdminMenu: AdminMenu_ko,
    AdminManagerMember: AdminManagerMember_ko,
  },
  en: {
    AdminMenu: AdminMenu_en,
    AdminManagerMember: AdminManagerMember_en,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['AdminMenu'],
  defaultNS: 'AdminMenu',
  interpolation: { escapeValue: false },
});

export default i18n;
