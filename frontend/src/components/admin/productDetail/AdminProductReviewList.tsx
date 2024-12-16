import { useTranslation } from "react-i18next";
import AdminProductReviewCard from "./AdminProductReviewCard";
interface Props{
    reviews:review[],
}

const AdminProductReviewList:React.FC<Props> = ({reviews}) => {
    const { t } = useTranslation();
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < reviews.length; i++){
          result.push(<AdminProductReviewCard key={i} review={reviews[i]} ></AdminProductReviewCard>);
        }
        return result;
    }
    return (
      <div>
          {rendering()}
      </div>
    );
}
  
export default AdminProductReviewList;