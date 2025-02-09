import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { registToCart_s } from "../../../services/cart";

const Cookies = require("js-cookie");

const ProductSaleButtons:React.FC = ({}) => {
    const [cnt, setCnt] = useState<number>(0);
    const navigate = useNavigate();
    const params = useParams<{id:string}>();
    const checkKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCnt(value === "" ? 0 : Math.max(0, parseInt(value, 10)));
    };
    const isUser = ():boolean => {
        const isFlag = Cookies.get('access-token') 
          && Cookies.get('refresh-token') 
          && Cookies.get('first-name') 
          && Cookies.get('last-name')
          && Cookies.get('role');
        if (isFlag)
          return false;
        else 
          return true;
      }
    const registToCart = async() => {
        if (isUser()){
            const flag = sessionStorage.getItem("previousPage");
            if (!flag || !flag.includes("/productdetail")){
                sessionStorage.setItem("previousPage", window.location.href);
            }
            navigate("/login");
            return;
        }
        if(params.id)
            await registToCart_s(params.id, cnt);
    }
    return (
        <div >
            <input type="number" value={cnt} onKeyDown={checkKey}  onChange={handleChange} min={0} step={1}/>
            <button onClick={registToCart}>장바구니 담기</button>
            <button onClick={()=>{navigate(`/checkout/${params.id}/${cnt}`)}}>바로 구매</button>
        </div>
    );
}
    
export default ProductSaleButtons;
