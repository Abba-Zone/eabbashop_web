import React, { useState } from 'react';
import { requestPoint_s, refundPoint_s } from '../../../services/point';
interface PointRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  type: 'charge' | 'refund';
  accounts: accountList;
}

const MypageRegistModal: React.FC<PointRequestModalProps> = ({ isOpen, onClose, onSubmit, type, accounts }) => {
  const [amount, setAmount] = useState<number>(0);
  const [pointType, setPointType] = useState<string>('LP');
  const [paymentType, setPaymentType] = useState<string>('card');
  const [accountID, setAccountID] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ 
      amount,
      pointType,
      paymentType,
      accountID: type === 'refund' ? accountID : undefined
    });
  };

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
        <h2>{type === 'charge' ? '충전 신청' : '환급 신청'}</h2>
        <form onSubmit={handleSubmit}>
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
              <option value="AP">AP</option>
              <option value="ABZ">ABZ</option>
            </select>
          </div>

          {type === 'charge' && (
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
          )}

          {type === 'refund' && (
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
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label>금액</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px'
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="submit">신청</button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MypageRegistModal;