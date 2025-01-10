import { useLocation } from "react-router-dom";
import { googleLoginWithCode_s } from "../../services/member";
import { useEffect } from "react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const GoogleLogin:React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith('/admin');
  const handleGoogleCallback = async (code: string) => {
    const loginResult = await googleLoginWithCode_s(code);
    if (loginResult && !isAdminPage) {
      navigate("/");
      window.dispatchEvent(new Event('user-info-updated'));
    } else {
      navigate("/admin");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code) {
      handleGoogleCallback(code);
    }
  }, [location]);
    return (
      <div>
        <h2>Google 로그인이 진행중입니다.</h2>
      </div>
    );
  }
  
  export default GoogleLogin;
