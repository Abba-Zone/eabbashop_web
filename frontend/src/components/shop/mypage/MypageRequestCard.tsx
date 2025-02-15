import React, { useState } from 'react';

interface Props {
  requests: pointHistory;
  handleCancel: (chargeRefundID: string) => void;
}

const statusChange = {
  A: '충전 신청',
  B: '환급 신청',
  C: '충전 신청 취소',
  D: '환급 신청 취소',
  E: '충전 처리 완료',
  F: '환급 처리 완료',
  G: '충전 처리 거절',
  H: '환급 처리 거절',
}

const renderName = (firstName: string, lastName: string, email: string) => {
  return `${lastName} ${firstName} (${email})`;
}

const typeChanger = (type: string) => {
  console.log("typeChanger type = ", type);
  if(type === 'LP')
    return 'AW';
  else if(type === 'SP')
    return 'AP';
  return '';
}

const isCharge = (status: string) => {
  const chargeTypes = ["A", "C", "E", "G"];
  return chargeTypes.includes(status);
}

const isAbleCancel = (status: string) => {
  const chargeTypes = ['A', 'B'];
  return chargeTypes.includes(status);
}

const MypageRequestCard:React.FC<Props> = ({ requests, handleCancel }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const formatDate = (dateTimeString: string) => {
    const [date] = dateTimeString.split('T');
    return date;
  };

  const getRequestType = (status: string) => {
    if (isCharge(status)) return '충전';
    if (!isCharge(status)) return '환급';
    return '';
  };

  const handleCancelClick = (chargeRefundID: string) => {
    setSelectedId(chargeRefundID);
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    handleCancel(selectedId);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div>
        {requests.list.map((request) => (
          <div 
            key={request.chargeRefundID}
            style={{
              backgroundColor: '#f0f0f0', 
              padding: '10px', 
              borderRadius: '10px', 
              marginBlock: '10px'
            }}
          >
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h1> {getRequestType(request.status)}</h1>
              <h3> {formatDate(request.createdDateTime)}</h3>
            </div>
            <h3> {isCharge(request.status) ? '충전 금액: ' + request.amount : '환급 금액: ' + request.point}  {typeChanger(request.type)}</h3>
            <div> 승인자 : {renderName(request.member.firstName, request.member.lastName, request.member.email)}</div>
            <div> 진행 상태 : <span style={{color: isCharge(request.status) ? 'green' : 'red'}}>{statusChange[request.status as keyof typeof statusChange]}</span></div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}> 
              {isAbleCancel(request.status) && (
                <button style={{backgroundColor: 'red'}} 
                onClick={() => handleCancelClick(request.chargeRefundID)}>취소</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px'
          }}>
            <h3>정말 취소하시겠습니까?</h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleConfirmCancel}>확인</button>
              <button onClick={() => setShowConfirmModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MypageRequestCard;