import { useCallback, useEffect, useState } from "react";
import { getMyReviewList_s } from "../../../services/product";
import { MyReviewList } from "../../../components";

const MyPageReview:React.FC = () => {
  const [reviewList, setReviewList] = useState<review[]>([]);
  const getMyReviewList = useCallback( async () => {
    try {
      const list = await getMyReviewList_s();
      setReviewList(list.list);
    } catch (error) {
      console.error('Error fetching review list:', error);
    }
  },[]);
  useEffect(() => {
    getMyReviewList();
  }, [getMyReviewList]);
  const deleteItem = (itemID:string) => {
    setReviewList(reviewList.filter((data) => data.productReviewID !== itemID))
  }
  return (
    <div>
      <h1>상품 리뷰</h1>
      <MyReviewList reviewList={reviewList} deleteItem={deleteItem}/>
    </div>
  );
}

export default MyPageReview;
