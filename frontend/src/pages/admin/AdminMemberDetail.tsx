import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {MemberAdminInfo, MemberAdminWallet, MemberAdminAddress, MemberAdminSeller} from '../../components';
import { getMemberDetail_s } from '../../services/member';
import { useTranslation } from 'react-i18next';
const AdminMemberDetail: React.FC = () => {
  const { t } = useTranslation();
  const [member, setMember] = useState<memberDetail | undefined>(undefined);
  const [wallet, setWallet] = useState<wallet | undefined>(undefined);
  const [address, setAddress] = useState<addressAllInfo[]>([]);
  const [seller, setSeller] = useState<seller | undefined>(undefined);
  const params = useParams<{id:string}>();
  const getMemberDetail = useCallback (async () => {
    try {
      if (params.id !== undefined){
        const memberDetail : memberDetailInfo = await getMemberDetail_s(params.id);
        setMember(memberDetail.memberInfo);
        setWallet(memberDetail.wallet);
        setAddress(memberDetail.addresses);
        setSeller(memberDetail.seller);
      }
    } catch (error) {
      console.error('Error fetching memberDetail:', error);
    }
  }, [params.id]); ;
  useEffect(() => {
    getMemberDetail(); // 비동기 함수 호출
  }, [getMemberDetail]);
  if (!member) {
    return (
      <div>
        <h1>{t("AdminManagerMember:Detail.Option.Attribute00")}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{member.firstName + ' ' + member.lastName}</h1>
      <div>
        <MemberAdminInfo memberInfo={member} />
        {wallet && <MemberAdminWallet wallet={wallet}/>}
      </div>
      <div>
        <MemberAdminAddress address={address}/>
        {seller && <MemberAdminSeller seller={seller}/>}
      </div>
    </div>
  );
};

export default AdminMemberDetail;
