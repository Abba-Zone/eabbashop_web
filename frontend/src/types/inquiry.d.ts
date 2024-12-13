interface inquiry{
    inquiryID : string,
    type : string,
    name : string,
    title : string,
    status : string,
    createdDateTime : string,
}

interface inquiryList{
    totalCount : number,
    list : inquiry[],
}

interface inquiryDetail extends inquiry{
    content : string,
    responseContent : string,
    responseDateTime : string,
    responseMember : string
}