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

interface boardDetail extends board{
    type : string,
    contents : string
}

interface registBoard {
    title : string,
    content : string,
    showYN : string,
    topYN : string,
    type : string
}

interface modifyBoard {
    boardID : string,
    title : string,
    content : string,
    showYN : string,
    topYN : string
}