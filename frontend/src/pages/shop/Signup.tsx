import { useEffect, useState } from "react"
import { signup, authEmail } from '../../apis/memberApi'

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

  const handleInputRm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputRecommend(event.target.value)
  }

  const handleAuthCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAuth(event.target.value)
  }

  const onClickSignUp = async () => {
    const signupUser = {
      firstName: inputFn,
      lastName: inputLn,
      id: inputId,
      password: inputPw,
      email: inputEm,
      phone: inputPn,
      recommend: inputRm,
      provider: 'defaultProvider',
      platform: 'web',
      country: 'KOR'
    };

    try {
      const result = await signup(signupUser);
      if (result) {
        alert('Signup successful!');
      } else {
        alert('Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup.');
    }
  };

  const sendAuthCode = async () => {
    try {
      const authCode = await authEmail(inputEm);
      if (authCode) {
        alert('Email authentication code sent.');
        setIsAuthCodeSent(true);
        setTimeLeft(300);
      } else {
        alert('Failed to send email authentication code.');
      }
    } catch (error) {
      console.error('Email authentication error:', error);
      alert('An error occurred during email authentication.');
    }
  };

  const checkAuthCode = async () => {
    const authCode = localStorage.getItem("email-auth-code");
    console.log(authCode);
    if (authCode === inputAuth) {
      alert('Email authentication code is correct.');
    } else {
      alert('Email authentication code is incorrect.');
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
        {isAuthCodeSent && (
          <div>
            <label htmlFor='auth_code'>Auth Code : </label>
            <input type='text' name='auth_code' value={inputAuth} onChange={handleAuthCodeInput} />
            <button type='button' onClick={checkAuthCode}>인증번호 확인</button>
            <div>Time left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</div>
          </div>
        )}
        <div>
            <label htmlFor='input_pn'>Phone : </label>
            <input type='text' name='input_pn' value={inputPn} onChange = {handleInputPn} />
        </div>
        <div>
            <label htmlFor='recommend'>Recommend : </label>
            <input type='text' name='recommend' value={inputRm} onChange = {handleInputRm} />
        </div>
        <div>
            <button type='button' onClick={onClickSignUp}>Sign Up</button>
        </div>
      </div>
      </h2>
    );
  }
  
  export default Signup;
    