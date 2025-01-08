interface board{
    boardID : string,
    title : string,
    name : string,
    showYN : string,
    topYN : string,
    createdDateTime : string
}

interface boardList{
    totalCount : number,
    list : board[],
}

interface shopBoard extends board{
    contents : string
}

interface shopBoardList{
    totalCount : number,
    list : shopBoard[],
}

interface boardDetail extends board{
    type : number,
    contents : string
}

interface registBoard {
    title : string,
    content : string,
    showYN : string,
    topYN : string,
    type : number
}

interface modifyBoard {
    boardID : string,
    title : string,
    content : string,
    showYN : string,
    topYN : string
}