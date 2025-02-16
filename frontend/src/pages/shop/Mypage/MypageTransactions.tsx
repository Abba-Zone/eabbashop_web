import { useCallback, useEffect, useState } from "react";
import { getMyHistoryList_s } from "../../../services/wallet";
import { MyHistoryList } from "../../../components";

const MypageTransiction:React.FC = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [history, setHistory] = useState<walletHistory[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({
    receiver: '',
    LP: '',
    AP: '',
    ABZ: '',
    message: ''
  });
  const pageSize = 10;
  const [startDate, setStartDate] = useState<string>(() => { 
      const date = new Date(2024, 0, 1);
      const formattedDate:string = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      return formattedDate
    });
    const [endDate, setEndDate] = useState<string>(() => { 
      const date = new Date();
      const formattedDate:string = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      return formattedDate;
    });
  const getWalletHistoryList = useCallback( async () => {
    try {
        const totalAndHistoryList : historyList = await getMyHistoryList_s(pageNo - 1, pageSize, startDate, endDate);
        setHistory([...history, ...totalAndHistoryList.list]);
        setLastPage(totalAndHistoryList.totalCount === 0? 1:Math.floor((totalAndHistoryList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching walletHistorylist:', error);
    }
  },[pageNo, startDate, endDate]);
  const changeStart = (event:React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
    setHistory([]);
  }
  const changeEnd = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    setHistory([]);
  }
  useEffect(() => {
    getWalletHistoryList();
  }, [getWalletHistoryList]);

  const handleTransferClick = () => {
    setShowTransferModal(true);
  };

  const handleTransferSubmit = async () => {
    // TODO: 이체 API 호출
    console.log('Transfer data:', transferData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowTransferModal(false);
    setTransferData({
      receiver: '',
      LP: '',
      AP: '',
      ABZ: '',
      message: ''
    });
  };

  useEffect(() => {
    if (!showTransferModal) {
      setTransferData({
        receiver: '',
        LP: '',
        AP: '',
        ABZ: '',
        message: ''
      });
    }
  }, [showTransferModal]);

  return (
    <div>
      <h1>내 지갑</h1>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div> 
          <input onChange={changeStart} type="date" value={startDate}></input>
          <input onChange={changeEnd} type="date" value={endDate}></input>
        </div>
        <div> 
          <button onClick={handleTransferClick}>이체하기</button>
        </div>
      </div>
      <MyHistoryList historys={history}></MyHistoryList>    
      {(lastPage!==pageNo)&&<button onClick={() => {setPageNo(pageNo + 1)}}>+더보기</button>}

      {showTransferModal && (
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
            width: '400px'
          }}>
            <h3>이체하기</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <div>
                <label>받는 사람: </label>
                <input 
                  type="text" 
                  value={transferData.receiver}
                  onChange={(e) => setTransferData({...transferData, receiver: e.target.value})}
                />
              </div>
              <div>
                <label>AW: </label>
                <input 
                  type="text"
                  value={transferData.LP}
                  onChange={(e) => setTransferData({...transferData, LP: e.target.value})}
                  min="0"
                />
              </div>
              <div>
                <label>AP: </label>
                <input 
                  type="text"
                  value={transferData.AP}
                  onChange={(e) => setTransferData({...transferData, AP: e.target.value})}
                  min="0"
                />
              </div>
              <div>
                <label>ABZ: </label>
                <input 
                  type="text"
                  value={transferData.ABZ}
                  onChange={(e) => setTransferData({...transferData, ABZ: e.target.value})}
                  min="0"
                />
              </div>
              <div>
                <label>메시지: </label>
                <textarea 
                  value={transferData.message}
                  onChange={(e) => setTransferData({...transferData, message: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={handleTransferSubmit}>이체</button>
              <button onClick={handleCloseModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  
export default MypageTransiction;