import { getBoardList, getBoardDetail, registerBoard, modifyBoard } from '../apis/board'

export const getBoardList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string, type:string): Promise<boardList> => {
    return await getBoardList(pageNo, pageSize, filter, filterValue, sort, sortValue, type);
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
