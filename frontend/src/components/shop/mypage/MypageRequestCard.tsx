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

const isCharge = (status: string) => {
  const chargeTypes = ["A", "C", "E", "G"];
  return chargeTypes.includes(status);

}

const MypageRequestCard:React.FC<Props> = ({ requests, handleCancel }) => {
  const formatDate = (dateTimeString: string) => {
    const [date] = dateTimeString.split('T');
    return date;
  };

  const getRequestType = (status: string) => {
    if (isCharge(status)) return '충전';
    if (!isCharge(status)) return '환불';
    return '';
  };

  return (
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
          <h3> {isCharge(request.status) ? '충전 금액: ' + request.amount : '환불 금액: ' + request.point}  {request.type}</h3>
          <div> 승인자 : {renderName(request.member.firstName, request.member.lastName, request.member.email)}</div>
          <div> 진행 상태 : <span style={{color: isCharge(request.status) ? 'green' : 'red'}}>{statusChange[request.status as keyof typeof statusChange]}</span></div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}> 
            <button style={{backgroundColor: 'red'}} onClick={() => handleCancel(request.chargeRefundID)}>취소</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MypageRequestCard;