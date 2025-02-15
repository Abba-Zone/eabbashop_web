import React, { useCallback, useEffect, useState } from 'react';
import { AdminReviewListComponent, BottomButton, SearchSet } from '../../components';
import { getProductReviewList_s } from '../../services/product';
import { useParams } from 'react-router-dom';

const AdminReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<review[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(-1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const params = useParams<{id:string}>();
  const selectList: { select: string, selectName: string, selectType:string, itemList:string[]}[] = 
  [
    {selectName:'작성자', select:'name', selectType:'text', itemList:[]},
    {selectName:'평점', select:'score', selectType:'select', itemList:['1', '2', '3', '4', '5']},
    {selectName:'좋아요수', select:'like', selectType:'text', itemList:[]},
    {selectName:'싫어요수', select:'dislike', selectType:'text', itemList:[]},
    {selectName:'작성일', select:'createdDateTime', selectType:'date', itemList:[]},
  ];
  const getReviewList = useCallback( async () => {
      try {
          if (params.id !== undefined){
              const totalAndReviews : reviewList = await getProductReviewList_s(pageNo, pageSize, 1, params.id);
              setReviews(totalAndReviews.list);
              setLastPage(totalAndReviews.totalCount === 0? 1:Math.floor((totalAndReviews.totalCount - 1)/pageSize) + 1);
          }
          } catch (error) {
              console.error('Error fetching productReview list:', error);
          }
  },[pageNo, pageSize, filter, filterValue, sort, sortValue]);

  const changePage = (move:number) =>{
    setPageNo(move);
  }
  const changeSort = (sortName:string) => {
    if (sortName === sort){
      if(sortValue ==='ASC')
        setSortValue('DESC')
      else
      setSortValue('ASC')
    } else {
      setSort(sortName);
      setSortValue('ASC');
    }
    setPageNo(1);
  }
  const changeFilter = (key:number, value:string) =>{
    setFilter(key);
    if (key === 3 && value === "활성화")
      setFilterValue("true");
    else if (key === 3 && value === "비활성화")
      setFilterValue("false");
    else
      setFilterValue(value);
    setPageNo(1);
  }

  useEffect(() => {
    getReviewList(); // 비동기 함수 호출
    }, [getReviewList]);
  return (
    <div>
      <h1>상품 리스트</h1>
      <SearchSet selectList={selectList} searchClick={changeFilter}></SearchSet>
      <select name="pageSize" value={pageSize} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setPageNo(1);setPageSize(Number(event.target.value))}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select><span>개씩 보기</span>
      <AdminReviewListComponent reviews={reviews} changeSort={changeSort}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
};

export default AdminReviewList;
