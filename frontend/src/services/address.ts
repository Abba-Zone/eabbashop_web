import { getAddressList, registAddress, updateComment, updateBillAddress, updateMainAddress } from '../apis/address'
export const getAddressList_s = async ():Promise<addressList> => {
    return await getAddressList();
}

export const registAddress_s = async (newAddress:registAddress):Promise<addressList> => {
    return await registAddress(newAddress);
}

export const updateComment_s = async (updateInfo:updateAddress):Promise<addressList> => {
    return await updateComment(updateInfo);
}
export const setBillAddress_s = async (updateData:{addressID:string, preAddressID:string}):Promise<addressList> => {
    return await updateBillAddress(updateData);
}
export const setMainAddress_s = async (updateData:{addressID:string, preAddressID:string}):Promise<addressList> => {
    return await updateMainAddress(updateData);
}

