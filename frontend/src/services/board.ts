import { getBoardList, getPostList, getBoardDetail, registerBoard, modifyBoard } from '../apis/board'

export const getBoardList_s = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string, type:number): Promise<boardList> => {
    return await getBoardList(pageNo, pageSize, filter, filterValue, sort, sortValue, type);
};

export const getPostList_s = async (pageNo:number, pageSize:number, title:string, type:number): Promise<shopBoardList> => {
    return await getPostList(pageNo, pageSize, title, type);
};

export const getBoardDetail_s = async (boardID:string): Promise<boardDetail> => {
    return await getBoardDetail(boardID);
};

export const registBoard_s = async (boardInfo:registBoard) => {
    await registerBoard(boardInfo);
}

export const modifyBoard_s = async (boardInfo:modifyBoard) => {
    await modifyBoard(boardInfo);
}
