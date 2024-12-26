import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { login_s } from "../../services/member"
import { useTranslation } from "react-i18next";

const Login:React.FC = () => {
  const { t } = useTranslation('Login');
  const [inputId, setInputId] = useState<string>('')
  const [inputPw, setInputPw] = useState<string>('')
  const navigate = useNavigate();
  const handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputId(event.target.value)
  }

  const handleInputPw = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputPw(event.target.value)
  }

  const onClickLogin = async () => {
    const loginUser = {email : inputId, password : inputPw}
    const loginResult = await login_s(loginUser);
    if (loginResult){
      navigate("/");
    } else {
      alert(t('Alert.LoginFailed'))
    }
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
          <button type='button' onClick={onClickLogin}>{t('Button.login')}</button>
      </div>
    </div>
  );
}

export default Login;
  