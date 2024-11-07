import axios from "axios"
import { useEffect, useState } from "react"

const Login:React.FC = () => {
  const [inputId, setInputId] = useState<string>('')
  const [inputPw, setInputPw] = useState<string>('')

  const handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputId(event.target.value)
  }

  const handleInputPw = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputPw(event.target.value)
  }

  const onClickLogin = () => {
  }
  return (
    <div>
      <h2>Login</h2>
      <div>
          <label htmlFor='input_id'>ID : </label>
          <input type='text' name='input_id' value={inputId} onChange = {handleInputId} />
      </div>
      <div>
          <label htmlFor='input_pw'>PW : </label>
          <input type='password' name='input_pw' value={inputPw} onChange = {handleInputPw} />
      </div>
      <div>
          <button type='button' onClick={onClickLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
  