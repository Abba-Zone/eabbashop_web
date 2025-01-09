import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
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
          <Content />
          <Footer />
        </div>
      </Router>
    </MenuProvider>
  );
}

const Content: React.FC = () => {
  const { menuVisible } = useMenu();

  return (
    <div className={`content ${menuVisible ? 'menu-closed' : 'menu-open'}`}>
      <RoutePath />
    </div>
  );
}

export default App;
