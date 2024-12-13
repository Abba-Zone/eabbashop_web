interface Props{
  shareMoneyDetail:shareMoneyDetail;
  }
  const AdminShareMoneyDetailList:React.FC<Props> = ({shareMoneyDetail}) => {
      return (
        <tr>
          <td>선택</td>
          <td>{shareMoneyDetail.platform}</td>
          <td>{shareMoneyDetail.rate}</td>
          <td>{shareMoneyDetail.money}</td>
          <td>{shareMoneyDetail.accumulation}</td>
          <td>{shareMoneyDetail.status}</td>
          <td>{shareMoneyDetail.createdDateTime}</td>
        </tr>
      );
}
    
export default AdminShareMoneyDetailList;
    