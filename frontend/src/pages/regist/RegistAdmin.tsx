import React, { useState, useEffect } from "react";
import "./RegistAdmin.css";
import { requestAdmin_s, requestAdminList_s, checkRecommendEmail_s, requestAdminAuto_s } from "../../services/member";

const Cookies = require('js-cookie');

const RegistAdmin: React.FC = () => {
  const [adminList, setAdminList] = useState<requestAdminRegistList | null>(null);
  const [showReferralQuestions, setShowReferralQuestions] = useState<boolean[]>([false, false, false]);
  const [inputRm, setInputRecommend] = useState<string>('');
  const [errors, setErrors] = useState({
    recommend: ''
  });
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [recommendStatus, setRecommendStatus] = useState<number | null>(null);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const isLogined = (): boolean => {
    if (Cookies.get('access-token') === undefined) {
      alert('로그인 후 이용해주세요.');
      window.location.href = '/login';
      return false;
    }
    return true;
  }
  
  const requestAdmin = async (adminList: requestAdminRegistList | null, refferedID: string, requestRole: string) => {
    if (requestRole === 'B') {
      console.log('자동');
      if (adminList?.totalCount === 0) {
        console.log(refferedID);
        const response = await requestAdminAuto_s(refferedID); // 등급에 따른 추천 분할된 API로 변경하면서 requestRole 사용하기
        console.log(response);
        if (response) {
          window.location.reload();
        }
      }
    } else {
      console.log('요청');
      if (adminList?.totalCount === 0) {
        const response = await requestAdmin_s(requestRole, refferedID); // 등급에 따른 추천 분할된 API로 변경하면서 requestRole 사용하기
        console.log(response);
        if (response) {
          window.location.reload();
        }
      } else {
        if (isLogined()) {
          alert('대리점 요청처리 중입니다. abbazon@gmail.com으로 문의해주세요.');
        }
      }
    }
  };
  
  useEffect(() => {
    const fetchAdminList = async () => {
      try {
        if (isLogined()) {
          const list = await requestAdminList_s();
          setAdminList(list);
        }
      } catch (error) {
        console.error('Failed to fetch admin list:', error);
      }
    };

    fetchAdminList();
  }, []);

  const handleRequestClick = (index: number) => {
    const updatedQuestions = [...showReferralQuestions];
    updatedQuestions[index] = true;
    setShowReferralQuestions(updatedQuestions);
  };

  const handleReferralResponse = async (index: number) => {
    const requestRole = (() => {
      switch (index) {
        case 0:
          return 'B';
        case 1:
          return 'C';
        case 2:
          return 'D';
        default:
          return '';
      }
    })();
    if(isAccepted) {
      setInputRecommend('');
      setRecommendStatus(null);
      setIsAccepted(false);
      const updatedQuestions = [...showReferralQuestions];
      updatedQuestions[index] = false;
      setShowReferralQuestions(updatedQuestions);
      alert('추천인이 변경되었습니다.');
      const response = await requestAdmin(adminList, inputRm, requestRole);
      console.log(response);
    } else {
      alert('추천인 확인을 진행해주세요.');
    }
  }

  const handleReferralReject = (index: number) => {
    setInputRecommend('');
    setRecommendStatus(null);
    setIsAccepted(false);
    setIsRequesting(false);
    const updatedQuestions = [...showReferralQuestions];
    updatedQuestions[index] = false;
    setShowReferralQuestions(updatedQuestions);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputRm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const recommendValue = event.target.value;
    setInputRecommend(recommendValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      recommend: validateEmail(recommendValue) ? '' : '추천인 이메일 형식이 올바르지 않습니다.'
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

  return (
    <div className="regist-admin-container">
      <div className="logo-container">
        <img alt="Logo" />
      </div>
      <h1>AbbaFamily가 되어보세요!</h1>
      <div className="regist-admin-list">
        <h2>신청 내역</h2>
        {adminList ? (
          adminList.totalCount > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Created Time</th>
                </tr>
              </thead>
              <tbody>
                {adminList.list.map((admin, index) => (
                  <tr key={index}>
                    <td>{admin.status_value}</td>
                    <td>{admin.created_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>신청 내역이 없습니다.</p>
          )
        ) : (
          <p>신청 내역을 불러오는 중입니다.</p>
        )}
      </div>
      <div className="plans-container">
        <div className="plans-container-header">
          <h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18.5656 7.6415L16.4044 5.4276C16.2111 5.21675 15.9388 5.11133 15.6577 5.11133H8.62064C8.04081 5.11133 7.56641 5.58573 7.56641 6.16557V21.7595C7.56641 22.3393 8.04081 22.8137 8.62064 22.8137H19.8922C20.472 22.8137 20.9464 22.3393 20.9464 21.7595V10.4879C20.9464 10.2156 20.841 9.95203 20.6565 9.75876L18.5744 7.6415H18.5656Z" fill="#13C097"></path>
            </svg>
            대리점 신청 요금제
          </h1>
        </div>
        {['판매점', '대리점', '지점'].map((plan, index) => {
          const planIndex = String.fromCharCode(66 + index);
          return (
            <div className="plan-card" key={planIndex}>
              <img src={require(`../../static/img/lv${index + 1}.png`)} alt={plan} />
              <h2>{plan}</h2>
              <p>월 평균 수익: {planIndex === 'B' ? '42.5' : planIndex === 'C' ? '170' : '340'} 만원/월</p>
              <p>등록 비용: {planIndex === 'B' ? '300' : planIndex === 'C' ? '500' : '700'} ABZ</p>
              {!isRequesting ? (
                <button onClick={() => {
                  setIsRequesting(true);
                  handleRequestClick(index);
                }}>신청하기</button>
              ) : (
                <div>
                  {showReferralQuestions[index] && (
                    <div className="referral-question">
                      <div className="referral-question-container">추천인을 변경하시겠습니까?</div>
                      <div className="referral-question-subtext"> 변경을 원치 않으시면 비워두세요.</div>
                      <input type="text" placeholder="추천인 이름을 입력해주세요." value={inputRm} onChange={handleInputRm} disabled={isAccepted}/>
                      <div className="referral-question-form-button-container">
                        {recommendStatus === 200 && (
                          <div className="referral-question-form-success-container">
                            <div className="referral-question-form-success">
                              유효한 추천인 입니다.
                            </div>
                            {
                              isAccepted ? (
                                <button onClick={() => {
                                  setIsAccepted(false);
                                }}>취소</button>
                              ) : (
                                <button onClick={() => {
                                  setIsAccepted(true);
                                }}>확인</button>
                              )
                            }
                          </div>
                        )}
                        {recommendStatus === 204 && (
                          <div className="referral-question-form-error">
                            추천인 이메일이 존재하지 않습니다.
                          </div>
                        )}
                      </div>  
                      <div className="referral-question-button-container">
                        <button onClick={() => handleReferralResponse(index)}>신청완료</button>
                        <button onClick={() => handleReferralReject(index)}>취소</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistAdmin;
