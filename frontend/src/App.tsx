import { BrowserRouter as Router} from "react-router-dom";
import './App.css';
import RoutePath from './routes/RoutePath';
import { Header, NavBar, Footer } from './components';

const App:React.FC = () => {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Header/>
        <RoutePath />
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
