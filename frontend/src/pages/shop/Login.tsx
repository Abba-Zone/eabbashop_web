import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_s } from "../../services/member";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";


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

  return (
    <div>
      <h2>{t('Title')}</h2>
      <div>
          <label htmlFor='input_id'>{t('Attribute01') + ' : '}</label>
          <input type='text' name='input_id' value={inputId} onChange = {handleInputId} />
      </div>
      <div>
          <label htmlFor='input_pw'>{t('Attribute02') + ' : '}</label>
          <input type='password' name='input_pw' value={inputPw} onChange = {handleInputPw} />
      </div>
      <div>
        <button type='button' onClick={onClickLogin} disabled={isLoggingIn}>
          {isLoggingIn ? t('Button.loggingIn') : t('Button.login')}
        </button>
      </div>
      <div>
        <button type='button' onClick={handleGoogleLogin}>{t('Button.googleOauthLogin')}</button>
      </div>
      <div>
        <button type='button' onClick={handleKakaoLogin}>{t('Button.kakaoOauthLogin')}</button>
      </div>
    </div>
  );
}

export default Login;