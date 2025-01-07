import { useNavigate } from "react-router-dom";
import { changeQuantity_s, deleteCart_s, selectCart_s } from "../../../services/cart";

interface Props{
    Info:cartInfo,
    changeItemOption(item : cartInfo):void
    deleteItemOption(cartID : string):void
}
const CartListCard:React.FC<Props> = ({Info, changeItemOption, deleteItemOption}) => {
    const navigate = useNavigate();
    const checkKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    }
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const cnt:number = value === "" ? 1 : Math.max(0, parseInt(value, 10));
        await changeQuantity_s(Info.cartID, cnt);
        const tempInfo:cartInfo = Info;
        tempInfo.quantity = cnt;
        changeItemOption(tempInfo);
    };
    const deleteCart = async() => {
        await deleteCart_s(Info.cartID);
        deleteItemOption(Info.cartID);
    };
    const checkSelect = async() => {
        const tempInfo:cartInfo = {...Info};
        await selectCart_s(Info.cartID, !tempInfo.selectYN);
        tempInfo.selectYN = !tempInfo.selectYN ;
        changeItemOption(tempInfo);
    };
    return (
        <div>
            <div onClick={checkSelect}>{Info.selectYN ? "체크됨":"체크안됨"}</div>
            <div onClick={()=>{navigate(`/productdetail/${Info.productId}`)}} style={{cursor: "pointer"}}>
                <img src={Info.thumbnail} alt="상품이미지" />
                <div>
                    <div>{Info.name}</div>
                    <div>${Info.quantity * Info.realPrice}</div>
                    <div>{Info.quantity * Info.SP} SP</div>
                    <div>{Info.quantity * Info.AK} AK</div>
                </div>
            </div>
            <input type="number" value={Info.quantity} onKeyDown={checkKey}  onChange={handleChange} min={1} step={1}/>
            <div>
                <button onClick={deleteCart}>삭제</button>
            </div>
        </div>
    );
}
    
export default CartListCard;
    