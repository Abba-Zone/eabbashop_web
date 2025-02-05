import React, { useState } from 'react';
import './FindIDPW.css';
import { findID_s, sendResetPasswordEmail_s } from '../../services/member';
const FindIDPW: React.FC = () => {
  const [activeTab, setActiveTab] = useState('아이디(이메일)찾기');
  
  const [inputFn, setInputFirstName] = useState<string>('')
  const [inputLn, setInputLastName] = useState<string>('')
  const [inputPn, setInputPhone] = useState<string>('')
  const [inputEmail, setInputEmail] = useState<string>('')
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const Cookies = require('js-cookie');
  const validateName = (name: string) => {
    return name.length <= 50;
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setInputEmail(email);
    Cookies.set('email', email);
  }
  
  const handleInputLn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = event.target.value;
    setInputLastName(lastName);
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: validateName(lastName) ? '' : '이름을 입력해주세요.'
    }));
  }
  const handleInputFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    setInputFirstName(firstName);
    setErrors((prevErrors) => ({
      ...prevErrors,
      firstName: validateName(firstName) ? '' : '성을 입력해주세요.'
    }));
  }

  const handleInputPn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    setInputPhone(phone);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: validatePhone(phone) ? '' : '전화번호를 입력해주세요.'
    }));
  }
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const onClickFindID = async () => {
    const findID = {
        firstName: inputFn,
        lastName: inputLn,
        phone: inputPn
    }
    const findIDResult = await findID_s(findID);
    console.log(findIDResult);
    if (findIDResult) {
      alert(`찾으신 아이디는 ${findIDResult.email} 입니다.`);
    } else {
      alert('아이디를 찾을 수 없습니다.');
    }
  }

  const sendResetPasswordEmail = async () => {
    const resetPasswordEmailResult = await sendResetPasswordEmail_s(Cookies.get('email'));
    console.log(resetPasswordEmailResult);
    if (resetPasswordEmailResult) {
      alert('비밀번호 변경 이메일 발송 완료');
    } else {
      alert('비밀번호 변경 이메일 발송 실패');
    }
  }

  return (
    <div className="find-idpw-container">
      <h1>계정정보 찾기</h1>
      <div className="tabs">
        <button
          className={`tab ${activeTab === '아이디(이메일)찾기' ? 'active' : ''}`}
          onClick={() => handleTabClick('아이디(이메일)찾기')}
        >
          아이디(이메일)찾기
        </button>
        <button
          className={`tab ${activeTab === '비밀번호 찾기' ? 'active' : ''}`}
          onClick={() => handleTabClick('비밀번호 찾기')}
        >
          비밀번호 찾기
        </button>
      </div>
      {activeTab === '아이디(이메일)찾기' && (
        <div className="info">
            <div className="form-container">
                <div className="form-row">
                    <label>성</label>
                    <input type="text" placeholder="성을 입력해주세요." content="inputLn" value={inputLn} onChange={handleInputLn} />
                </div>
                <div className="form-row">
                    <label>이름</label>
                    <input type="text" placeholder="이름을 입력해주세요." content="inputFn" value={inputFn} onChange={handleInputFn} />
                </div>
                <div className="form-row">
                    <label>전화번호</label>
                    <input type="text" placeholder="가입 시 사용한 전화번호를 010-0000-0000 형태로 작성해주세요." content="inputPn" value={inputPn} onChange={handleInputPn} />
                </div>
            </div>
            <button className="find-button" onClick={onClickFindID}>아이디(이메일)찾기</button>
        </div>
      )}
      {activeTab === '비밀번호 찾기' && (
        <div className="info">
          <p>🔒 비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</p>
          <p>🔑 본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.</p>
          <div className="form-container">
            <div className="form-row">
              <label>이름</label>
              <input type="text" />
            </div>
            <div className="form-row">
              <label>아이디(이메일)</label>
              <input value={inputEmail} type="text" placeholder="가입시 사용한 계정 이메일을 정확히 기입해주시길 바랍니다." onChange={handleInputEmail}/>
            </div>
          </div>
          <div className="method">
            <p>❗ 버튼 클릭 시 작성한 이메일로 비밀번호 변경 링크가 발송됩니다.</p>
          </div>
          <button className="find-button" onClick={sendResetPasswordEmail}>비밀번호 찾기</button>
        </div>
      )}
    </div>
  );
}

export default FindIDPW;
