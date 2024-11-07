import { useNavigate } from "react-router-dom";
const Header:React.FC = () => {
  const navigate = useNavigate();
  const handleGoHome = () =>{
    navigate("/");
  }
  return (
    <div>
      <div onClick={handleGoHome}>
                home Image
      </div>
    </div>
  );
  }
  
  export default Header;
  