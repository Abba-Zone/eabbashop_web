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
                로그인
            </div>
            <div onClick={handleGoSignup}>
                회원가입
            </div>
            <div onClick={handleGoAdmin}>
                어드민페이지
            </div>
        </div>
    );
  }
  
  export default NavBar;
  