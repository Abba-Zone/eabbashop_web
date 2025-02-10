interface Props {
  account: accountData;
  changeMainAccount: (accountData: accountData) => void;
  updateAccount: (accountData: accountData) => void;
  deleteAccount: (accountID: string) => void;
}

const AccountListCard: React.FC<Props> = ({ account, changeMainAccount, updateAccount, deleteAccount }) => {
  return (
    <div style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '10px', marginBottom: '10px'}}>
      <h3>
        {account.accountNumber}
        {!account.isMain &&
          <button 
            onClick={() => changeMainAccount(account)}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            기본 계좌로 설정
          </button>
        }
      </h3>
      <h4>{account.bank}</h4>
      <div>{account.firstName} {account.lastName}</div>
      <button onClick={() => updateAccount(account)}>수정</button>
      <button hidden={account.isMain} onClick={() => deleteAccount(account.accountID)}>삭제</button>
    </div>
  );
}

export default AccountListCard;