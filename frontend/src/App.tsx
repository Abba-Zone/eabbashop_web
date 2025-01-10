import React from 'react';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import './App.css';
import RoutePath from './routes/RoutePath';
import { Header, NavBar, Footer } from './components';
import { MenuProvider, useMenu } from './context/MenuContext';

const App: React.FC = () => {
  return (
    <MenuProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Header />
          <div className='content'>
            <Content />
          </div>
          <Footer />
        </div>
      </Router>
    </MenuProvider>
  );
}

const Content: React.FC = () => {
  const { menuVisible } = useMenu();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className={`content ${isAdminPage && menuVisible ? 'menu-open' : 'menu-closed'}`}>
      <RoutePath />
    </div>
  );
}

export default App;
