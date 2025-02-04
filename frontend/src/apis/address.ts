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
        console.error('Signup error:', error);
        throw error;
    }
}
