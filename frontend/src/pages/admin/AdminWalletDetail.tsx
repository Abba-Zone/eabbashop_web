import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdminHistoryDetail_s } from '../../services/wallet';
import { AdminHistoryDetailCharge, AdminHistoryDetailOrder, AdminHistoryDetailPoint, AdminHistoryDetailTransfer } from '../../components';
const AdminWalletDetail: React.FC = () => {
  const [historyInfo, setHistory] = useState<historyDetail>();
  const params = useParams<{id:string}>();
  const getHistoryDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const historyDetail : historyDetailReciever = await getAdminHistoryDetail_s(params.id);
        setHistory(historyDetail.list);
      }
    } catch (error) {
      console.error('Error fetching Wallet History Detail:', error);
    }
  }, [params.id]); ;
  useEffect(() => {
    getHistoryDetail(); // 비동기 함수 호출
  }, [getHistoryDetail]);
  if (!historyInfo) {
    return (
      <div>
        <h1>옳지않은 거래내역 입니다.</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>내역상세</h1>
      <AdminHistoryDetailPoint history={historyInfo}></AdminHistoryDetailPoint>
      <h3>내역 정보 보기</h3>
      {historyInfo.OrderDetailID && <AdminHistoryDetailOrder history={historyInfo}></AdminHistoryDetailOrder>}
      {historyInfo.ChargeRefundID && <AdminHistoryDetailCharge history={historyInfo}></AdminHistoryDetailCharge>}
      {historyInfo.TransferID && <AdminHistoryDetailTransfer history={historyInfo}></AdminHistoryDetailTransfer>}
    </div>
  );
};

export default AdminWalletDetail;
