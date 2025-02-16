import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHistoryDetail_s , requestCancel_s } from "../../../services/wallet";
import { HistoryDetailCharge, HistoryDetailOrder, HistoryDetailPoint, HistoryDetailTransfer } from "../../../components";

const MyPageTransactionDetail:React.FC = () => {
  const [historyInfo, setHistory] = useState<historyDetail | undefined>(undefined);
  const params = useParams<{id:string}>();
  const requestCancel = useCallback (async () => {
    const reponse = await requestCancel_s(historyInfo?.TransferID || "");
    console.log(reponse);
  }, [historyInfo]);

  const getHistoryDetail = useCallback (async () => {
      try {
        if (params.id !== undefined){
          const historyDetail : historyDetailReciever = await getHistoryDetail_s(params.id);
          setHistory(historyDetail.list);
        }
      } catch (error) {
        console.error('Error fetching history detail:', error);
      }
    }, [params.id]);
    useEffect(() => {
        getHistoryDetail(); // 비동기 함수 호출
    }, [getHistoryDetail]);
    if(!historyInfo){
      return(
        <div></div>
      )
    }
  return (
    <div>
      <h1>내역 상세</h1>
      {historyInfo.TransferID && <button onClick={requestCancel}>취소하기</button>}
      <HistoryDetailPoint history={historyInfo}></HistoryDetailPoint>
      <h3>내역 정보 보기</h3>
      {historyInfo.OrderDetailID && <HistoryDetailOrder history={historyInfo}></HistoryDetailOrder>}
      {historyInfo.ChargeRefundID && <HistoryDetailCharge history={historyInfo}></HistoryDetailCharge>}
      {historyInfo.TransferID && <HistoryDetailTransfer history={historyInfo}></HistoryDetailTransfer>}
    </div>
  );
}

export default MyPageTransactionDetail;
