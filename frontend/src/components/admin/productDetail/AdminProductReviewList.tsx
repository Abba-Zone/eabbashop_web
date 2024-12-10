import { useEffect, useState } from "react";
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
    if (reviews==null || reviews.length === 0){
      return(
        <div>
          <h1>리뷰가 없습니다.</h1>
        </div>
      )
    }
    return (
      <div>
          {rendering()}
      </div>
    );
}
  
export default AdminProductReviewList;