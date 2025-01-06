import ProductReviewCard from "./ProductReviewCard";
interface Props{
    reviews:review[],
}

const ProductReviewList:React.FC<Props> = ({reviews}) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < reviews.length; i++){
          result.push(<ProductReviewCard key={i} review={reviews[i]} ></ProductReviewCard>);
        }
        return result;
    }
    return (
      <div>
          {rendering()}
      </div>
    );
}
  
export default ProductReviewList;