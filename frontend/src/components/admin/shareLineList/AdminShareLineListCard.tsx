 import { useNavigate } from "react-router-dom";

interface Props{
  shareLine:shareLine;
  }
  const AdminShareLineListCard:React.FC<Props> = ({shareLine}) => {
     const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/sharedetail/${shareLine.memberID}`)}}>
          <td>선택</td>
          <td>{shareLine.name}</td>
          <td>{shareLine.email}</td>
          <td>{shareLine.phone}</td>
          <td>{shareLine.memberNM}</td>
        </tr>
      );
}
    
export default AdminShareLineListCard;
    