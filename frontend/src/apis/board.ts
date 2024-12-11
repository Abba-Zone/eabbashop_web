import { getData, postData, getTestData} from './mainApi'

export const getlist = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string, type:number):boardList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :boardList = {
        totalBoard : 10003,
        boards:[
            {boardID : "1q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : true, topYN : false, createdDateTime : "2024-11-15 17:13:22"},
            {boardID : "2q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : true, topYN : false, createdDateTime : "2024-11-15 17:13:22"},
            {boardID : "3q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : true, topYN : false, createdDateTime : "2024-11-15 17:13:22"},
            {boardID : "4q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : true, topYN : false, createdDateTime : "2024-11-15 17:13:22"},
            {boardID : "5q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : true, topYN : false, createdDateTime : "2024-11-15 17:13:22"},
        ]
    };
    return result;
}