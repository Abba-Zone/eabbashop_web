import { getAddressList, registAddress } from '../apis/address'
export const getAddressList_s = async ():Promise<addressList> => {
    return await getAddressList();
}

export const registAddress_s = async (newAddress:registAddress):Promise<addressList> => {
    return await registAddress(newAddress);
}
