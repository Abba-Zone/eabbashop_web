import React, { createContext, useState, useContext, useEffect } from 'react';

interface MenuContextProps {
  menuVisible: boolean;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(() => {
    const saved = localStorage.getItem('menuVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('menuVisible', JSON.stringify(menuVisible));
  }, [menuVisible]);

  return (
    <MenuContext.Provider value={{ menuVisible, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};