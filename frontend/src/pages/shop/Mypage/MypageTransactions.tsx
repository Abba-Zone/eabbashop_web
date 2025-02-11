import { useCallback, useEffect, useState } from "react";
import { getMyHistoryList_s } from "../../../services/wallet";
import { MyHistoryList } from "../../../components";

const MypageTransiction:React.FC = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [history, setHistory] = useState<walletHistory[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
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
  return (
    <div>
      <h1>내 지갑</h1>
      <input onChange={changeStart} type="date" value={startDate}></input>
      <input onChange={changeEnd} type="date" value={endDate}></input>
      <MyHistoryList historys={history}></MyHistoryList>    
      {(lastPage!==pageNo)&&<button onClick={() => {setPageNo(pageNo + 1)}}>+더보기</button>}
    </div>
  );
}
  
export default MypageTransiction;