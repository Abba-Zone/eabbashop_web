interface Props{
  buyer:memberInfo,
}

const Buyer:React.FC<Props> = ({buyer}) => {
  return (
    <div>
      <h2>구매자 정보</h2>
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>전현태</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>jht043@naver.com</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>010-1234-5678</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
  
export default Buyer;