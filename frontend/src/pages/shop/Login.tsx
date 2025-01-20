import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_s } from "../../services/member";
import { useTranslation } from "react-i18next";
import "./Login.css";

const googleOauthClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID_PROD;
const kakaoOauthClientId = process.env.REACT_APP_KAKAO_CLIENT_ID_PROD;

const Login: React.FC = () => {
  const { t } = useTranslation('Login');
  const [inputId, setInputId] = useState<string>('');
  const [inputPw, setInputPw] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  }

  const handleInputPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPw(event.target.value);
  }

  const onClickLogin = async () => {
    setIsLoggingIn(true);
    const loginUser = { email: inputId, password: inputPw };
    const loginResult = await login_s(loginUser);
    setIsLoggingIn(false);
    if (loginResult) {
      navigate("/");
      window.location.reload();
    } else {
      alert(t('Alert.LoginFailed'));
    }
  }

  const handleGoogleLogin = () => {
    if (!googleOauthClientId) {
      console.error('Google OAuth Client ID is not defined');
      return;
    }

    // const redirectUri = "http://localhost:3000/code/google";
    const redirectUri = "http://localhost:3000/code/google";
    const scope = "email profile";
    const responseType = "code";

    const params = new URLSearchParams({
      response_type: responseType,
      client_id: googleOauthClientId,
      redirect_uri: redirectUri,
      scope: scope,
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    window.location.href = googleAuthUrl;
  };

  const handleKakaoLogin = () => {
    if (!kakaoOauthClientId) {
      console.error('Kakao OAuth Client ID is not defined');
      return;
    }
    const redirectUri = "http://localhost:3000/code/kakao";
    const responseType = "code";

    const params = new URLSearchParams({
      response_type: responseType,
      client_id: kakaoOauthClientId,
      redirect_uri: redirectUri,
    });

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
    window.location.href = kakaoAuthUrl;
  }

  const redirectSignup = () => {
    navigate("/signup");
  }

  return (
    <div className="shop-login-container">
      <form className="shop-login-form">
        <div className="shop-login-logo"/>
        <div className="shop-login-input-group">
          <input type="text"  name='input_email' placeholder={t('Attribute01')} value={inputId} onChange={handleInputId} />
        </div>
        <div className="shop-login-input-group">
          <input type="password" name='input_pw' placeholder={t('Attribute02')} value={inputPw} onChange={handleInputPw} />
        </div>
        <div className="shop-login-button">
          <button disabled={isLoggingIn} onClick={onClickLogin}>
            {t('Button.login')}
          </button>
        </div>
        <div className="shop-login-links">
          <a href="/FindIDPW">아이디 찾기 / 비밀번호 재설정</a> 
        </div>
      </form>
      <div className="shop-login-simple-login-container">
        <div className="shop-login-simple-login-title">
          간편 로그인
        </div>
        <div className="shop-login-simple-login-button-container">
          <div className="shop-login-google-button" onClick={handleGoogleLogin}>
            <div className="shop-login-google-button-icon"/>
          </div>
          <div className="shop-login-kakao-button" onClick={handleKakaoLogin}>
            <div className="shop-login-kakao-button-icon"/>
          </div>
      </div>
    </div>  
    <button className="shop-login-signup-button" onClick={redirectSignup}>{t('Button.signup')}</button>
    <footer>©Abbazon Corp. All rights reserved.</footer>
  </div>
  );
}

export default Login;