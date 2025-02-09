export const insertAuthIDList = (authIDList: string[]) => {
    const jsonString = JSON.stringify(authIDList);
    localStorage.setItem('authID-list', jsonString);
};
export const getAuthIDList = ():string[] =>{
    const authIDString = localStorage.getItem("authID-list")
    const authIDList:string[] = JSON.parse(authIDString||"");
    return authIDList;
}
export const dropAuthIDList = () =>{
    localStorage.removeItem("authID-list");
}
export const isInclude = (ID:string):boolean =>{
    const authLsit = localStorage.getItem("authID-list")
    if(!authLsit)
        return false;
    const authIDList:string[] = JSON.parse(authLsit);
    if(!authIDList)return false;
    return authIDList.includes(ID);
}