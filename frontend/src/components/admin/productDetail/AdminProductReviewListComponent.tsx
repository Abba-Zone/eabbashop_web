import React, { useCallback } from 'react';
import { useEffect, useState } from "react";
import BottomButton from '../../common/list/BottomButton';
import { useParams } from 'react-router-dom';
import { getProductReviewList_s } from '../../../services/product';
import AdminProductReviewList from './AdminProductReviewList';
import { useTranslation } from 'react-i18next';

const AdminProductReviewListComponent: React.FC = () => {
  const [reviews, setReviews] = useState<review[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [sort, setSort] = useState<number>(1); // 1:베스트 순, 2:최신 순
  const params = useParams<{id:string}>();
  const { t } = useTranslation();
  const getReviewList = useCallback( async () => {
      try {
        if (params.id !== undefined){
            const totalAndReviews : reviewList = await getProductReviewList_s(pageNo, pageSize, sort, params.id);
            setReviews(totalAndReviews.reviews);
            setLastPage(totalAndReviews.totalReview === 0? 1:Math.floor((totalAndReviews.totalReview - 1)/pageSize) + 1);
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
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
    getReviewList(); // 비동기 함수 호출
    }, [getReviewList]);

  return (
    <div>
        <h2>{t("AdminProduct:Detail.Item03.Title")}</h2>
        <button onClick={() => changeSort(1)}>{t("AdminProduct:Detail.Item04.Attribute06")}</button>
        <button onClick={() => changeSort(2)}>{t("AdminProduct:Detail.Item04.Attribute07")}</button>
        <AdminProductReviewList reviews={reviews}/>
        <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminProductReviewListComponent;
