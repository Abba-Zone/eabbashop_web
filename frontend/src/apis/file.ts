import { getData, postData, getTestData} from './mainApi'

export const registFiles = (formdatas:FormData[]):string[] => {
    /* real code*/

    /* make for test*/
    var result = [];
    for(let i = 0 ; i <formdatas.length ; i++)
        result.push("test");
    return result;
}

export const deleteFiles = (deleteUrlList:string[]) => {
    /* real code*/
}
