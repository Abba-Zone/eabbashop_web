import { useNavigate } from "react-router-dom";

interface Props{
  inquiry:inquiry;
  }
  const InquiryListCard:React.FC<Props> = ({inquiry}) => {
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/customer-inquiry/${inquiry.inquiryID}`)}}>
          <td>선택</td>
          <td>{inquiry.title}</td>
          <td>{inquiry.type}</td>
          <td>{inquiry.name}</td>
          <td>{inquiry.status}</td>
          <td>{inquiry.createdDateTime}</td>
        </tr>
      );
}
    
export default InquiryListCard;
    