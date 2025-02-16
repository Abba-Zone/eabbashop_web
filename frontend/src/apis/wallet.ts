import { getData, postData } from './mainApi'


//지갑 조회
export const getMyWallet = async (): Promise<WalletDetail> => {
    try {
        const response = await getData<WalletDetail>(
            `/wallet`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching wallet Info:', error);
        throw error;
    }
}

//지갑내역조회
export const getWalletList = async(pageNo:number, pageSize:number, startDate:string, endDate:string):Promise<historyList> => {
    /* real code*/
    try {
        const response = await getData<historyList>(
            `/wallet/list?pageNo=${pageNo}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching wallet list:', error);
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
        console.error('Error fetching admin wallet list:', error);
        throw error;
    }
}
//지갑내역상세
export const getHistoryDetail = async(historyID:string):Promise<historyDetailReciever> => {
    /* real code*/
    try {
        const response = await getData<historyDetailReciever>(
            `/wallet/detail/${historyID}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching history detail:', error);
        throw error;
    }
}
//지갑내역상세(admin)
export const getAdminHistoryDetail = async(historyID:string):Promise<historyDetailReciever> => {
    /* real code*/
    try {
        const response = await getData<historyDetailReciever>(
            `/wallet/detail/admin/${historyID}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching admin history detail:', error);
        throw error;
    }
}

export const requestCancel = async(transferID:string):Promise<historyDetailReciever> => {
    try {
        const response = await postData<historyDetailReciever>(
            `/wallet/cancel`,
            {
                transferID: transferID
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching request cancel:', error);
        throw error;
    }
}