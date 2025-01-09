import { AxiosResponse } from 'axios';
import { getData, postData } from './mainApi'

export const getBoardList = async(pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string, type:number):Promise<boardList> => {
    /* real code*/
    try {
        const response = await getData<boardList>(
            `/board/list/admin?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}&sortValue=${sortValue}&filter=${filter}&filterValue=${filterValue}&type=${type}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board list:', error);
        throw error;
    }
}

export const getPostList = async(pageNo:number, pageSize:number, title:string, type:number):Promise<shopBoardList> => {
    try {
        const response = await getData<shopBoardList>(
            `/board/list?pageNo=${pageNo}&pageSize=${pageSize}&filter=title&filterValue=${title}&type=${!type ? '' : type}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching post list:', error);
        throw error;
    }
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
        createDateTime : "2024-11-15 17:13:22"
    };
    return result;
}

export const registerBoard = async (boardInfo:registBoard) => {
    try {
        console.log(boardInfo);
        const data = await postData<reviewList>('/board/register', boardInfo);
        console.log(data);
    } catch (error) {
        console.error('Signup error:', error);
        return false;
    }
}

export const modifyBoard = (boardInfo:modifyBoard) => {
    /* real code*/
    postData<reviewList>('/board/update', boardInfo)
        .then((data:any) => {
            // return data.result;
        }
    );
}
