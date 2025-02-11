import ListCard from './MyHistoryListCard';
interface Props{
    historys:walletHistory[],
}

const MyHistoryList:React.FC<Props> = ({historys}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < historys.length; i++){
        result.push(<ListCard key={i} history={historys[i]}></ListCard>);
      }
      return result;
  }
    return (
      <div>
        {rendering()}
      </div>
    );
}
  
export default MyHistoryList;