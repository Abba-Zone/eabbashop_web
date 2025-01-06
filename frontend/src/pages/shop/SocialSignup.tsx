import { useState } from "react"
import { signup_s, login_s, checkRecommendEmail_s } from '../../services/member'
import { useTranslation } from 'react-i18next';

const SocialSignup:React.FC = () => {
  const Cookies = require('js-cookie');
  const { t } = useTranslation('SignUp');
  const [inputPn, setInputPhone] = useState<string>('')
  const [inputRm, setInputRecommend] = useState<string>('')
  const [recommendStatus, setRecommendStatus] = useState<number | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    recommend: ''
  });
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const handleInputPn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    setInputPhone(phone);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: validatePhone(phone) ? '' : t('Alert.phoneInvalid')
    }));
  }

  const handleInputRm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const recommendValue = event.target.value;
    setInputRecommend(recommendValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      recommend: validateEmail(recommendValue) ? '' : t('Alert.recommendInvalid')
    }));

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setDebounceTimer(
      setTimeout(async () => {
        if (recommendValue) {
          const message = await checkRecommendEmail_s(recommendValue);
          if (message.status === 200) {
            setRecommendStatus(200);
          } else if (message.status === 204) {
            setRecommendStatus(204);
          } else {
            setRecommendStatus(500);
          }
        } else {
          setRecommendStatus(null);
        }
      }, 1000)
    );
  };


  const onClickSignUp = async () => {
    if (isSigningUp) return; // 이미 요청 중이면 중복 요청 방지

    if (!inputPn || !inputRm) {
      alert(t('Alert.fillAllFields'));
      return;
    }

    if (Object.values(errors).some((error) => error !== '')) {
      alert(t('Alert.invalidInput'));
      return;
    }

    setIsSigningUp(true); // 요청 시작

    const signupData = JSON.parse(Cookies.get('signupData') as string);

    const firstName = signupData.firstName ? signupData.firstName : '';
    
    const signupUser = {
      firstName: firstName,
      lastName: signupData.lastName,
      password: signupData.password,
      email: signupData.email,
      phone: inputPn,
      recommend: inputRm,
      provider: signupData.provider,
      platform: 'zon',
      country: 'KOR'
    };
    try {
      const signupResult = await signup_s(signupUser as signupUser);
      if (signupResult) {
        alert(t('Alert.signupComplete'));
        // 로그인 시도
        const loginResult = await login_s({ email: signupData.email, password: signupData.password });
        if (loginResult) {
          window.location.href = '/';
        } else {
          alert(t('Alert.loginFail'));
        }
      } else {
        alert(t('Alert.signupFail'));
      }
    } catch (error) {
      console.error('Signup or login error:', error);
      alert(t('Alert.signupFail'));
    } finally {
      setIsSigningUp(false); // 요청 완료
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  return (
    <h2>
      <div>
        <h2>추가정보입력</h2>
        <div>
          <label htmlFor='input_pn'>{t('Attribute06')}* : </label>
          <input type='text' name='input_pn' value={inputPn} onChange={handleInputPn} />
          {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
        </div>
        <div style={{ fontSize: '12px' }}>{t('Alert.phoneFormat')}</div>
        <div>
          <label htmlFor='recommend'>{t('Attribute07')}*: </label>
          <input type='text' name='recommend' value={inputRm} onChange={handleInputRm} />
          {errors.recommend && <div style={{ color: 'red' }}>{errors.recommend}</div>}
          {recommendStatus === 200 && (
            <div style={{ color: 'blue' }}>
              {t('Alert.recommendSuccess')}
            </div>
          )}
          {recommendStatus === 204 && (
            <div style={{ color: 'red' }}>
              {t('Alert.recommendFail')}
            </div>
          )}
        </div>
        <div>
          <button type="button" onClick={onClickSignUp} disabled={isSigningUp}>
            {t('Button.signup')}
          </button>
        </div>
      </div>
    </h2>
  );
}

export default SocialSignup;
    