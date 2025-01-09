import { useNavigate } from "react-router-dom";
const SelectBoardType:React.FC = () => {
    const navigate = useNavigate();

    return (
        <div >
            <button onClick={() => navigate(`/post/ALL`, { replace: true })}>전체</button>
            <button onClick={() => navigate(`/post/NOTICE`, { replace: true })}>공지사항</button>
            <button onClick={() => navigate(`/post/LETTER`, { replace: true })}>아빠의 편지</button>
            <button onClick={() => navigate(`/post/DONATION`, { replace: true })}>기부 내역</button>
        </div>
    );
}

export default SelectBoardType;
