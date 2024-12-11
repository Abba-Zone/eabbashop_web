import ListCard from "./AdminBoardListCard";
interface Props{
  boards:board[],
  changeSort(sortName:string):void,
}

const AdminBoardList:React.FC<Props> = ({boards, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < boards.length; i++){
        result.push(<ListCard key={i} board={boards[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('title')}}>제목</th>
      <th onClick={()=>{changeSort('name')}}>작성자</th>
      <th onClick={()=>{changeSort('TopYN')}}>상단고정</th>
      <th onClick={()=>{changeSort('ShowYN')}}>활성화</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>작성일</th>
    </tr>;
    return result;
  }
    return (
      <div>
        <table>
          <thead>
            {makeheader()}
          </thead>
          <tbody>
            {boards==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminBoardList;