import { useTranslation } from "react-i18next";
import ListCard from "./InquiryListCard";
interface Props{
    inquirys:inquiry[],
    changeSort(sortName:string):void,
}

const InquiryList:React.FC<Props> = ({inquirys, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < inquirys.length; i++){
        result.push(<ListCard key={i} inquiry={inquirys[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('title')}}>{t("AdminInquiry:List.Filter01")}</th>
      <th onClick={()=>{changeSort('type')}}>{t("AdminInquiry:List.Filter02")}</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminInquiry:List.Filter03")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminInquiry:List.Filter04")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminInquiry:List.Filter05")}</th>
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
            {inquirys==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default InquiryList;