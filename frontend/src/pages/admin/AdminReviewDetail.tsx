import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewDetail_s } from '../../services/product';

const AdminReviewDetail: React.FC = () => {
  const [reviewInfo, setReviewInfo] = useState<review | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getReviewDetail = useCallback (async () => {
      try {
          if (params.id !== undefined){
              const reviewDetail : review = await getReviewDetail_s(params.id);
              console.log(reviewDetail);
              setReviewInfo(reviewDetail);
          }
      } catch (error) {
          console.error('Error fetching Review Detail:', error);
      }
  }, [params.id]);

  useEffect(() => {
    getReviewDetail(); // 비동기 함수 호출
  }, [getReviewDetail]);

  if (!reviewInfo) {
      return (
          <div>
              <h1>작성된 리뷰가 없습니다.</h1>
          </div>
      );
  }

  return (
      <div>
          리뷰 디테일 API 완성되면 작업해야됨
      </div>
  );
};

export default AdminReviewDetail;
