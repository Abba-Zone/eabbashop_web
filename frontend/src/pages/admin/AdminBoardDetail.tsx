import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardDetail_s } from '../../services/board';
import { AdminBoardInfo } from '../../components';
const AdminBoardDetail: React.FC = () => {
  const [board, setBoard] = useState<boardDetail | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getBoardDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const boardDetail : boardDetail = await getBoardDetail_s(params.id);
        setBoard(boardDetail);
      }
    } catch (error) {
      console.error('Error fetching boardDetail:', error);
    }
  }, [params.id]); ;
  useEffect(() => {
    getBoardDetail(); // 비동기 함수 호출
  }, [getBoardDetail]);
  if (!board) {
    return (
      <div>
        <h1>게시글이 없습니다.</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{board.title}</h1>
      <AdminBoardInfo board={board}></AdminBoardInfo>
    </div>
  );
};

export default AdminBoardDetail;
