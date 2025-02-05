import React, { useState } from 'react';
import { registInvoice_s } from '../../../services/sale';

interface Props{
    orders:order[],
    selectIDs: {orderDetailID:string}[],
    setModalOpen(type:boolean):void
}

const AdminInvoiceRegistModal: React.FC<Props> = ({orders, selectIDs, setModalOpen}) => {
    const [invoiceNum, setInvoiceNum] = useState<string>("");
    const rendering = (): JSX.Element[] => {
        const result = [];
        result.push(<tr key={0}><th>상품명</th><th>주문자</th><th>상태</th><th>주문일자</th></tr>);
        for(let i = 0 ; i < orders.length; i++){
            for(let j = 0; j < selectIDs.length ; j++){
                if(orders[i].orderDetailID === selectIDs[j].orderDetailID)
                result.push(
                    <tr key={i + 1}><td>{orders[i].productName}</td><td>{orders[i].memberName}</td><td>{orders[i].status}</td><td>{orders[i].createdDateTime}</td></tr>
                );
            }
        }
        return result;
    }
    const regist = async () =>{
        const newInvoice:registInvoice={
            orderDetails : selectIDs,
	        invoiceNo : invoiceNum,
            "IP" : "111:222:333:444"
        }
        await registInvoice_s(newInvoice);
        setModalOpen(false);
    }
    return (
        <div style={{backgroundColor:"white", overflow : "scroll"}}>
            <h1>송장 등록</h1>
            <button onClick={() => {setModalOpen(false)}}>닫기</button>
            <table>

            </table>
            {rendering()}
            <h3>상품 목록</h3>
            <input type="text" value={invoiceNum} placeholder='송장번호를 입력해주세요.' onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setInvoiceNum(event.target.value)}}/>
            <button onClick={regist}>등록</button>
        </div>
    );
};

export default AdminInvoiceRegistModal;
