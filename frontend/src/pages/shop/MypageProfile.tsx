import React, { useState, useEffect } from 'react';
import './MypageProfile.css';
import { useNavigate } from 'react-router-dom';
import { getMemberDetailMe_s, sendResetPasswordEmail_s, authEmail_s, checkAuthCode_s, updateUserData_s } from '../../services/member';
const MypageProfile:React.FC = () => {
  const [memberDetail, setMemberDetail] = useState<memberDetailInfo | null>(null);
  const [isOneSelf, setIsOneSelf] = useState<boolean>(false);
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [isSendingAuthCode, setIsSendingAuthCode] = useState<boolean>(false);
  const [inputAuthCode, setInputAuthCode] = useState<string>('');
  const [isChangeFirstName, setIsChangeFirstName] = useState<boolean>(false);
  const [isChangeLastName, setIsChangeLastName] = useState<boolean>(false);
  const [isChangePhone, setIsChangePhone] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [inputFirstName, setInputFirstName] = useState<string>('');
  const [inputLastName, setInputLastName] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const navigate = useNavigate();
  const Cookies = require('js-cookie');
  const handleAuthCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAuthCode(event.target.value);
  }

  const handleInputFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChangeLastName(false);
    setIsChangePhone(false);
    setInputFirstName(event.target.value);
  }

  const handleInputLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChangeFirstName(false);
    setIsChangePhone(false);
    setInputLastName(event.target.value);
  }

  const handleInputPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChangeFirstName(false);
    setIsChangeLastName(false);
    setInputPhone(event.target.value);
  }

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  }

  const changeFirstName = async () => {
    const updateUserInfo = {
      firstName : inputFirstName,
      lastName : memberDetail?.memberInfo.lastName || '',
      phone : memberDetail?.memberInfo.phone || '',
      email : memberDetail?.memberInfo.email || '',
    }
    const response = await updateUserData_s(updateUserInfo);
    if (response) {
      alert('성 변경 완료');
    }
    setIsChangeFirstName(false);
    const updatedMemberDetail = await getMemberDetailMe_s();
    setMemberDetail(updatedMemberDetail);
  }

  const changeLastName = async () => {
    const updateUserInfo = {
      firstName : memberDetail?.memberInfo.firstName || '',
      lastName : inputLastName,
      phone : memberDetail?.memberInfo.phone || '',
      email : memberDetail?.memberInfo.email || '',
    }
    const response = await updateUserData_s(updateUserInfo);
    if (response) {
      alert('이름 변경 완료');
    }
    setIsChangeLastName(false);
    const updatedMemberDetail = await getMemberDetailMe_s();
    setMemberDetail(updatedMemberDetail);
  }

  const changePhone = async () => {
    const updateUserInfo = {
      firstName : memberDetail?.memberInfo.firstName || '',
      lastName : memberDetail?.memberInfo.lastName || '',
      phone : inputPhone,
      email : memberDetail?.memberInfo.email || '',
    }
    const response = await updateUserData_s(updateUserInfo);
    if (response) {
      alert('휴대폰 번호 변경 완료');
    }
    setIsChangePhone(false);
    const updatedMemberDetail = await getMemberDetailMe_s();
    setMemberDetail(updatedMemberDetail);
  }

  const sendResetPasswordEmail = async () => {
    const response = await sendResetPasswordEmail_s(memberDetail?.memberInfo.email || '');
    console.log(response);
    if (response) {
      alert('비밀번호 변경 이메일 발송 완료');
    } else {
      alert('비밀번호 변경 이메일 발송 실패');
    }
  }

  useEffect(() => {
    const fetchMemberDetail = async () => {
      const memberDetail = await getMemberDetailMe_s();
      setMemberDetail(memberDetail);
      Cookies.set('email', memberDetail?.memberInfo.email || '');
    };
    fetchMemberDetail();
  }, []);

  const sendAuthCode = async () => {
    if (isSendingAuthCode) return; // 이미 요청 중이면 중복 요청 방지

    setIsSendingAuthCode(true); // 요청 시작
    try {
      const authCode = await authEmail_s(memberDetail?.memberInfo.email || '');
      if (authCode) {
        alert('인증메일 발송 완료');
        setIsSendEmail(true);
      } else {
        alert('인증메일 발송 실패');
      }
    } catch (error) {
      alert('인증메일 발송 실패');
    } finally {
      setIsSendingAuthCode(false);
    }
  };

  const handleGoDashboard = () => {
    navigate('/mypage');
  }

  const emailAuthCheck = async () => {
    const reponse = await checkAuthCode_s(memberDetail?.memberInfo.email || '', inputAuthCode);
    const reponseStatus = reponse.status;
    if (reponseStatus === 216) {
      alert('인증 코드 불일치');
    } else if (reponseStatus === 200) {
      alert('인증 완료');
      setIsOneSelf(true);
    }
  }

  return (
    isOneSelf ?
    <div className="mypage-container">
      <header className="mypage-header">
        <h1>회원정보 수정</h1>
      </header>
      <div className="mypageprofile-content">
        <div className="mypageprofile-form">
          <div className="mypageprofile-form-group">
            <label>아이디(이메일)</label>
              <div className="mypageprofile-form-control">
                {memberDetail?.memberInfo.email} 
            </div>
          </div>
          <div className="mypageprofile-form-group">
            <label>성</label>
            {!isChangeFirstName ? 
              <div className="mypageprofile-form-control">{memberDetail?.memberInfo.firstName} <div className="mypageprofile-form-control-button" onClick={() => {setIsChangeFirstName(true); setIsChangeLastName(false); setIsChangePhone(false);}}>성 변경</div></div>
              : 
              <div className="mypageprofile-form-control">
                <input type="text" placeholder={memberDetail?.memberInfo.firstName} onChange={handleInputFirstName}/>
                <div className="mypageprofile-form-control-button" onClick={changeFirstName}>확인</div>
              </div>
            }
            <label>이름</label>
            {!isChangeLastName ? 
              <div className="mypageprofile-form-control">{memberDetail?.memberInfo.lastName} <div className="mypageprofile-form-control-button" onClick={() => {setIsChangeLastName(true); setIsChangeFirstName(false); setIsChangePhone(false);}}>이름 변경</div></div>
              : 
              <div className="mypageprofile-form-control">
                <input type="text" placeholder={memberDetail?.memberInfo.lastName} onChange={handleInputLastName}/>
                <div className="mypageprofile-form-control-button" onClick={changeLastName}>확인</div>
              </div>
            }
          </div>
          <div className="mypageprofile-form-group">
            <label>휴대폰 번호</label>
            {!isChangePhone ? 
              <div className="mypageprofile-form-control">{memberDetail?.memberInfo.phone} <div className="mypageprofile-form-control-button" onClick={() => {setIsChangePhone(true); setIsChangeFirstName(false); setIsChangeLastName(false);}}>휴대폰 번호 변경</div></div>
              : 
              <div className="mypageprofile-form-control">
                <input type="text" placeholder={memberDetail?.memberInfo.phone} onChange={handleInputPhone}/>
                <div className="mypageprofile-form-control-button" onClick={changePhone}>확인</div>
              </div>
            }
          </div>
          <div className="mypageprofile-form-group">
            <label>비밀번호 변경</label>
            <div>🔒 비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</div>
            <div>🔑 본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.</div>
            <div className="mypageprofile-form-control-button" onClick={sendResetPasswordEmail}>변경 이메일 보내기</div>
          </div>
          <div className="mypageprofile-form-group">
            <label>배송지</label>
            <div className="mypageprofile-form-control">배송지 주소 관리는 [배송지 관리]에서 수정, 등록 합니다.</div>
          </div>
          <button className="mypageprofile-submit-button" onClick={handleGoDashboard}>나가기</button>
        </div>
      </div>
    </div>
    :
    <div>
      <h1>본인 확인</h1>
      <div>개인 정보 확인을 위해서는 이메일 인증이 필요합니다.</div>
      <div>
        <div>
          <div>이메일: {memberDetail?.memberInfo.email}</div>
          <button onClick={sendAuthCode}>인증메일 발송</button>
          {isSendEmail && 
            <div>
              <input type="text" placeholder="인증번호" value={inputAuthCode} onChange={handleAuthCodeInput} />
              <button onClick={emailAuthCheck}>인증번호 확인</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MypageProfile;