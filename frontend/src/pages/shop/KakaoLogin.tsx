import { useLocation } from "react-router-dom";
import { kakaoLoginWithCode_s } from "../../services/member";
import { useEffect } from "react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const KakaoLogin:React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith('/admin');
  const handleKakaoCallback = async (code: string) => {
    const loginResult = await kakaoLoginWithCode_s(code);
    if (loginResult && !isAdminPage) {
      const previousPage = sessionStorage.getItem("previousPage");
      if (previousPage) {
        sessionStorage.removeItem("previousPage"); // 이전 기록 삭제
        window.location.href = previousPage; // 이전 페이지로 이동
      }
      window.dispatchEvent(new Event('user-info-updated'));
    } else if (loginResult && isAdminPage){
      navigate("/admin");
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