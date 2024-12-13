import ListCard from "./AdminShareMoneyDetailList";
interface Props{
  shareMoneyDetails:shareMoneyDetail[],
  changeSort(sortName:string):void,
}

const AdminShareMoneyDetailListComponent:React.FC<Props> = ({shareMoneyDetails, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < shareMoneyDetails.length; i++){
        result.push(<ListCard key={i} shareMoneyDetail={shareMoneyDetails[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('platform')}}>net/zon</th>
      <th onClick={()=>{changeSort('rate')}}>비율</th>
      <th onClick={()=>{changeSort('money')}}>가격</th>
      <th onClick={()=>{changeSort('accumulation')}}>누적수당</th>
      <th onClick={()=>{changeSort('status')}}>상태</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>날짜</th>
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
            {shareMoneyDetails==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminShareMoneyDetailListComponent;