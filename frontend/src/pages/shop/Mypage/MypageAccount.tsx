import React, { useState, useEffect } from "react";
import AccountListCard from "../../../components/account/AccountListCard";
import AccountRegistModal from "../../../components/account/AccountRegistModal";
import { registAccount_s, getAccountList_s, updateAccount_s, deleteAccount_s } from "../../../services/account";

interface accountData {
  accountID:string,
  lastName: string;
  firstName: string;
  bank: string;
  accountNumber: string;
  isMain: boolean;
}

const changeMainAccount = async (accountData: accountData) => {
    const updatedAccount = {
        ...accountData,
        isMain: true
    };
    
    const response = await updateAccount_s(updatedAccount);
    if(response){
        window.location.reload();
    }
};

const updateAccount = async (accountData:accountData) => {
    const response = await updateAccount_s(accountData);
    if(response){
      window.location.reload();
    }
}

const deleteAccount = async (accountID:string) => {
    const response = await deleteAccount_s(accountID);
    if(response){
      window.location.reload();
    }
}

const MypageAccount: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accounts, setAccounts] = useState<accountList>({ totalCount: 0, list: [] });
    const [selectedAccount, setSelectedAccount] = useState<accountData>({
      accountID: '',
      lastName: '',
      firstName: '',
      bank: '',
      accountNumber: '',
      isMain: false
    });
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
      const fetchAccounts = async () => {
        const response = await getAccountList_s();
        setAccounts(response);
      };
      fetchAccounts();
    }, []);

    const handleAccountSubmit = async (accountData: accountData) => {
        const response = isEditMode 
          ? await updateAccount_s(accountData)
          : await registAccount_s(accountData);
        
        if(response){
          window.location.reload();
        }
        handleCloseModal();
    };

    const handleEditClick = (account: accountData) => {
      setSelectedAccount(account);
      setIsEditMode(true);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedAccount({
        accountID: '',
        lastName: '',
        firstName: '',
        bank: '',
        accountNumber: '',
        isMain: false
      });
      setIsEditMode(false);
    };

    const handleInputReset = () => {
      setSelectedAccount({
        accountID: '',
        lastName: '',
        firstName: '',
        bank: '',
        accountNumber: '',
        isMain: false
      });
      setIsEditMode(false);
    }

    return (
      <div>
        <h1>계좌정보</h1>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <h2>계좌 정보</h2>
          <button 
            style={{
              backgroundColor: '#007bff', 
              color: '#fff', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              border: 'none', 
              cursor: 'pointer', 
              marginBottom: '10px'
            }} 
            onClick={() => {
              setIsModalOpen(true);
              handleInputReset();
            }}
          >
            계좌등록
          </button>
        </div>
        {accounts.list && accounts.list.map((account) => (
          <AccountListCard 
            key={account.accountID}
            account={account} 
            changeMainAccount={changeMainAccount}
            updateAccount={updateAccount}
            deleteAccount={deleteAccount}
          />
        ))}
        <AccountRegistModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAccountSubmit}
          initialData={selectedAccount}
          isEditMode={isEditMode}
        />
      </div>
    );
}

export default MypageAccount;