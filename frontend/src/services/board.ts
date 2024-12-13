import { getBoardList, getBoardDetail } from '../apis/board'

export const getBoardList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string, type:number): Promise<boardList> => {
    return await getBoardList(pageNo, pageSize, filter, filterValue, sort, sortValue, type);
};
export const getBoardDetail_s = async (boardID:string): Promise<boardDetail> => {
    return await getBoardDetail(boardID);
};