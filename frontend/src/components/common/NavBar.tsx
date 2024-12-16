import { useNavigate } from "react-router-dom";
const NavBar:React.FC = () => {
    const navigate = useNavigate();
    const handleGoAdmin = () =>{
        navigate("/admin");
    }
    const handleGoShop = () =>{
        navigate("/");
    }
    return (
        <div>
            <div onClick={handleGoAdmin}>
                어드민페이지
            </div>
            <div onClick={handleGoShop}>
                샵페이지
            </div>
        </div>
    );
  }
  
  export default NavBar;
  