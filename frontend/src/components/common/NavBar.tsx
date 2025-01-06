import { useNavigate } from "react-router-dom";
const NavBar:React.FC = () => {
    const Cookies = require('js-cookie');
    
    const isAdminRole = (role: string): boolean => {
        const roleHierarchy = ['A', 'B', 'C', 'D', 'E'];
        return roleHierarchy.indexOf(role) >= roleHierarchy.indexOf('B');
      };

    const navigate = useNavigate();
    const handleGoAdmin = () =>{
        navigate("/admin");
    }
    const handleGoShop = () =>{
        navigate("/");
    }
    const handleGoRegistAdmin = () =>{
        navigate("/admin/registadmin");
    }
    
    return (
        <div>
            <div>
                {isAdminRole(Cookies.get('role')) && (
                    <div onClick={handleGoAdmin}>
                        어드민페이지
                    </div>
                )}
                <div onClick={handleGoShop}>
                    샵페이지
                </div>
            </div>
            <div>
                <div onClick={handleGoRegistAdmin}>
                    판매점 등록하기
                </div>
            </div>
        </div>
    );
};

export default NavBar;
  