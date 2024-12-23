import { useEffect, useState } from "react"
import { signup_s, login_s, authEmail_s, checkAuthCode_s, checkRecommendEmail_s } from '../../services/member'

const Signup:React.FC = () => {
  const [inputFn, setInputFirstName] = useState<string>('')
  const [inputLn, setInputLastName] = useState<string>('')
  // const [inputId, setInputId] = useState<string>('')
  const [inputPw, setInputPw] = useState<string>('')
  const [inputEm, setInputEmail] = useState<string>('')
  const [inputPn, setInputPhone] = useState<string>('')
  const [inputRm, setInputRecommend] = useState<string>('')
  const [inputAuth, setInputAuth] = useState<string>('')
  const [isAuthCodeSent, setIsAuthCodeSent] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(180)
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState<boolean>(false)
  const [recommendMessage, setRecommendMessage] = useState<string>('')
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
  
    if (isAuthCodeSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setAuthCodeMessage('인증을 다시 시도 해주세요.');
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
      lastName: validateName(lastName) ? '' : '50자 이하로 입력해주세요.'
    }));
  }
  const handleInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    setInputFirstName(firstName);
    setErrors((prevErrors) => ({
      ...prevErrors,
      firstName: validateName(firstName) ? '' : '50자 이하로 입력해주세요.'
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
      password: validatePassword(password) ? '' : '유효한 비밀번호 형식이 아닙니다.'
    }));
  };

  const handleInputEm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setInputEmail(email);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(email) ? '' : '유효한 이메일 형식이 아닙니다.'
    }));
  }
  
  const handleInputPn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    setInputPhone(phone);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: validatePhone(phone) ? '' : '유효한 전화번호 형식이 아닙니다.'
    }));
  }

  const handleInputRm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const recommendValue = event.target.value;
    setInputRecommend(recommendValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      recommend: validateEmail(recommendValue) ? '' : '유효한 이메일 형식이 아닙니다.'
    }));

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setDebounceTimer(
      setTimeout(async () => {
        if (recommendValue) {
          const message = await checkRecommendEmail_s(recommendValue);
          if (message === '성공했습니다.') {
            setRecommendMessage('유효한 추천인입니다.');
          } else if (message === undefined) {
            setRecommendMessage('존재하지 않는 유저입니다.');
          } else {
            setRecommendMessage(message);
          }
        } else {
          setRecommendMessage('');
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
    setPasswordMatchError(confirmPassword === inputPw ? '' : '비밀번호가 일치하지 않습니다.');
  };

  const onClickSignUp = async () => {
    if (isSigningUp) return; // 이미 요청 중이면 중복 요청 방지

    if (!isAuthCodeVerified) {
      alert('이메일 인증을 먼저 진행해주세요.');
      return;
    }

    if (!inputFn || !inputLn || !inputPw || !inputEm || !inputPn || !inputRm) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    if (Object.values(errors).some((error) => error !== '') || passwordMatchError) {
      alert('입력한 정보가 유효하지 않습니다. 다시 확인해주세요.');
      return;
    }

    setIsSigningUp(true); // 요청 시작

    const signupUser = {
      firstName: inputFn,
      lastName: inputLn,
      // id: inputId,
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
        alert('회원가입이 완료되었습니다.');
        
        // 로그인 시도
        const loginResult = await login_s({ email: inputEm, password: inputPw });
        if (loginResult) {
          window.location.href = '/';
        } else {
          alert('로그인에 실패했습니다.');
        }
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Signup or login error:', error);
      alert('회원가입 또는 로그인에 실패했습니다.');
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
        alert('이메일 인증 코드가 전송되었습니다.');
        setIsAuthCodeSent(true);
        setTimeLeft(180);
        setAuthCodeMessage('');
        setIsAuthCodeVerified(false);
      } else {
        alert('이메일 인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('Email authentication error:', error);
      alert('이메일 인증 코드 전송에 실패했습니다.');
    } finally {
      setIsSendingAuthCode(false); // 요청 완료
    }
  };

  const handleAuthCodeVerification = async () => {
    try {
      const response = await checkAuthCode_s(inputEm, inputAuth);
      // console.log(response);
      const reponseStatus = response.status;
      console.log(reponseStatus);
      if (reponseStatus === 216) {
        setAuthCodeMessage('인증 코드가 일치하지 않습니다.');
      } else if (reponseStatus === 200) {
        setAuthCodeMessage('');
        setIsAuthCodeVerified(true);
        setIsEmailEditable(false);
      }
    } catch (error) {
      // console.error('Error verifying auth code:', error);
      setAuthCodeMessage('인증 코드 확인 중 오류가 발생했습니다.');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,16}$/;
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
    <h2>
      <div>
        <h2>회원가입</h2>
        {/* <div>
            <label htmlFor='input_id'>ID : </label>
            <input type='text' name='input_id' value={inputId} onChange = {handleInputId} />
        </div> */}
        <div>
          <label htmlFor='input_em'>E-mail(ID)* : </label>
          <input
            type='text'
            name='input_em'
            value={inputEm}
            onChange={handleInputEm}
            disabled={isAuthCodeVerified && !isEmailEditable}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          {isAuthCodeSent ? (
            <button type='button' onClick={sendAuthCode}>인증번호 재전송</button>
          ) : (
            <button type='button' onClick={sendAuthCode} disabled={isSendingAuthCode}>인증번호 전송</button>
          )}
          {isAuthCodeVerified && (
            <button type="button" onClick={handleModifyEmail}>수정</button>
          )}
        </div>
        {isAuthCodeSent && !isAuthCodeVerified && (
          <div>
            <label htmlFor='auth_code'>인증번호 : </label>
            <input type='text' name='auth_code' value={inputAuth} onChange={handleAuthCodeInput} />
            <button type='button' onClick={handleAuthCodeVerification}>인증번호 확인</button>
            <div>남은 시간: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</div>
          </div>
        )}
        {authCodeMessage && (
          <div style={{ color: 'red' }}>{authCodeMessage}</div>
        )}
        {isAuthCodeVerified && (
          <div style={{ color: 'blue' }}>인증 완료</div>
        )}
        <div>
          <label htmlFor='input_pw'>비밀번호* : </label>
          <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          <div style={{ fontSize: '12px' }}>
            비밀번호는 8자 이상 16자 이하의 영문 대소문자, 숫자, 특수문자
            {'! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ ₩ ] ^ _ ` { | } ~'}로 구성되어야 합니다.
          </div>
        </div>
        <div>
          <label htmlFor='input_pw_confirm'>비밀번호 확인* : </label>
          <input type='password' name='input_pw_confirm' value={inputPwConfirm} onChange={handleInputPwConfirm} />
          {passwordMatchError && <div style={{ color: 'red' }}>{passwordMatchError}</div>}
        </div>
        <div>
          <label htmlFor='last_name'>성* : </label>
          <input type='text' name='input_last' value={inputLn} onChange={handleInputLn} />
          {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
        </div>
        <div>
          <label htmlFor='fisrt_name'>이름* : </label>
          <input type='text' name='input_first' value={inputFn} onChange={handleInputFn} />
          {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
        </div>
        <div>
          <label htmlFor='input_pn'>전화번호* : </label>
          <input type='text' name='input_pn' value={inputPn} onChange={handleInputPn} />
          {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
        </div>
        <div style={{ fontSize: '12px' }}>전화번호는 010-0000-0000 형식으로 입력해주세요.</div>
        <div>
          <label htmlFor='recommend'>추천인 이메일*: </label>
          <input type='text' name='recommend' value={inputRm} onChange={handleInputRm} />
          {errors.recommend && <div style={{ color: 'red' }}>{errors.recommend}</div>}
          {recommendMessage && (
            <div style={{ color: recommendMessage.includes('존재하지 않는') ? 'red' : 'blue' }}>
              {recommendMessage}
            </div>
          )}
        </div>
        <div>
          <button type="button" onClick={onClickSignUp} disabled={isSigningUp}>
            Sign Up
          </button>
        </div>
      </div>
    </h2>
  );
}

export default Signup;
    