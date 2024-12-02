import React from 'react';
import { useEffect, useState } from "react";
import { BottomButton, MemberList, SearchSet } from '../../components';
import { getMemberList_s } from '../../services/member';

const AdminMemberList: React.FC = () => {
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
    {selectName:'이름', select:'name', selectType:'text', itemList:[]},
    {selectName:'이메일', select:'email', selectType:'text', itemList:[]},
    {selectName:'전화번호', select:'phone', selectType:'text', itemList:[]},
    {selectName:'추천인', select:'recommend', selectType:'text', itemList:[]},
    {selectName:'등급', select:'grade', selectType:'select', itemList:['Diamond', 'Gold', 'Platinum', 'Silver', 'Bronze']},
    {selectName:'역할', select:'role', selectType:'select', itemList:['협력사', '지점', '대리점', '판매점']},
    {selectName:'최초가입지', select:'signupPage', selectType:'text', itemList:[]},
    {selectName:'가입일', select:'CreatedDateTime', selectType:'date', itemList:[]},
  ];
  
  const getUserList = async () => {
      try {
        const total_and_memberList : memberList = await getMemberList_s(pageNo, pageSize, filter, filterValue, sort, sortValue);
        setMembers(total_and_memberList.info);
        setLastPage(total_and_memberList.totalMember === 0? 1:Math.floor((total_and_memberList.totalMember - 1)/pageSize) + 1);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
  };
  const changePage = (move:string) =>{
    switch (move) {
      case "next":
        setPageNo(pageNo + 1);
        break;
      case "pre":
        setPageNo(pageNo - 1);
        break;
      case "last":
        setPageNo(lastPage);
        break;
      case "first":
        setPageNo(1);
        break;
      default:
        setPageNo(parseInt(move));
        break;
    }
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
      getUserList(); // 비동기 함수 호출
    }, [pageNo, pageSize, filter, filterValue, sort, sortValue]);

  return (
    <div>
      <h2>고객 관리</h2>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <MemberList members={members} changeSort={changeSort}></MemberList>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminMemberList;
