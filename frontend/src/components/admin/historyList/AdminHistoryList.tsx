import ListCard from "./AdminHistoryListCard";
interface Props{
    historys:adminHistory[],
}

const AdminHistoryList:React.FC<Props> = ({historys}) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < historys.length; i++){
          result.push(<ListCard key={i} history={historys[i]} ></ListCard>);
        }
        return result;
    }
    const makeheader = (): JSX.Element => {
      const result = 
      <tr>
        <th>선택</th>
        <th>포인트 경로</th>
        <th>AK</th>
        <th>LP</th>
        <th>SP</th>
        <th>메모</th>
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
            {historys==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminHistoryList;