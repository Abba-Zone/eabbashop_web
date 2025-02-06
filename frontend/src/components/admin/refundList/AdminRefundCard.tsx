import { useNavigate } from "react-router-dom";
import { approveRequest_s } from "../../../services/customRequest";

interface Props{
  refund:refund;
  changeStatus(refundID:string, status:number):void
}
const AdminRefundCard:React.FC<Props> = ({refund, changeStatus}) => {
  const navigate = useNavigate();

  const viewState = (type:number):string => {
    if(type === 100)
      return  "환불요청"
    if(type === 200)
      return "교환요청"
    if(type === 300)
      return "승인완료"
    if(type === 400)
      return "요청거절"
    return type.toString()
  }

  const approveRequest = async(type:number) => {
    const data: {refundID:string, status:number} = {
      refundID : refund.refundID,
      status : type
    }
    await approveRequest_s(data);
    changeStatus(refund.refundID, type);
  }
  return (
    <tr>
      <td>선택</td>
      <td>{refund.lastName} {refund.firstName}</td>
      <td>{refund.phone}</td>
      <td>{refund.orderDetailID}</td>
      <td>{refund.createdDateTime}</td>
      <td>{viewState(refund.status)}</td>
      {refund.status === 100 || refund.status === 200?
        <td><button onClick={() => approveRequest(300)}>승인</button> / <button onClick={() => approveRequest(400)}>거절</button></td>:
        <td>작업완료</td>
      }
      <td><button onClick={() => navigate(`/admin/refundDetail/${refund.refundID}`)}>상세</button></td>
    </tr>
  );
}
    
export default AdminRefundCard;
    