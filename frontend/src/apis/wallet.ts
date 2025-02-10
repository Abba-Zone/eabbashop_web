import { getData, postData } from './mainApi'


//지갑 조회
export const getMyWallet = async (): Promise<accountList> => {
    const response = await getData('/wallet');
    console.log(response.data);
    return response.data as accountList;
}

//지갑내역조회
export const getWalletList = async(pageNo:number, pageSize:number, startDate:string, endDate:string):Promise<boardList> => {
    /* real code*/
    try {
        const response = await getData<boardList>(
            `/wallet/list?pageNo=${pageNo}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board list:', error);
        throw error;
    }
}

//지갑내역조회(admin)
export const getWalletAdminList = async(pageNo:number, pageSize:number, startDate:string, endDate:string, memberID:string):Promise<historyAdminList> => {
    /* real code*/
    try {
        const response = await getData<historyAdminList>(
            `/wallet/list/admin?pageNo=${pageNo}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&memberID=${memberID}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board list:', error);
        throw error;
    }
}
//지갑내역상세
//지갑내역상세(admin)
export const getAdminHistoryDetail = async(historyID:string):Promise<adminHistoryDetailReciever> => {
    /* real code*/
    try {
        const response = await getData<adminHistoryDetailReciever>(
            `/wallet/detail/admin/${historyID}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board list:', error);
        throw error;
    }
}
