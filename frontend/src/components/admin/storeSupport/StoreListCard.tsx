 import { useState } from "react";
import SupportModal from "./SupportModal";

interface Props{
  store:store;
}
const StoreListCard:React.FC<Props> = ({store}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <tr>
      {
        modalOpen && 
        <div 
          style={{
          "width": "100%",
          "height": "100%",
          "position": "fixed",
          "top": "0",
          "left": "0",
          "display": "flex",
          "background": "rgba(0, 0, 0, 0.5)"
        }}><SupportModal store={store} setModalOpen={setModalOpen}/></div>
      }
      <td>{store.name}</td>
      <td>{store.host}</td>
      <td>{store.phone}</td>
      <td>{store.createdDateTime}</td>
      <td><button onClick={()=>setModalOpen(true)}>지원하기</button></td>
    </tr>
  );
}
    
export default StoreListCard;
    