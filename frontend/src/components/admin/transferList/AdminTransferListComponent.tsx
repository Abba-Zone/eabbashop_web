import ListCard from "./AdminTransferListCard";
interface Props{
  transfers:transfer[],
  changeSort(sortName:string):void,
}

const AdminTransferListComponent:React.FC<Props> = ({transfers, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < transfers.length; i++){
        result.push(<ListCard key={i} transfer={transfers[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('senderName')}}>보낸사람</th>
      <th onClick={()=>{changeSort('receiverName')}}>받는사람</th>
      <th onClick={()=>{changeSort('money')}}>이체금액</th>
      <th onClick={()=>{changeSort('moneyType')}}>이체유형</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>이체일</th>
      <th onClick={()=>{changeSort('status')}}>상태</th>
      <th></th>
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
            {transfers==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminTransferListComponent;