import { useEffect, useState } from "react"

const Signup:React.FC = () => {
  const [inputFn, setInputFirstName] = useState<string>('')
  const [inputLn, setInputLastName] = useState<string>('')
  const [inputId, setInputId] = useState<string>('')
  const [inputPw, setInputPw] = useState<string>('')
  const [inputEm, setInputEmail] = useState<string>('')
  const [inputPn, setInputPhone] = useState<string>('')
  
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

  const onClickSignUp = () => {
    alert(`
      First Name: ${inputFn}
      Last Name: ${inputLn}
      ID: ${inputId}
      Password: ${inputPw}
      Email: ${inputEm}
      Phone: ${inputPn}
    `);
  }

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
      </div>
      <div>
          <label htmlFor='input_pn'>Phone : </label>
          <input type='text' name='input_pn' value={inputPn} onChange = {handleInputPn} />
      </div>
      <div>
          <button type='button' onClick={onClickSignUp}>Sign Up</button>
      </div>
    </div>
      </h2>
    );
  }
  
  export default Signup;
    