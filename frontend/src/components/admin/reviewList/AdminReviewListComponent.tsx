import ListCard from "./ReviewListCard";
interface Props{
    reviews:review[],
    changeSort(sortName:string):void,
}

const AdminReviewListComponent:React.FC<Props> = ({reviews, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < reviews.length; i++){
        result.push(<ListCard key={i} review={reviews[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>작성자</th>
      <th onClick={()=>{changeSort('score')}}>평점</th>
      <th onClick={()=>{changeSort('like')}}>좋아요수</th>
      <th onClick={()=>{changeSort('dislike')}}>싫어요수</th>
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
            {reviews==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminReviewListComponent;