 import { useNavigate } from "react-router-dom";

interface Props{
  shipment:shipment;
  }
  const ShipmentListCard:React.FC<Props> = ({shipment}) => {
     const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/shipmentdetail/${shipment.shipmentID}`)}}>
          <td>선택</td>
          <td>{shipment.orderDetailID}</td>
          <td>{shipment.name}</td>
          <td>{shipment.invoiceNo}</td>
          <td>{shipment.createdDateTime}</td>
        </tr>
      );
}
    
export default ShipmentListCard;
    