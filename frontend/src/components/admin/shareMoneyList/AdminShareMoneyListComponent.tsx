import ListCard from "./AdminShareMoneyListCard";
interface Props{
  shareMoneys:shareMoney[],
  changeSort(sortName:string):void,
}

const AdminShareMoneyListComponent:React.FC<Props> = ({shareMoneys, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < shareMoneys.length; i++){
        result.push(<ListCard key={i} shareMoney={shareMoneys[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>이름</th>
      <th onClick={()=>{changeSort('email')}}>이메일</th>
      <th onClick={()=>{changeSort('grade')}}>등급</th>
      <th onClick={()=>{changeSort('netAK')}}>net수당금</th>
      <th onClick={()=>{changeSort('role')}}>역할</th>
      <th onClick={()=>{changeSort('zonAK')}}>zon수당금</th>
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
            {shareMoneys==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminShareMoneyListComponent;