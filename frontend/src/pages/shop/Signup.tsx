import { useEffect, useState } from "react"
import { signup_s, login_s, authEmail_s, checkAuthCode_s, checkRecommendEmail_s } from '../../services/member'
import { useTranslation } from 'react-i18next';
import "./Signup.css";

const Signup:React.FC = () => {
  const { t } = useTranslation('SignUp');
  const [inputFn, setInputFirstName] = useState<string>('')
  const [inputLn, setInputLastName] = useState<string>('')
  const [inputPw, setInputPw] = useState<string>('')
  const [inputEm, setInputEmail] = useState<string>('')
  const [inputPn, setInputPhone] = useState<string>('')
  const [inputRm, setInputRecommend] = useState<string>('')
  const [inputAuth, setInputAuth] = useState<string>('')
  const [isAuthCodeSent, setIsAuthCodeSent] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(180)
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState<boolean>(false)
  const [recommendStatus, setRecommendStatus] = useState<number | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)
  const [authCodeMessage, setAuthCodeMessage] = useState<string>('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    recommend: ''
  });
  const [isSendingAuthCode, setIsSendingAuthCode] = useState<boolean>(false);
  const [inputPwConfirm, setInputPwConfirm] = useState<string>('');
  const [passwordMatchError, setPasswordMatchError] = useState<string>('');
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [isEmailEditable, setIsEmailEditable] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // timer 변수를 선언
    if (isAuthCodeSent && timeLeft > 0 && !isAuthCodeVerified) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        console.log(timeLeft);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setAuthCodeMessage(t('Alert.authCodeError'));
      setIsAuthCodeSent(false);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isAuthCodeSent, timeLeft]);
  
  const handleInputLn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = event.target.value;
    setInputLastName(lastName);
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: validateName(lastName) ? '' : t('Alert.nameInvalid')
    }));
  }
  const handleInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    setInputFirstName(firstName);
    setErrors((prevErrors) => ({
      ...prevErrors,
      firstName: validateName(firstName) ? '' : t('Alert.nameInvalid')
    }));
  }

  // const handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputId(event.target.value)
  // }

  const handleInputPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setInputPw(password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(password) ? '' : t('Alert.passwordInvalid')
    }));
  };

  const handleInputEm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setInputEmail(email);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(email) ? '' : t('Alert.emailInvalid')
    }));
  }
  
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

  const handleAuthCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAuth(event.target.value)
  }

  const handleInputPwConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    setInputPwConfirm(confirmPassword);
      setPasswordMatchError(confirmPassword === inputPw ? '' : t('Alert.passwordMismatch'));
  };

  const onClickSignUp = async () => {
    if (isSigningUp) return; // 이미 요청 중이면 중복 요청 방지

    if (!isAuthCodeVerified) {
      alert(t('Alert.emailAuthPrompt'));
      return;
    }

    if (!inputFn || !inputLn || !inputPw || !inputEm || !inputPn || !inputRm) {
      alert(t('Alert.fillAllFields'));
      return;
    }

    if (Object.values(errors).some((error) => error !== '') || passwordMatchError) {
      alert(t('Alert.invalidInput'));
      return;
    }

    setIsSigningUp(true); // 요청 시작

    const signupUser = {
      firstName: inputFn,
      lastName: inputLn,
      password: inputPw,
      email: inputEm,
      phone: inputPn,
      recommend: inputRm,
      provider: 'local',
      platform: 'zon',
      country: 'KOR'
    };

    try {
      const signupResult = await signup_s(signupUser);
      if (signupResult) {
        alert(t('Alert.signupComplete'));
        
        // 로그인 시도
        const loginResult = await login_s({ email: inputEm, password: inputPw });
        if (loginResult) {
          window.location.href = '/';
        } else {
          alert(t('Alert.loginFail'));
        }
      } else {
        alert(t('Alert.signupFail'));
      }
    } catch (error) {
      alert(t('Alert.signupFail'));
    } finally {
      setIsSigningUp(false); // 요청 완료
    }
  };

  const sendAuthCode = async () => {
    if (isSendingAuthCode) return; // 이미 요청 중이면 중복 요청 방지

    setIsSendingAuthCode(true); // 요청 시작
    try {
      const authCode = await authEmail_s(inputEm);
      if (authCode) {
        alert(t('Alert.authCodeSuccess'));
        setIsAuthCodeSent(true);
        setTimeLeft(10);
        setAuthCodeMessage('');
        setIsAuthCodeVerified(false);
      } else {
        alert(t('Alert.authCodeError'));
      }
    } catch (error) {
      alert(t('Alert.authCodeError'));
    } finally {
      setIsSendingAuthCode(false); // 요청 완료
    }
  };

  const handleAuthCodeVerification = async () => {
    try {
      const response = await checkAuthCode_s(inputEm, inputAuth);
      const reponseStatus = response.status;
      if (reponseStatus === 216) {
        setAuthCodeMessage(t('Alert.authCodeMismatch'));
      } else if (reponseStatus === 200) {
        setAuthCodeMessage('');
        setIsAuthCodeVerified(true);
        setIsEmailEditable(false);
      }
    } catch (error) {
      setAuthCodeMessage(t('Alert.authCodeError'));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,15}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name: string) => {
    return name.length <= 50;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleModifyEmail = () => {
    setIsEmailEditable(true);
    setIsAuthCodeVerified(false);
    setIsAuthCodeSent(false);
    setInputAuth('');
    setAuthCodeMessage('');
  };

  return (
    <div className="shop-signup-container">
      <div className="shop-signup-form">
        <h1>{t('Title')}</h1>
        {/* <div>
            <label htmlFor='input_id'>ID : </label>
            <input type='text' name='input_id' value={inputId} onChange = {handleInputId} />
        </div> */}
          <input
            type='text'
            name='input_em'
            placeholder={t('Attribute01')}
            value={inputEm}
            onChange={handleInputEm}
            disabled={isAuthCodeVerified && !isEmailEditable}
          />
          {errors.email && <div className="shop-signup-form-error">{errors.email}</div>}
          {isAuthCodeSent ? (
            <button type='button' onClick={sendAuthCode}>{t('Button.authCodeResend')}</button>
          ) : (
            <button type='button' onClick={sendAuthCode} disabled={isSendingAuthCode}>{t('Button.authCodeSend')}</button>
          )}
          {isAuthCodeVerified && (
            <button type="button" onClick={handleModifyEmail}>{t('Button.modifyEmail')}</button>
          )}
        {isAuthCodeSent && !isAuthCodeVerified && (
          <>
            <input type='text' name='auth_code' placeholder={t('Attribute08')} value={inputAuth} onChange={handleAuthCodeInput} />
            <button type='button' onClick={handleAuthCodeVerification}>{t('Button.authCodeVerify')}</button>
            <div className="shop-signup-timestamp">{t('Alert.remainingTime', { minutes: Math.floor(timeLeft / 60), seconds: ('0' + (timeLeft % 60)).slice(-2) })}</div>
          </>
        )}
        {authCodeMessage && (
          <div className="shop-signup-form-error">{authCodeMessage}</div>
        )}
        {isAuthCodeVerified && (
          <div className="shop-signup-form-success">{t('Alert.authCodeSuccess')}</div>
        )}
          <input type='password' name='input_pw' placeholder={t('Attribute02')} value={inputPw} onChange={handleInputPw} />
          {errors.password && <div className="shop-signup-form-error">{errors.password}</div>}
          <input type='password' name='input_pw_confirm' placeholder={t('Attribute03')} value={inputPwConfirm} onChange={handleInputPwConfirm} />
          {passwordMatchError && <div className="shop-signup-form-error">{passwordMatchError}</div>}
          <input type='text' name='input_last' placeholder={t('Attribute04')} value={inputLn} onChange={handleInputLn} />
          {errors.lastName && <div className="shop-signup-form-error">{errors.lastName}</div>}
          <input type='text' name='input_first' placeholder={t('Attribute05')} value={inputFn} onChange={handleInputFn} />
          {errors.firstName && <div className="shop-signup-form-error">{errors.firstName}</div>}
          <input type='text' name='input_pn' placeholder={t('Attribute06')} value={inputPn} onChange={handleInputPn} />
          {errors.phone && <div className="shop-signup-form-error">{errors.phone}</div>}
          <div style={{ fontSize: '14px' }}>{t('Alert.phoneFormat')}</div>
          <input type='text' name='recommend' placeholder={t('Attribute07')} value={inputRm} onChange={handleInputRm} />
          <div>
            {errors.recommend && <div className="shop-signup-form-error">{errors.recommend}</div>}
            {recommendStatus === 200 && (
              <div className="shop-signup-form-success">
                {t('Alert.recommendSuccess')}
              </div>
            )}
            {recommendStatus === 204 && (
              <div className="shop-signup-form-error">
                {t('Alert.recommendFail')}
              </div>
            )}
          </div>
          <button className="shop-signup-button" type="button" onClick={onClickSignUp} disabled={isSigningUp}>
            {t('Button.signup')}
      </button>
      </div>
    </div>
  );
}

export default Signup;
    