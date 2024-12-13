import { getData, postData, getTestData} from './mainApi'

export const getInquiryList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):inquiryList => {
    /* real code*/
    // getData<inquiryList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<inquiryList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as inquiryList;

    /* make for test*/
    var result :inquiryList = {
        totalCount : 10003,
        list:[
            {inquiryID: '1q23q3e2311tt43y3423', name:'전 현태1', status:'완료', title : "정경훈",type:"불편사항", createdDateTime:'2023-11-28 15:12:44'},
            {inquiryID: '2q23q3e2311tt43y3423', name:'전 현태2', status:'완료', title : "정경훈",type:"불편사항", createdDateTime:'2023-11-28 15:12:44'},
            {inquiryID: '3q23q3e2311tt43y3423', name:'전 현태3', status:'완료', title : "정경훈",type:"불편사항", createdDateTime:'2023-11-28 15:12:44'},
            {inquiryID: '4q23q3e2311tt43y3423', name:'전 현태4', status:'완료', title : "정경훈",type:"불편사항", createdDateTime:'2023-11-28 15:12:44'},
            {inquiryID: '5q23q3e2311tt43y3423', name:'전 현태5', status:'완료', title : "정경훈",type:"불편사항", createdDateTime:'2023-11-28 15:12:44'},
        ]
    };
    return result;
}

export const getinquiryDetail = (inquiryID:string):inquiryDetail => {
    // getData<inquiryDetail>('/info?inquiryID='+ inquiryID)
    //     .then((data:APIResponse<inquiryDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as inquiryDetail;
    
    var result:inquiryDetail= {
        inquiryID: '1q23q3e2311tt43y3423', 
        name:'전 현태1', 
        status:'완료', 
        title : "정경훈",
        content : "문의 상세내용은 이렇습니다. 그래서 문의합니다.",
        type:"불편사항", 
        createdDateTime:'2023-11-28 15:12:44',
        responseContent : "이렇게 처리하시면 됩니다.",
        responseDateTime : "2024-11-15 17:13:23",
        responseMember : "이 치헌"
    };
    return result;
}