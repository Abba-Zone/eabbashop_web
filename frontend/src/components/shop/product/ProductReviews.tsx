import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductReviewList_s } from "../../../services/product";
import BottomButton from "../../common/list/BottomButton";
import StarMark from "./StarMark";
import ProductReviewList from "./ProductReviewList";

const ProductReviews:React.FC = () => {
    const [reviews, setReviews] = useState<review[]>([]);
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [lastPage, setLastPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [sort, setSort] = useState<number>(1); // 1:베스트순, 2:최신순
    const params = useParams<{id:string}>();
    const getReviewList = useCallback( async () => {
        try {
            if (params.id !== undefined){
                const totalAndReviews : reviewList = await getProductReviewList_s(pageNo, pageSize, sort, params.id);
                setReviews(totalAndReviews.list);
                setLastPage(totalAndReviews.totalCount === 0? 1:Math.floor((totalAndReviews.totalCount - 1)/pageSize) + 1);
                setTotalCount(totalAndReviews.totalCount);
            }
            } catch (error) {
                console.error('Error fetching productReview list:', error);
            }
    },[pageNo, pageSize, sort]);
    const changePage = (move:number) =>{
        setPageNo(move);

    }
    const changeSort = (value:number) =>{
        if (value !== sort)

        setSort(value);
    }
    useEffect(() => {
        getReviewList();
    }, [getReviewList]);
    if (reviews==null || reviews.length === 0){
        return(
            <div>
                <h2>상품평</h2>
                <div>리뷰가 없습니다.</div>
            </div>
        )
    }
    return (
    <div>
        <h2>상품평</h2>
        <StarMark scores={3.5}/><span>{totalCount}</span>
        <div>
            <button onClick={() => changeSort(1)}>베스트순</button>
            <button onClick={() => changeSort(2)}>최신순</button>
        </div>
        <ProductReviewList reviews={reviews}></ProductReviewList>
        <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
);
    }
    
export default ProductReviews;
