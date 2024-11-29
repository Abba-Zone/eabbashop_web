import { useEffect, useState } from "react";
import ListCard from "./MemberListCard";
interface Props{
    members:memberInfo[],
    changeSort(sortName:string):void,
}

const MemberList:React.FC<Props> = ({members, changeSort}) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < members.length; i++){
          result.push(<ListCard member={members[i]} ></ListCard>);
        }
        return result;
    }
    const makeheader = (): JSX.Element => {
      const result = 
      <tr>
        <th>선택</th>
        <th onClick={()=>{changeSort('name')}}>이름</th>
        <th onClick={()=>{changeSort('email')}}>이메일</th>
        <th onClick={()=>{changeSort('phone')}}>전화번호</th>
        <th onClick={()=>{changeSort('recommend')}}>추천인</th>
        <th onClick={()=>{changeSort('grade')}}>등급</th>
        <th onClick={()=>{changeSort('role')}}>역할</th>
        <th onClick={()=>{changeSort('signupPage')}}>최초가입지</th>
        <th onClick={()=>{changeSort('CreatedDateTime')}}>가입일</th>
      </tr>;
      return result;
  }
    return (
      <div>
        <table>
          {makeheader()}
          {members==null? <></>: rendering()}
        </table>
      </div>
    );
}
  
export default MemberList;