interface Props{
  board:boardDetail,
}
const AdminBoardInfo:React.FC<Props> = ({board}) => {
    return (
      <div>
        <div><div>게시글유형</div><div>{board.type}</div></div>
        <div><div>작성자</div><div>{board.name}</div></div>
        <div><div>작성일</div><div>{board.createdDateTime}</div></div>
        <div><div>상세내용</div><div>{board.contents}</div></div>
        <div><div>상단고정</div><div>{board.topYN}</div></div>
        <div><div>활성화</div><div>{board.showYN}</div></div>
      </div>
    );
}
  
export default AdminBoardInfo;
  