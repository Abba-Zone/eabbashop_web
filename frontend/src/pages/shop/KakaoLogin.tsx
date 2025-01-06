import { useLocation } from "react-router-dom";
import { kakaoLoginWithCode_s } from "../../services/member";
import { useEffect } from "react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const KakaoLogin:React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleKakaoCallback = async (code: string) => {
    const loginResult = await kakaoLoginWithCode_s(code);
    if (loginResult) {
      navigate("/");
      window.dispatchEvent(new Event('user-info-updated'));
    } else {

    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code) {
      handleKakaoCallback(code);
    }
  }, [location]);
    return (
      <div>
        <h2>카카오 로그인이 진행중입니다.</h2>
      </div>
    );
  }
  
  export default KakaoLogin;