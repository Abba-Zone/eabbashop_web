import React, { useCallback, useEffect, useState } from 'react';
import { AdminDonationList, BottomButton, SearchSet } from '../../components';
import { getDonationList_s } from '../../services/donation';
import { useTranslation } from 'react-i18next';

const AdminDonation: React.FC = () => {
  const { t } = useTranslation();
  const [donations, setDonations] = useState<donation[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminDonation:List.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminDonation:List.Filter02"), select:'money', selectType:'text', itemList:[]},
    {selectName:t("AdminDonation:List.Filter03"), select:'type', selectType:'text', itemList:[]},
    {selectName:t("AdminDonation:List.Filter04"), select:'accumulation', selectType:'text', itemList:[]},
    {selectName:t("AdminDonation:List.Filter05"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];

  const getDonationList = useCallback (async () => {
    try {
      const totalAndDonationList : donationList = await getDonationList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
      setDonations(totalAndDonationList.list);
      setLastPage(totalAndDonationList.totalCount === 0? 1:Math.floor((totalAndDonationList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching donation list:', error);
    }
  },[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
      setPageNo(move);
  }
  const changeSort = (sortName:string) => {
    if (sortName === sort){
      if(sortValue ==='ASC')
        setSortValue('DESC')
      else
      setSortValue('ASC')
    } else {
      setSort(sortName);
      setSortValue('ASC');
    }
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    setFilterValue(value);
  }

  useEffect(() => {
    getDonationList(); // 비동기 함수 호출
  }, [getDonationList]);

  return (
    <div>
      <h1>{t("AdminDonation:List.Title")}</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <AdminDonationList donations={donations} changeSort={changeSort}></AdminDonationList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminDonation;
