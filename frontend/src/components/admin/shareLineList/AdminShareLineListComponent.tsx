import ListCard from "./AdminShareLineListCard";
interface Props{
  shareLines:shareLine[],
  changeSort(sortName:string):void,
}

const AdminShareLineListComponent:React.FC<Props> = ({shareLines, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < shareLines.length; i++){
        result.push(<ListCard key={i} shareLine={shareLines[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>이름</th>
      <th onClick={()=>{changeSort('email')}}>이메일</th>
      <th onClick={()=>{changeSort('phone')}}>전화번호</th>
      <th onClick={()=>{changeSort('role')}}>역할</th>
      <th onClick={()=>{changeSort('memberNM')}}>고객수</th>
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
            {shareLines==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminShareLineListComponent;