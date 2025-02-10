import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMemberDetail_s } from '../../services/member';
import { useTranslation } from 'react-i18next';
import { BottomButton, SearchSet } from '../../components';
import { getHistoryList_s } from '../../services/wallet';
const AdminWalletHistory: React.FC = () => {
  const { t } = useTranslation();
  const [member, setMember] = useState<memberDetail | undefined>(undefined);
  const [wallet, setWallet] = useState<wallet | undefined>(undefined);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
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
  const params = useParams<{id:string}>();
  const getMemberDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const memberDetail : memberDetailInfo = await getMemberDetail_s(params.id);
        setMember(memberDetail.memberInfo);
        setWallet(memberDetail.wallet);
      }
    } catch (error) {
      console.error('Error fetching memberDetail:', error);
    }
  }, [params.id]);
  const getWalletHistoryList = useCallback( async () => {
        try {
          if (params.id !== undefined){
            const totalAndHistoryList : historyAdminList = await getHistoryList_s(pageNo - 1, pageSize, startDate, endDate, params.id);
            console.log(totalAndHistoryList);
          // setMembers(totalAndMemberList.list);
          setLastPage(totalAndHistoryList.totalCount === 0? 1:Math.floor((totalAndHistoryList.totalCount - 1)/pageSize) + 1);
          }
        } catch (error) {
          console.error('Error fetching walletHistorylist:', error);
        }
    },[pageNo, pageSize, startDate, endDate]);
  const changePage = (move:number) =>{
    setPageNo(move);
  }
  const changeStart = (event:React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  }
  const changeEnd = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  }
  useEffect(() => {
    getMemberDetail();
    getWalletHistoryList();
  }, [getMemberDetail, getWalletHistoryList]);
  if (!member || !wallet ) {
    return (
      <div>
        <h1>{t("AdminManagerMember:Detail.Option.Attribute00")}</h1>
      </div>
    );
  }
  return (
  <div>
  <h1>{member.firstName + ' ' + member.lastName} 의 지갑 내역</h1>
  <select name="pageSize" value={pageSize} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setPageNo(1);setPageSize(Number(event.target.value))}}>
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={30}>30</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
  </select><span>개씩 보기</span>
  <input onChange={changeStart} type="date" value={startDate}></input>
  <input onChange={changeEnd} type="date" value={endDate}></input>
  {/* <WalletMemberList members={members} changeSort={changeSort}></WalletMemberList> */}
  <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
  </div>
  );
};

export default AdminWalletHistory;
