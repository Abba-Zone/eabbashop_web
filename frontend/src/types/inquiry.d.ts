interface inquiry{
    inquiryID : string,
    type : string,
    name : string,
    title : string,
    status : string,
    createdDateTime : string,
}

interface inquiryList{
    totalInquiy : number,
    inquirys : inquiry[],
}

interface inquiryDetail extends inquiry{
    content : string,
    responseContent : string,
    responseDateTime : string,
    responseMember : string
}