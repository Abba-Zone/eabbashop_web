import React, { useState, useEffect } from 'react';
import { BANK_LIST } from './BankList';
import '../../../pages/shop/Mypage/MyPageAccount.css';

interface AccountRegistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (accountData: accountData) => void;
  initialData?: accountData | null;
  isEditMode?: boolean;
}

interface accountData {
  accountID:string,
  lastName: string;
  firstName: string;
  bank: string;
  accountNumber: string;
  isMain: boolean;
}

const AccountRegistModal: React.FC<AccountRegistModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<accountData>({
    accountID: '',
    lastName: '',
    firstName: '',
    bank: '',
    accountNumber: '',
    isMain: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isMain: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="modal-content">
        <h2>{isEditMode ? '계좌 수정' : '계좌 등록'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>성</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>은행</label>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            >
              <option value="">은행을 선택하세요</option>
              {BANK_LIST.map(bank => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>계좌번호</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="'-' 없이 입력해주세요"
              required
            />
          </div>
          <div className="form-group checkbox" style={{display: isEditMode ? 'none' : 'block'}}>
            <label>
              <input
                type="checkbox"
                name="isMain"
                checked={formData.isMain}
                onChange={handleCheckboxChange}
              />
              기본 계좌로 설정
            </label>
          </div>
          <div className="modal-buttons">
            <button type="submit">
              {isEditMode ? '수정' : '등록'}
            </button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountRegistModal;