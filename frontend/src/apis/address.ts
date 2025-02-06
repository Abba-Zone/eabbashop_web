import { getData, postData } from './mainApi'

export const getAddressList = async():Promise<addressList> => {
    /* real code*/
    try {
        const response = await getData<addressList>(
            `/address/list`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching address list:', error);
        throw error;
    }
}

export const registAddress = async (newAddress:registAddress):Promise<addressList> => {
    try {
        const response = await postData<addressList>('/address/register', newAddress);
        return response.data;
    } catch (error) {
        console.error('Error fetching regist address:', error);
        throw error;
    }
}

export const updateComment = async (updateInfo:updateAddress):Promise<addressList> => {
    try {
        const response = await postData<addressList>('/address/update', updateInfo);
        return response.data;
    } catch (error) {
        console.error('Error fetching update address:', error);
        throw error;
    }
}
export const updateBillAddress = async (updateInfo:{addressID:string, preAddressID:string}):Promise<addressList> => {
    try {
        const response = await postData<addressList>('/address/set/bill', updateInfo);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching update address:', error);
        throw error;
    }
}
export const updateMainAddress = async (updateInfo:{addressID:string, preAddressID:string}):Promise<addressList> => {
    try {
        const response = await postData<addressList>('/address/set/main', updateInfo);
        return response.data;
    } catch (error) {
        console.error('Error fetching update address:', error);
        throw error;
    }
}
