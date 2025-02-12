import { useState } from "react";
import { transferSupport_s } from "../../../services/transfer";

interface Props{
    store:store,
    setModalOpen(flag:boolean):void
}

const SupportModal:React.FC<Props> = ({store, setModalOpen}) => {
    const [LP, setLP] = useState<number>(0);
    const [SP, setSP] = useState<number>(0);
    const [AK, setAK] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const cancel = () => {
        dataReset();
        setModalOpen(false);
    }
    const support = async () => {
        const requestData = {
            receiverID: store.memberID,
            LP: LP,
            AK: AK,
            SP: SP,
            message: message
        }
        await transferSupport_s(requestData);
        dataReset();
    }
    const dataReset = () => {
        setLP(0);
        setSP(0);
        setAK(0);
    }
    return (
        <div style={{backgroundColor:"white", overflow : "scroll"}}>
            <h2>매장 지원하기</h2>
            <div>
                <h3>매장정보</h3>
                <div><span>매장 이름: </span><span>{store.name}</span></div>
                <div><span>매장 주인: </span><span>{store.lastName} {store.firstName}</span></div>
                <div><span>매장 번호: </span><span>{store.phone}</span></div>
            </div>
            <div>
                <label htmlFor='LP'>LP : </label>
                <input type='number' value={LP} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setLP(Number(event.target.value))}}/>
            </div>
            <div>
                <label htmlFor='SP'>SP : </label>
                <input type='number' value={SP} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setSP(Number(event.target.value))}}/>
            </div>
            <div>
                <label htmlFor='AK'>AK : </label>
                <input type='number' value={AK} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setAK(Number(event.target.value))}}/>
            </div>
            <div>
                <label htmlFor='message'>메모 : </label>
                <input type='text' value={message} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setMessage(event.target.value)}}/>
            </div>
            <button onClick={cancel}>취소</button><button onClick={support}>지원하기</button>
        </div>
    );
}
    
export default SupportModal;
    