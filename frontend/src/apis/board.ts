import { getData, postData, getTestData} from './mainApi'

export const getBoardList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string, type:number):boardList => {
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

export const getBoardDetail = (boardID:string):boardDetail => {
    // getData<boardDetail>('/info?inquiryID='+ inquiryID)
    //     .then((data:APIResponse<boardDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardDetail;
    
    var result:boardDetail= {
        boardID : "123123141d2ewww",
        name : "정경훈",
        type : 100 ,
        title : "테스트제목입니다.",
        contents : "d아~~ 청춘이여~",
        showYN : true,
        topYN : false,
        createdDateTime : "2024-11-15 17:13:22"
    };
    return result;
}