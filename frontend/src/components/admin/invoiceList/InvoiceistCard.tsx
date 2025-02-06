import { useNavigate } from "react-router-dom";

interface Props{
  invoice:invoice;
  }
const InvoiceListCard:React.FC<Props> = ({invoice}) => {
    const navigate = useNavigate();
    return (
      <tr onClick={()=>{navigate(`/admin/invoicedetail/${invoice.invoiceID}`)}}>
        <td>선택</td>
        <td>{invoice.orderID}</td>
        <td>{invoice.invoiceNo}</td>
        <td>{invoice.recipientName}</td>
        <td>{invoice.status}</td>
        <td>{invoice.createdDateTime}</td>
      </tr>
    );
}
    
export default InvoiceListCard;
    