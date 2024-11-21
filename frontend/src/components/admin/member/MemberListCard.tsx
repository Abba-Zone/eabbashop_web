interface Props{
    user:testuser;
  }
  const MemberListCard:React.FC<Props> = (props) => {
      return (
        <p>
          {props.user.lastName} | {props.user.firstName} | {props.user.email} | {props.user.phone}
        </p>
      );
}
    
export default MemberListCard;
    