import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostList_s } from "../../services/board";
import { BoardList, BottomButton, SearchBoardWord, SelectBoardType } from "../../components";

const Post:React.FC = () => {
  const [posts, setPosts] = useState<shopBoard[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>("");
  const [type, setType] = useState<string>("");
  const params = useParams<{type:string}>();
  const getBoardList = useCallback (async () => {
    try {
      if(changeType(type)<0)return;
      const totalAndBoardList : shopBoardList = await getPostList_s(pageNo - 1, pageSize, searchWord, changeType(type));
      setPosts(totalAndBoardList.list);
      setLastPage(totalAndBoardList.totalCount === 0? 1:Math.floor((totalAndBoardList.totalCount - 1)/pageSize) + 1);
    } catch (error) {
      console.error('Error fetching post list:', error);
    }
  },[pageNo, pageSize, searchWord, type]);
  const changeType = (type : string):number => {
    switch (type) {
      case 'ALL': return null as unknown as number;
      case 'NOTICE': return 100;
      case 'LETTER': return 200;
      case 'DONATION': return 300;
      default: return -1;
    }
  }
  const changePage = (move:number) =>{
    setPageNo(move);
  }
  useEffect(() => {
    setPageNo(1);
    setPageSize(10);
    setLastPage(1);
    setSearchWord("");
    setType(!params.type? "":params.type)
  }, [params.type]);

  useEffect(() => {
    getBoardList();
  }, [getBoardList]);
  
  return (
    <div>
      <h1>게시글</h1>
      <SearchBoardWord setSearchWord={setSearchWord}/>
      <SelectBoardType/>
      <BoardList boards={posts}/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
    </div>
  );
}

export default Post;
