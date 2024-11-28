import React from 'react';
import { useEffect, useState } from "react";
import { BottomButton, SearchSet } from '../../components';
import { getMemberList_s } from '../../services/member';

const AdminMemberList: React.FC = () => {
  const [members, setMembers] = useState<memberInfo[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const getUserList = async () => {
      try {
        const total_and_memberList : memberList = await getMemberList_s(pageNo, pageSize, filter, filterValue);
        setMembers(total_and_memberList.info);
        setLastPage(total_and_memberList.totalMember === 0? 1:Math.floor((total_and_memberList.totalMember - 1)/pageSize) + 1);
        // const tempUsers = await getUserList_s(); // 비동기 호출
        // setUsers(tempUsers);
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
    console.log('pageNo=' + pageNo + ', lastPage=' + lastPage + ', move=' + move);
  }
  
  useEffect(() => {
      getUserList(); // 비동기 함수 호출
    }, [pageNo, filter, filterValue]);
  return (
    <div>
      <SearchSet></SearchSet>
      <h1>AdminMemberList</h1>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminMemberList;
