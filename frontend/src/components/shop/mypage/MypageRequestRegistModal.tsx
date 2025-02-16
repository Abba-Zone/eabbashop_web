import React, { useState, useEffect } from 'react';

interface PointRequestModalProps {
  isOpen: boolean;
  isCharge: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  type: 'charge' | 'refund' | 'refundUSD';
  accounts: accountList;
  lineList: lineList;
}

const MypageRegistModal: React.FC<PointRequestModalProps> = ({ isOpen, isCharge, onClose, onSubmit, type, accounts, lineList }) => {
  const [amount, setAmount] = useState<string>('');
  const [pointType, setPointType] = useState<string>('LP');
  const [paymentType, setPaymentType] = useState<string>('card');
  const [parentID, setParentID] = useState<string>('');
  const [accountID, setAccountID] = useState<string>('');
  const [selectedLineID, setSelectedLineID] = useState<string>('');
  const [code] = useState<string>('KRW');
  
  const validLines = lineList.list.filter(line => 
    line.depth >= 1 && 
    line.referRole && 
    line.referRole.trim() !== '' && 
    line.firstName && 
    line.lastName
  );

  const RoleForLine = (role: string) => {
    if (role === 'A') {
      return '일반';
    } else if (role === 'B') {
      return '판매점';
    } else if (role === 'C') {
      return '대리점';
    } else if (role === 'D') {
      return '지점';
    } else if (role === 'E') {
      return '관리자';
    }
  }
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
    console.log("amount", amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestDataforCharge = {
      pointType,
      amount: parseFloat(amount) || 0,
      ...(type === 'charge' ? { 
        paymentType,
        lineID: selectedLineID 
      } : { 
        accountID 
      }),
      parentID: parentID,
      code: code
    };

    const requestDataforRefund = {
      pointType,
      point: parseFloat(amount) || 0,
      accountID: accountID,
      lineID: selectedLineID,
      code: code
    };

    if (isCharge) {
      await onSubmit(requestDataforCharge);
    } else {
      await onSubmit(requestDataforRefund);
    }
    
    onClose();
  };

  const getModalTitle = () => {
    switch(type) {
      case 'charge':
        return '충전 신청';
      case 'refund':
        return '환급 신청';
      case 'refundUSD':
        return '환급 신청($)';
      default:
        return '';
    }
  };

  const handleClose = () => {
    setAmount('');
    setPointType('LP');
    setPaymentType('card');
    setParentID('');
    setAccountID('');
    setSelectedLineID('');
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setAmount('');
      setPointType('LP');
      setPaymentType('card');
      setParentID('');
      setAccountID('');
      setSelectedLineID('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px'
      }}>
        <h2>{getModalTitle()}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{ marginBottom: '15px' }}>
            <label>포인트 종류</label>
            <select
              value={pointType}
              onChange={(e) => setPointType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px'
              }}
            >
              <option value="LP">AW</option>
              {/* <option value="AP">AP</option> */}
              <option value="ABZ">ABZ</option>
            </select>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>금액</label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px'
              }}
              placeholder="0.00"
              required
              />
            </div>
          </div>

          {type === 'charge' && (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label>결제 종류</label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px'
                  }}
                >
                  <option value="card">카드결제</option>
                  <option value="bank">계좌이체</option>
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>라인 선택</label>
                <select
                  value={parentID}
                  onChange={(e) => setParentID(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px'
                  }}
                  required
                >
                  <option value="">라인을 선택하세요</option>
                  {validLines.map((line) => (
                    <option key={line.referID} value={line.referID}>
                      {line.lastName} {line.firstName} ({RoleForLine(line.referRole)}) - {line.email || '이메일 없음'}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {(type === 'refund' || type === 'refundUSD') && (
            <div style={{ marginBottom: '15px' }}>
              <label>환급 계좌</label>
              <select
                value={accountID}
                onChange={(e) => setAccountID(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px'
                }}
              >
                <option value="">계좌를 선택하세요</option>
                {accounts.list.map((account) => (
                  <option key={account.accountID} value={account.accountID}>
                    {account.bank} {account.accountNumber}
                  </option>
                ))}
              </select>
              <label>라인 선택</label>
                <select
                  value={selectedLineID}
                  onChange={(e) => setSelectedLineID(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px'
                  }}
                  required
                >
                  <option value="">라인을 선택하세요</option>
                  {validLines.map((line) => (
                    <option key={line.referID} value={line.referID}>
                      {line.lastName} {line.firstName} ({RoleForLine(line.referRole)}) - {line.email || '이메일 없음'}
                    </option>
                  ))}
                </select>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="submit">신청</button>
            <button type="button" onClick={handleClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MypageRegistModal;