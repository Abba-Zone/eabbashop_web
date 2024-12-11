interface board{
    boardID : string,
    title : string,
    name : string,
    showYN : boolean,
    topYN : boolean,
    createdDateTime : string
}

interface boardList{
    totalBoard : number,
    boards : board[],
}

interface boardDetail extends board{

}