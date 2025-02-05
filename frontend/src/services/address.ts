import { getAddressList, registAddress, updateComment } from '../apis/address'
export const getAddressList_s = async ():Promise<addressList> => {
    return await getAddressList();
}

export const registAddress_s = async (newAddress:registAddress):Promise<addressList> => {
    return await registAddress(newAddress);
}

export const updateComment_s = async (updateInfo:updateAddress):Promise<addressList> => {
    return await updateComment(updateInfo);
}
