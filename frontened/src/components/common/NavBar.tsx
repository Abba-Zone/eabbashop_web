import { useNavigate } from "react-router-dom";
const NavBar:React.FC = () => {
    const navigate = useNavigate();
    const handleGoLogin = () =>{
        navigate("/login");
    }
    const handleGoSignup = () =>{
        navigate("/signup");
    }
    return (
        <div>
            <div onClick={handleGoLogin}>
                login
            </div>
            <div onClick={handleGoSignup}>
                signup
            </div>
        </div>
    );
  }
  
  export default NavBar;
  