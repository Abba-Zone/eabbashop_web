 import { useNavigate } from "react-router-dom";

interface Props{
  store:store;
  }
  const StoreListCard:React.FC<Props> = ({store}) => {
     const navigate = useNavigate();
      return (
        <tr>
          <td>선택</td>
          <td>{store.name}</td>
          <td>{store.lastName} {store.firstName}</td>
          <td>{store.phone}</td>
          <td>{store.createdDateTime}</td>
          <td><button onClick={()=>{navigate(`/admin/storedetail/${store.sellerID}`)}}>상세</button></td>
        </tr>
      );
}
    
export default StoreListCard;
    