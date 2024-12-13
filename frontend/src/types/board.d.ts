interface board{
    boardID : string,
    title : string,
    name : string,
    showYN : boolean,
    topYN : boolean,
    createdDateTime : string
}

interface boardList{
    totalCount : number,
    list : board[],
}

interface boardDetail extends board{
    type : number,
    contents : string
}