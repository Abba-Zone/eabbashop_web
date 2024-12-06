import { useEffect, useState } from "react";
import ListCard from "./MemberListCard";
import { useTranslation } from "react-i18next";
interface Props{
    members:memberInfo[],
    changeSort(sortName:string):void,
}

const MemberList:React.FC<Props> = ({members, changeSort}) => {
    const { t } = useTranslation();
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < members.length; i++){
          result.push(<ListCard key={i} member={members[i]} ></ListCard>);
        }
        return result;
    }
    const makeheader = (): JSX.Element => {
      const result = 
      <tr>
        <th>선택</th>
        <th onClick={()=>{changeSort('name')}}>{t("AdminManagerMember:List.Filter01")}</th>
        <th onClick={()=>{changeSort('email')}}>{t("AdminManagerMember:List.Filter02")}</th>
        <th onClick={()=>{changeSort('phone')}}>{t("AdminManagerMember:List.Filter03")}</th>
        <th onClick={()=>{changeSort('recommend')}}>{t("AdminManagerMember:List.Filter04")}</th>
        <th onClick={()=>{changeSort('grade')}}>{t("AdminManagerMember:List.Filter05")}</th>
        <th onClick={()=>{changeSort('role')}}>{t("AdminManagerMember:List.Filter06")}</th>
        <th onClick={()=>{changeSort('signupPage')}}>{t("AdminManagerMember:List.Filter07")}</th>
        <th onClick={()=>{changeSort('CreatedDateTime')}}>{t("AdminManagerMember:List.Filter08")}</th>
      </tr>;
      return result;
  }
    return (
      <div>
        <table>
          <thead>
            {makeheader()}
          </thead>
          <tbody>
            {members==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default MemberList;