import React, { useState, useEffect } from 'react';
import './MypageProfile.css';
import { useNavigate } from 'react-router-dom';
import { getMemberDetailMe_s } from '../../services/member';
import { authEmail_s, checkAuthCode_s } from '../../services/member';
const MypageProfile:React.FC = () => {
  const [memberDetail, setMemberDetail] = useState<memberDetailInfo | null>(null);
  const [isOneSelf, setIsOneSelf] = useState<boolean>(false);
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [isSendingAuthCode, setIsSendingAuthCode] = useState<boolean>(false);
  const [inputAuthCode, setInputAuthCode] = useState<string>('');
  const [isChangeEmail, setIsChangeEmail] = useState<boolean>(false);
  const [isChangeName, setIsChangeName] = useState<boolean>(false);
  const [isChangePhone, setIsChangePhone] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleAuthCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAuthCode(event.target.value);
  }

  const handleModifyInfo = async () => {
    setIsChangeEmail(false);
    setIsChangeName(false);
    setIsChangePhone(false);
    setIsChangePassword(false);
    // await updateUserInfo_s(); 이 부분 경훈이한테 물어보고 수정해야함
  }

  useEffect(() => {
    const fetchMemberDetail = async () => {
      const memberDetail = await getMemberDetailMe_s();
      setMemberDetail(memberDetail);
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
    console.log(inputAuthCode);
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
              {isChangeEmail ? 
              <div className="mypageprofile-form-control">{memberDetail?.memberInfo.email} 
                <div className="mypageprofile-form-control-button" onClick={() => setIsChangeEmail(true)}>이메일 변경</div> 
              </div>
              : 
              <div className="mypageprofile-form-control">
                <input type="text" placeholder={memberDetail?.memberInfo.email}/>
                <div className="mypageprofile-form-control-button" onClick={handleModifyInfo}>이메일 변경</div>
              </div>
              }
          </div>
          <div className="mypageprofile-form-group">
            <label>이름</label>
            {isChangeName ? 
              <div className="mypageprofile-form-control">{memberDetail?.memberInfo.name} <div className="mypageprofile-form-control-button" onClick={() => setIsChangeName(true)}>개명하셨다면? 이름변경</div></div>
              : 
              <div className="mypageprofile-form-control">
                <input type="text" placeholder={memberDetail?.memberInfo.name}/>
                <div className="mypageprofile-form-control-button" onClick={handleModifyInfo}>이름 변경</div>
              </div>
            }
          </div>
          <div className="mypageprofile-form-group">
            <label>휴대폰 번호</label>
            {isChangePhone ? 
              <div className="mypageprofile-form-control">{memberDetail?.memberInfo.phone} <div className="mypageprofile-form-control-button" onClick={() => setIsChangePhone(true)}>휴대폰 번호 변경</div></div>
              : 
              <div className="mypageprofile-form-control">
                <input type="text" placeholder={memberDetail?.memberInfo.phone}/>
                <div className="mypageprofile-form-control-button" onClick={handleModifyInfo}>휴대폰 번호 변경</div>
              </div>
            }
          </div>
          <div className="mypageprofile-form-group">
            <label>비밀번호 변경</label>
            <input type="password" placeholder="현재 비밀번호" />
            <input type="password" placeholder="새 비밀번호" />
            <input type="password" placeholder="비밀번호 다시 입력" />
            <div className="mypageprofile-form-control-button" onClick={handleModifyInfo}>비밀번호 변경</div>
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