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

export const getBoardDetail = async(boardID:string):Promise<boardDetail> => {
    try {
        const response = await getData<boardDetail>(
            '/board/detail?boardID='+ boardID
        );
        if(response.data.toString() === "게시글이 없습니다."){
            return null as unknown as boardDetail;
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching board detail:', error);
        throw error;
    }
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

export const modifyBoard = async (boardInfo:modifyBoard) => {
    /* real code*/
    try {
        console.log(boardInfo);
        const data = await postData<reviewList>('/board/update', boardInfo);
        console.log(data);
    } catch (error) {
        console.error('Signup error:', error);
        return false;
    }
}
