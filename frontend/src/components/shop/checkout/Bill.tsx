interface Props{
  address: addressAllInfo | null,
  setModalOpen(type:number):void,
}

const Bill:React.FC<Props> = ({address, setModalOpen}) => {
  return (
    <div>
      <h2>청구서<button onClick={() => {setModalOpen(1)}}>청구주소 변경</button></h2>
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>{address?.lastName} {address?.firstName}</td>
          </tr>
          <tr>
            <td>우편번호</td>
            <td>{address?.zipCode}</td>
          </tr>
          <tr>
            <td>기본주소</td>
            <td>{address?.baseAddress}</td>
          </tr>
          <tr>
            <td>상세주소</td>
            <td>{address?.detailAddress}</td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>{address?.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
  
export default Bill;