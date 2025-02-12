import { useTranslation } from "react-i18next";
import ListCard from "./StoreListCard";
interface Props{
  stores:store[],
    changeSort(sortName:string):void,
}

const AdminStoreSupportListComponent:React.FC<Props> = ({stores, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < stores.length; i++){
        result.push(<ListCard key={i} store={stores[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th onClick={()=>{changeSort('storeID')}}>{t("AdminStore:List.Filter01")}</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminStore:List.Filter02")}</th>
      <th onClick={()=>{changeSort('phone')}}>{t("AdminStore:List.Filter03")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminStore:List.Filter04")}</th>
      <th>지원</th>
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
            {stores==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminStoreSupportListComponent;