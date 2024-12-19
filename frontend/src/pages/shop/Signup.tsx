import { useEffect, useState } from "react"
import { signup, authEmail, checkAuthCode, checkRecommendEmail } from '../../apis/memberApi'

const Signup:React.FC = () => {
  const [inputFn, setInputFirstName] = useState<string>('')
  const [inputLn, setInputLastName] = useState<string>('')
  const [inputId, setInputId] = useState<string>('')
  const [inputPw, setInputPw] = useState<string>('')
  const [inputEm, setInputEmail] = useState<string>('')
  const [inputPn, setInputPhone] = useState<string>('')
  const [inputRm, setInputRecommend] = useState<string>('')
  const [inputAuth, setInputAuth] = useState<string>('')
  const [isAuthCodeSent, setIsAuthCodeSent] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(300)
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState<boolean>(false)
  const [recommendMessage, setRecommendMessage] = useState<string>('')

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // timer 변수를 선언
  
    if (isAuthCodeSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isAuthCodeSent, timeLeft]);
  
  const handleInputLn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLastName(event.target.value) 
  }
  const handleInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFirstName(event.target.value)
  }

  const handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value)
  }

  const handleInputPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPw(event.target.value)
  }

  const handleInputEm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value)
  }
  
  const handleInputPn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPhone(event.target.value)
  }

  const handleInputRm = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const recommendValue = event.target.value;
    setInputRecommend(recommendValue);

    if (recommendValue) {
      const message = await checkRecommendEmail(recommendValue);
      setRecommendMessage(message);
    } else {
      setRecommendMessage('');
    }
  };

  const handleAuthCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAuth(event.target.value)
  }

  const onClickSignUp = async () => {
    if (!isAuthCodeVerified) {
      alert('이메일 인증을 먼저 진행해주세요.');
      return;
    }

    const signupUser = {
      firstName: inputFn,
      lastName: inputLn,
      id: inputId,
      password: inputPw,
      email: inputEm,
      phone: inputPn,
      recommend: inputRm,
      provider: 'web',
      platform: 'zone',
      country: 'KOR'
    };

    try {
      const result = await signup(signupUser);
      if (result) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = '/';
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  const sendAuthCode = async () => {
    try {
      const authCode = await authEmail(inputEm);
      if (authCode) {
        alert('이메일 인증 코드가 전송되었습니다.');
        setIsAuthCodeSent(true);
        setTimeLeft(300);
        setIsAuthCodeVerified(false);
      } else {
        alert('이메일 인증 코드 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('Email authentication error:', error);
      alert('이메일 인증 코드 전송에 실패했습니다.');
    }
  };

  const handleAuthCodeVerification = async () => {
    const isValid = await checkAuthCode(inputEm, inputAuth);
    if (isValid) {
      alert('인증이 완료되었습니다.');
      setIsAuthCodeVerified(true);
    } else {
      alert('인증 코드가 일치하지 않습니다.');
    }
  };

    return (
      <h2>
      <div>
      <h2>SignUp</h2>
        <div>
            <label htmlFor='last_name'>LastName : </label>
            <input type='text' name='input_last' value={inputLn} onChange = {handleInputLn} />
        </div>
        <div>
            <label htmlFor='fisrt_name'>FirstName : </label>
            <input type='text' name='input_first' value={inputFn} onChange = {handleInputFn} />
        </div>
        <div>
            <label htmlFor='input_id'>ID : </label>
            <input type='text' name='input_id' value={inputId} onChange = {handleInputId} />
        </div>
        <div>
            <label htmlFor='input_pw'>PW : </label>
            <input type='password' name='input_pw' value={inputPw} onChange = {handleInputPw} />
        </div>
        <div>
            <label htmlFor='input_em'>E-mail : </label>
            <input type='text' name='input_em' value={inputEm} onChange = {handleInputEm} />
            <button type='button' onClick={sendAuthCode}>인증번호 전송</button>
        </div>
        {isAuthCodeSent && !isAuthCodeVerified && (
          <div>
            <label htmlFor='auth_code'>Auth Code : </label>
            <input type='text' name='auth_code' value={inputAuth} onChange={handleAuthCodeInput} />
            <button type='button' onClick={handleAuthCodeVerification}>인증번호 확인</button>
          </div>
        )}
        {isAuthCodeVerified && (
          <div style={{ color: 'blue' }}>인증 완료</div>
        )}
        <div>
            <label htmlFor='input_pn'>Phone : </label>
            <input type='text' name='input_pn' value={inputPn} onChange = {handleInputPn} />
        </div>
        <div>
            <label htmlFor='recommend'>Recommend : </label>
            <input type='text' name='recommend' value={inputRm} onChange={handleInputRm} />
            {recommendMessage && (
              <div style={{ color: recommendMessage.includes('유효하지 않습니다') || recommendMessage.includes('존재하지 않습니다') ? 'red' : 'blue' }}>
                {recommendMessage}
              </div>
            )}
        </div>
        <div>
            <button type='button' onClick={onClickSignUp}>Sign Up</button>
        </div>
      </div>
      </h2>
    );
  }
  
  export default Signup;
    