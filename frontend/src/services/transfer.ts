import { transferSupport } from '../apis/transfer'

export const transferSupport_s = async (requestData:{receiverID: string, LP: number,  AK: number,  SP: number,  message: string}) => {
    return await transferSupport(requestData);
}