import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from '../pages';

const RoutePath:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
    </Routes>
  );
}

export default RoutePath;
