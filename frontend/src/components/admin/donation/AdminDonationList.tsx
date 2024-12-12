import { useTranslation } from "react-i18next";
import ListCard from "./AdminDonationListCard";
interface Props{
  donations:donation[],
  changeSort(sortName:string):void,
}

const AdminDonationList:React.FC<Props> = ({donations, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < donations.length; i++){
        result.push(<ListCard key={i} donation={donations[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminDonation:List.Filter01")}</th>
      <th onClick={()=>{changeSort('money')}}>{t("AdminDonation:List.Filter02")}</th>
      <th onClick={()=>{changeSort('type')}}>{t("AdminDonation:List.Filter03")}</th>
      <th onClick={()=>{changeSort('accumulation')}}>{t("AdminDonation:List.Filter04")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminDonation:List.Filter05")}</th>
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
            {donations==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminDonationList;