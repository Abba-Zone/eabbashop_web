import { AxiosResponse } from 'axios';
import { getData, postData } from './mainApi'

export const getBoardList = (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string, type:number):boardList => {
    /* real code*/
    getData<boardList>('board/list/admin?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&sort='+ sort + '&sortValue='+ sortValue +  '&filter='+ filter + '&filterValue='+ filterValue + '&type='+ type)
        .then((data:AxiosResponse<boardList>) => {
            console.log(data);
            return data.data;
        }
    );
    return null as unknown as boardList;

    /* make for test*/
    // var result :boardList = {
    //     totalCount : 10003,
    //     list:[
    //         {boardID : "1q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22"},
    //         {boardID : "2q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22"},
    //         {boardID : "3q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22"},
    //         {boardID : "4q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22"},
    //         {boardID : "5q23q3e2311tt43y3423", title : "정경훈", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22"},
    //     ]
    // };
    // return result;
}

export const getPostList = async(pageNo:number, pageSize:number, title:string, type:number):Promise<shopBoardList> => {
    /* real code*/
    await getData<shopBoardList>(`/board/list?pageNo=${pageNo}&pageSize=${pageSize}&filter=title&filterValue=${title}&type=${type}`)
        .then((data:AxiosResponse<shopBoardList>) => {
            console.log(data)
            return data.data;
        }
    );
    return null as unknown as shopBoardList;

    /* make for test*/
    if(type==100){
    var result :shopBoardList = {
        totalCount : 10003,
        list:[
            {boardID : "1q23q3e2311tt43y3423", title : "정경훈1", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
            {boardID : "2q23q3e2311tt43y3423", title : "정경훈2", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
            {boardID : "3q23q3e2311tt43y3423", title : "정경훈3", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
            {boardID : "4q23q3e2311tt43y3423", title : "정경훈4", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
            {boardID : "5q23q3e2311tt43y3423", title : "정경훈5", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
        ]
    };
    return result;}
    else{
        var result :shopBoardList = {
            totalCount : 1000,
            list:[
                {boardID : "1q23q3e2311tt43y34231", title : "정경훈6", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
                {boardID : "2q23q3e2311tt43y34231", title : "정경훈7", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
                {boardID : "3q23q3e2311tt43y34231", title : "정경훈8", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
                {boardID : "4q23q3e2311tt43y34231", title : "정경훈9", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
                {boardID : "5q23q3e2311tt43y34231", title : "정경훈10", name: "전현태", showYN : "Y", topYN : "N", createdDateTime : "2024-11-15 17:13:22", contents:"<h6>게시글 내용입니다.<h6>"},
            ]
        };
        return result;}
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
        showYN : "Y",
        topYN : "N",
        createdDateTime : "2024-11-15 17:13:22"
    };
    return result;
}

export const registerBoard = (boardInfo:registBoard) => {
    /* real code*/
    postData<reviewList>('/board/register', boardInfo)
        .then((data:any) => {
            // return data.result;
        }
    );
}

export const modifyBoard = (boardInfo:modifyBoard) => {
    /* real code*/
    postData<reviewList>('/board/update', boardInfo)
        .then((data:any) => {
            // return data.result;
        }
    );
}
