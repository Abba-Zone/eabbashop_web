import { useTranslation } from "react-i18next";
import ListCard from "./StoreListCard";
interface Props{
  stores:store[],
    changeSort(sortName:string):void,
}

const AdminStoreListComponent:React.FC<Props> = ({stores, changeSort}) => {
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
      <th>선택</th>
      <th onClick={()=>{changeSort('storeID')}}>매장명</th>
      <th onClick={()=>{changeSort('name')}}>점주</th>
      <th onClick={()=>{changeSort('phone')}}>전화번호</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>매장생성일</th>
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
  
export default AdminStoreListComponent;