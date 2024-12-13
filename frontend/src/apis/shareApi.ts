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