import { useNavigate } from "react-router-dom";
const NavButtonSet:React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => {navigate("/post/ALL")}}>게시글</button>
            <button onClick={() => {navigate("/cart")}}>장바구니</button>
        </div>
    );
};

export default NavButtonSet;
  