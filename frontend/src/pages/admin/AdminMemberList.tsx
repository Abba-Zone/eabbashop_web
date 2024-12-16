import React, { useCallback } from 'react';
import { useEffect, useState } from "react";
import { BottomButton, MemberList, SearchSet } from '../../components';
import { getMemberList_s } from '../../services/member';
import { useTranslation } from 'react-i18next';

const AdminMemberList: React.FC = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState<memberInfo[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("CreatedDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:t("AdminManagerMember:List.Filter01"), select:'name', selectType:'text', itemList:[]},
    {selectName:t("AdminManagerMember:List.Filter02"), select:'email', selectType:'text', itemList:[]},
    {selectName:t("AdminManagerMember:List.Filter03"), select:'phone', selectType:'text', itemList:[]},
    {selectName:t("AdminManagerMember:List.Filter04"), select:'recommend', selectType:'text', itemList:[]},
    {selectName:t("AdminManagerMember:List.Filter05"), select:'grade', selectType:'select', itemList:['Diamond', 'Gold', 'Platinum', 'Silver', 'Bronze']},
    {selectName:t("AdminManagerMember:List.Filter06"), select:'role', selectType:'select', itemList:[t("AdminManagerMember:List.Option6.Attribute01"), t("AdminManagerMember:List.Option6.Attribute02"), t("AdminManagerMember:List.Option6.Attribute03"), t("AdminManagerMember:List.Option6.Attribute04"), t("AdminManagerMember:List.Option6.Attribute05")]},
    {selectName:t("AdminManagerMember:List.Filter07"), select:'platform', selectType:'text', itemList:[]},
    {selectName:t("AdminManagerMember:List.Filter08"), select:'createdDateTime', selectType:'date', itemList:[]},
  ];
  const getMemberList = useCallback( async () => {
      try {
        const totalAndMemberList : memberList = await getMemberList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
        setMembers(totalAndMemberList.list);
        setLastPage(totalAndMemberList.totalCount === 0? 1:Math.floor((totalAndMemberList.totalCount - 1)/pageSize) + 1);
      } catch (error) {
        console.error('Error fetching memberlist:', error);
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
    getMemberList(); // 비동기 함수 호출
    }, [getMemberList]);

  return (
    <div>
      <h2>{t("AdminManagerMember:List.Title")}</h2>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <MemberList members={members} changeSort={changeSort}></MemberList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminMemberList;
