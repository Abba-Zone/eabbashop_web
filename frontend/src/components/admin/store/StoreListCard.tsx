 import { useNavigate } from "react-router-dom";

interface Props{
  store:store;
  }
  const StoreListCard:React.FC<Props> = ({store}) => {
     const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/storedetail/${store.storeID}`)}}>
          <td>선택</td>
          <td>{store.name}</td>
          <td>{store.host}</td>
          <td>{store.phone}</td>
          <td>{store.createdDateTime}</td>
        </tr>
      );
}
    
export default StoreListCard;
    