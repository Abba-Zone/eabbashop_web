const Cookies = require('js-cookie');

export const insertAuthIDList = (authIDList: string[]) => {
  Cookies.set('authID-list', JSON.stringify(authIDList), { secure: true, sameSite: 'Strict' });
};
export const getAuthIDList = ():string[] =>{
    const authIDList:string[] = JSON.parse(Cookies.get("authID-list"));
    return authIDList;
}
export const dropAuthIDList = () =>{
    Cookies.remove("authID-list");
}
export const isInclude = (ID:string):boolean =>{
    console.log(ID)
    const authIDList:string[] = JSON.parse(Cookies.get("authID-list"));
    if(!authIDList)return false;
    return authIDList.includes(ID);
}