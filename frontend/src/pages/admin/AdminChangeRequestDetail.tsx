import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getChargeRequestDetail_s } from '../../services/point';

const AdminChangeRequestDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const chargeRefundId = searchParams.get('chargeRefundId');
  const [chargeRequestDetail, setChargeRequestDetail] = useState<any>();

  console.log("chargeRefundId = ", chargeRequestDetail);

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

  const getChargeRequestDetail = async () => {
    try {
      const chargeRequestDetail : pointHistory = await getChargeRequestDetail_s(chargeRefundId || '');
      setChargeRequestDetail(chargeRequestDetail);
      console.log("chargeRequestDetail = ", chargeRequestDetail);

    } catch (error) {
      console.error('Error fetching transfer list:', error);
    }
  }

  const formatDate = () => {
    const dateTimeString = chargeRequestDetail?.createdDateTime;
    if (!dateTimeString) return '';  // 날짜가 없을 경우 빈 문자열 반환
    
    const [date] = dateTimeString.split('T');
    const time = dateTimeString.split('T')[1].split('.')[0].slice(0, 5);
    return `${date} ${time}`;
  };

  const renderName = (firstName: string, lastName: string, email: string) => {
    return `${lastName} ${firstName} (${email})`;
  }

  useEffect(() => {
    if (chargeRefundId) {
      getChargeRequestDetail();
    }
  }, [chargeRefundId]);


  return (
    <div>
      <h1>상세 내역</h1>
      <div>신청 ID: {chargeRefundId}</div>
      <div>신청자: {renderName(chargeRequestDetail?.sender.firstName, chargeRequestDetail?.sender.lastName, chargeRequestDetail?.sender.email)}</div>
      <div>신청 포인트 종류: {chargeRequestDetail?.type}</div>
      <div>신청 포인트 금액: {chargeRequestDetail?.point}</div>
      <div>신청 포인트 상태: {statusChange[chargeRequestDetail?.status as keyof typeof statusChange]}</div>
      <div>신청 포인트 생성일: {formatDate()}</div>
    </div>
  );
};

export default AdminChangeRequestDetail;