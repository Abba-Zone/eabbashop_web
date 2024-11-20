import { useNavigate } from "react-router-dom";
const NavBar:React.FC = () => {
    const navigate = useNavigate();
    const handleGoLogin = () =>{
        navigate("/login");
    }
    const handleGoSignup = () =>{
        navigate("/signup");
    }
    const handleGoAdmin = () =>{
        navigate("/admin");
    }
    return (
        <div>
            <div onClick={handleGoLogin}>
                login
            </div>
            <div onClick={handleGoSignup}>
                signup
            </div>
            <div onClick={handleGoAdmin}>
                Admin 페이지
            </div>
        </div>
    );
  }
  
  export default NavBar;
  