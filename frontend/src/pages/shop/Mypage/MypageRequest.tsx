import { useCallback, useEffect, useState } from "react";
import { BottomButton } from "../../../components";
import MypageRequestCard from "../../../components/shop/mypage/MypageRequestCard";
import MypageRequestRegistModal from "../../../components/shop/mypage/MypageRequestRegistModal";
import { requestChargePoint_s, requestRefundPoint_s, getPointHistoryRequestMe_s, cancelChargeRefund_s } from "../../../services/point";
import { getAccountList_s } from "../../../services/account";
import { getLineList_s } from "../../../services/member";

const MypageRequest:React.FC = () => {
  const [accounts, setAccounts] = useState<accountList>({ totalCount: 0, list: [] });
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize] = useState<number>(5);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'charge' | 'refund' | 'refundUSD'>('charge');
  const [currentTab, setCurrentTab] = useState<'ALL' | 'CHARGE' | 'REFUND' | 'WITHDRAW'>('ALL');
  const [requests, setRequests] = useState<pointHistory>({ totalCount: 0, list: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [lineList, setLineList] = useState<lineList>({ totalCount: 0, list: [] });
  const [refresh, setRefresh] = useState<boolean>(false);
  
  const getLineList = useCallback(async () => {
    const response = await getLineList_s();
    setLineList(response);
  }, []);

  const handlePointRequest = (type: 'charge' | 'refund' | 'refundUSD') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const changeType = (type: string): string[] | null => {
    switch (type) {
      case 'ALL': 
        return null; 
      case 'CHARGE': 
        return ['A'];
      case 'REFUND': 
        return ['B'];
      default: 
        return null;
    }
  }

  const fetchPointHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const statusList = changeType(currentTab);
      const response = await getPointHistoryRequestMe_s(
        pageNo,
        pageSize,
        statusList ? 'status' : '',
        statusList ? statusList.join(',') : '',
        '',
        ''
      );
      setRequests(response);
    console.log(response);

      setLastPage(response.totalCount === 0 ? 1 : Math.floor((response.totalCount - 1)/pageSize) + 1);
    } finally {
      setIsLoading(false);
    }
  }, [currentTab, pageNo, pageSize]);

  useEffect(() => {
    fetchPointHistory();
  }, [fetchPointHistory, refresh]);

  useEffect(() => {
    setPageNo(0);
  }, [currentTab]);

  const handleSubmit = async (data: any) => {
    try {
      if (modalType === 'charge') {
        await requestChargePoint_s({
          pointType: data.pointType,
          amount: data.amount,
          parentID: data.parentID,
          code: "KRW"
        });
      } else if (modalType === 'refund') {
        await requestRefundPoint_s({
          pointType: data.pointType,
          point: data.point,
          accountID: data.accountID,
          parentID: data.parentID,
          code: "KRW"
        });
      } else if (modalType === 'refundUSD') {
        await requestRefundPoint_s({
          pointType: data.pointType,
          point: data.point,
          accountID: data.accountID,
          parentID: data.parentID,
          code: "USD"
        });
      }
      setIsModalOpen(false);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error('API action failed:', error);
    }
  };

  const getBoardList = useCallback (async () => {
  },[]);

  const handleCancel = async (chargeRefundID: string) => {
    try {
      await cancelChargeRefund_s(chargeRefundID);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error('Cancel failed:', error);
    }
  }

  const changePage = (move:number) => {
    setPageNo(move - 1);
  }

  useEffect(() => {
    getBoardList();
    getLineList();
  }, [getBoardList, getLineList]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await getAccountList_s();
      setAccounts(response);
    };
    fetchAccounts();
  }, []);
  
  if (isLoading) {
    return (
      <div>
        <h1>신청 내역</h1>
        <div>
          <button onClick={() => setCurrentTab('ALL')}>전체</button>
          <button onClick={() => setCurrentTab('CHARGE')}>충전</button>
          <button onClick={() => setCurrentTab('REFUND')}>환급</button>
        </div>
        {[1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index}
            style={{
              background: '#f0f0f0',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          >
            <div 
              style={{
                height: '20px',
                background: '#e0e0e0',
                width: '60%',
                marginBottom: '8px',
                borderRadius: '4px'
              }}
            />
            <div 
              style={{
                height: '16px',
                background: '#e0e0e0',
                width: '40%',
                borderRadius: '4px'
              }}
            />
          </div>
        ))}
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div>
      <h1>신청 내역</h1>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
        <button onClick={() => setCurrentTab('ALL')}>전체</button>
        <button onClick={() => setCurrentTab('CHARGE')}>충전</button>
        <button onClick={() => setCurrentTab('REFUND')}>환급</button>
        </div>
        <div>
          <button onClick={() => handlePointRequest('charge')}>충전 신청</button>
          <button onClick={() => handlePointRequest('refund')}>환급 신청</button>
          <button style={{backgroundColor: 'gold', borderRadius: '10px', marginBlock: '10px'}} onClick={() => handlePointRequest('refundUSD')}>환급 신청($)</button>
        </div>
      </div>
      <MypageRequestCard requests={requests} handleCancel={handleCancel}/>
      <BottomButton 
        lastPage={lastPage} 
        nowPage={pageNo + 1}
        changePage={changePage}
      />
      <MypageRequestRegistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type={modalType}
        accounts={accounts}
        lineList={lineList}
        isCharge={modalType === 'charge'}
      />
    </div>
  );
}

export default MypageRequest;