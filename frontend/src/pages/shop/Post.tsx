import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardList_s } from "../../services/board";

const Post:React.FC = () => {
  const [letters, setLetters] = useState<board[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filter, setFilter] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [sort, setSort] = useState<string>("createdDateTime");
  const [sortValue, setSortValue] = useState<string>("DESC");
  const params = useParams<{type:string}>();
  const getBoardList = useCallback (async () => {
    try {
      if (params.type === undefined)return;
      const totalAndBoardList : boardList = await getBoardList_s(pageNo, pageSize, filter, filterValue, sort, sortValue, parseInt(params.type));
      setLetters(totalAndBoardList.list);
      setLastPage(totalAndBoardList.totalCount === 0? 1:Math.floor((totalAndBoardList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching notice list:', error);
    }
  },[pageNo, pageSize, filter, filterValue, sort, sortValue]);
  useEffect(() => {
    getBoardList(); // 비동기 함수 호출
  }, [getBoardList]);
  return (
    <div>
      <h1>공지사항</h1>
      {/* 보드필터 => 전 공 아 기 선택버튼들 */}
      {/* 검색 */}
      {/* 리스트 */}
      {/* 하단버튼 */}
    </div>
  );
}

export default Post;
