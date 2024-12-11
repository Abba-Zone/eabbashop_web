import { useNavigate } from "react-router-dom";

interface Props{
  board:board;
  }
  const AdminBoardListCard:React.FC<Props> = ({board}) => {
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/boardDetail/${board.boardID}`)}}>
          <td>선택</td>
          <td>{board.title}</td>
          <td>{board.name}</td>
          <td>{board.topYN?"ON":"OFF"}</td>
          <td>{board.showYN?"ON":"OFF"}</td>
          <td>{board.createdDateTime}</td>
        </tr>
      );
}
    
export default AdminBoardListCard;
    