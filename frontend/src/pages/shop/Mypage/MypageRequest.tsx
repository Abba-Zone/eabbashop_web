import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BottomButton } from "../../../components";
import MypageRequestCard from "../../../components/shop/mypage/MypageRequestCard";
import MypageRequestRegistModal from "../../../components/shop/mypage/MypageRequestRegistModal";
import { useNavigate } from "react-router-dom";
import { requestPoint_s, refundPoint_s } from "../../../services/point";
import { getAccountList_s } from "../../../services/account";

const MypageRequest:React.FC = () => {
  const [accounts, setAccounts] = useState<accountList>({ totalCount: 0, list: [] });
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'charge' | 'refund'>('charge');
  const params = useParams<{type:string}>();
  const navigate = useNavigate();

  const handlePointRequest = (type: 'charge' | 'refund') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (modalType === 'charge') {
      await requestPoint_s({
        pointType: 'LP',
        amount: data.amount,
        parentID: ''
      });
    } else {
      await refundPoint_s({
        pointType: 'LP',
        amount: data.amount,
        accountID: data.accountID,
        parentID: ''
      });
    }
    setIsModalOpen(false);
  };

  const getBoardList = useCallback (async () => {
  },[pageNo, pageSize]);

  const changePage = (move:number) =>{
    setPageNo(move);
  }

  useEffect(() => {
    setPageNo(1);
    setPageSize(10);
    setLastPage(1);
  }, [params.type]);

  useEffect(() => {
    getBoardList();
  }, [getBoardList]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await getAccountList_s();
      setAccounts(response);
    };
    fetchAccounts();
  }, []);
  
  return (
    <div>
      <h1>게시글</h1>
      <div>
        <button onClick={() => navigate(`/mypage/request/ALL`, { replace: true })}>전체</button>
        <button onClick={() => navigate(`/mypage/request/CHARGE`, { replace: true })}>충전</button>
        <button onClick={() => navigate(`/mypage/request/REFUND`, { replace: true })}>환급</button>
        <button onClick={() => navigate(`/mypage/request/WITHDRAW`, { replace: true })}>출금</button>
      </div>
      <MypageRequestCard/>
      <BottomButton lastPage={lastPage} nowPage={pageNo} changePage={changePage}></BottomButton>
      <div>
        <button onClick={() => handlePointRequest('charge')}>충전 신청</button>
        <button onClick={() => handlePointRequest('refund')}>환급 신청</button>
      </div>
      <MypageRequestRegistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        type={modalType}
        accounts={accounts}
      />
    </div>
  );
}

export default MypageRequest;