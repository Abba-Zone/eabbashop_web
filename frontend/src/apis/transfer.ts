import { getData, postData } from './mainApi'

export const transferSupport = (requestData:{receiverID: string, LP: number,  AK: number,  SP: number,  message: string}) => {
    /* real code*/
    postData<{message:string}>('/wishlist/register', requestData)
        .then((data:any) => {
            console.log(data);
        }
    );
}
