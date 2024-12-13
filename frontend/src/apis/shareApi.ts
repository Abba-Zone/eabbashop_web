import { getData, postData, getTestData} from './mainApi'

/* ShareLine */
export const getShareLineList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):shareLineList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :shareLineList = {
        totalCount : 10003,
        list:[
            { email : "asdf@asdg.com", memberID : "asgdebweew134", memberNM : 123, name : "전 현태A", phone : "010-1234-5678", role : "대리점" },
            { email : "asdf@asdg.com", memberID : "asgdebweew134", memberNM : 123, name : "전 현태A", phone : "010-1234-5678", role : "대리점" },
            { email : "asdf@asdg.com", memberID : "asgdebweew134", memberNM : 123, name : "전 현태A", phone : "010-1234-5678", role : "대리점" },
            { email : "asdf@asdg.com", memberID : "asgdebweew134", memberNM : 123, name : "전 현태A", phone : "010-1234-5678", role : "대리점" },
            { email : "asdf@asdg.com", memberID : "asgdebweew134", memberNM : 123, name : "전 현태A", phone : "010-1234-5678", role : "대리점" }
        ]
    };
    return result;
}

/* ShareMoney */
export const getShareMoneyList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):shareMoneyList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :shareMoneyList = {
        totalCount : 10003,
        list:[
            { email : "sdfgsd@adsfbsdvb.com", grade : "Gold", memberID : "zsdcbxdcv", name : "전 현태A", netAK : 10000, role : "대리점", zonAK : 100000 },
            { email : "sdfgsd@adsfbsdvb.com", grade : "Gold", memberID : "zsdcbxdcv", name : "전 현태A", netAK : 10000, role : "대리점", zonAK : 100000 },
            { email : "sdfgsd@adsfbsdvb.com", grade : "Gold", memberID : "zsdcbxdcv", name : "전 현태A", netAK : 10000, role : "대리점", zonAK : 100000 },
            { email : "sdfgsd@adsfbsdvb.com", grade : "Gold", memberID : "zsdcbxdcv", name : "전 현태A", netAK : 10000, role : "대리점", zonAK : 100000 },
            { email : "sdfgsd@adsfbsdvb.com", grade : "Gold", memberID : "zsdcbxdcv", name : "전 현태A", netAK : 10000, role : "대리점", zonAK : 100000 }
        ]
    };
    return result;
}

/* ShareMoneyDetail */
export const getShareMoneyDetailList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):shareMoneyDetailList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :shareMoneyDetailList = {
        totalCount : 10003,
        email : "ych536@naver.com",
        name : "이치헌",
        list:[
            { accumulation : 1000000000000, createdDateTime : "2024-11-15 16:30:22", money : 4242400, platform : "zon", rate : "1/25", status : "canceled" },
            { accumulation : 1000000000000, createdDateTime : "2024-11-15 16:30:22", money : 4242400, platform : "net", rate : "2/25", status : "pass" },
            { accumulation : 1000000000000, createdDateTime : "2024-11-15 16:30:22", money : 4242400, platform : "net", rate : "1/1", status : "complete" },
            { accumulation : 1000000000000, createdDateTime : "2024-11-15 16:30:22", money : 4242400, platform : "zon", rate : "4/25", status : "complete" },
            { accumulation : 1000000000000, createdDateTime : "2024-11-15 16:30:22", money : 4242400, platform : "zon", rate : "1/1", status : "canceled" }
        ]
    };
    return result;
}
