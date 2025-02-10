import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdminHistoryDetail_s } from '../../services/wallet';
import { AdminHistoryDetailCharge, AdminHistoryDetailOrder, AdminHistoryDetailPoint, AdminHistoryDetailTransfer } from '../../components';
const AdminWalletDetail: React.FC = () => {
  const [history, setHistory] = useState<adminHistoryDetail>();
  // const [wallet, setWallet] = useState<wallet | undefined>(undefined);
  // const [address, setAddress] = useState<addressAllInfo[]>([]);
  // const [seller, setSeller] = useState<seller | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getHistoryDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const historyDetail : adminHistoryDetailReciever = await getAdminHistoryDetail_s(params.id);
        setHistory(historyDetail.list);
      }
    } catch (error) {
      console.error('Error fetching Wallet History Detail:', error);
    }
  }, [params.id]); ;
  useEffect(() => {
    getHistoryDetail(); // 비동기 함수 호출
  }, [getHistoryDetail]);
  if (!history) {
    return (
      <div>
        <h1>옳지않은 거래내역 입니다.</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>내역상세</h1>
      <AdminHistoryDetailPoint history={history}></AdminHistoryDetailPoint>
      <h3>내역 정보 보기</h3>
      {history.OrderDetailID && <AdminHistoryDetailOrder history={history}></AdminHistoryDetailOrder>}
      {history.ChargeRefundID && <AdminHistoryDetailCharge history={history}></AdminHistoryDetailCharge>}
      {history.TransferID && <AdminHistoryDetailTransfer history={history}></AdminHistoryDetailTransfer>}
    </div>
  );
};

export default AdminWalletDetail;
