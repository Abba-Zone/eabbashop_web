import ListCard from "./AdminDonationListCard";
interface Props{
  donations:donation[],
  changeSort(sortName:string):void,
}

const AdminDonationList:React.FC<Props> = ({donations, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < donations.length; i++){
        result.push(<ListCard key={i} donation={donations[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>기부자</th>
      <th onClick={()=>{changeSort('money')}}>기부금</th>
      <th onClick={()=>{changeSort('type')}}>기부금 유형</th>
      <th onClick={()=>{changeSort('accumulation')}}>기부누적금</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>기부일자</th>
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
            {donations==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminDonationList;