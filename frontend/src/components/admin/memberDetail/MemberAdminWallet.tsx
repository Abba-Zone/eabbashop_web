interface Props{
    wallet:wallet,
}
const MemberAdminWallet:React.FC<Props> = ({wallet}) => {
    return (
      <div>
          <h3>MemberAdminWallet</h3>
          <div><div>AK</div><div>{wallet.AK.toFixed(3)}</div></div>
          <div><div>AP</div><div>{wallet.AP.toFixed(3)}</div></div>
          <div><div>SP</div><div>{wallet.SP.toFixed(3)}</div></div>
          <div><div>AW</div><div>{wallet.AW.toFixed(3)}</div></div>
          <div><div>ABZ</div><div>{wallet.ABZ.toFixed(3)}</div></div>
      </div>
    );
}
  
export default MemberAdminWallet;
  