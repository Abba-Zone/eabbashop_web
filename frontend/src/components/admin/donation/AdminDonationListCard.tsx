interface Props{
  donation:donation;
  }
  const AdminDonationListCard:React.FC<Props> = ({donation}) => {
    return (
      <tr>
        <td>선택</td>
        <td>{donation.name}</td>
        <td>{donation.money}</td>
        <td>{donation.type}</td>
        <td>{donation.accumulation}</td>
        <td>{donation.createdDateTime}</td>
      </tr>
    );
}
    
export default AdminDonationListCard;
    