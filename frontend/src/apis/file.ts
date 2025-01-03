import { getData, postData, getTestData} from './mainApi'

import banner1 from '../assets/banners/20220408-1_2.jpg';
import banner2 from '../assets/banners/20220408-3_1.jpg';
import banner3 from '../assets/banners/abba20220407-1.jpg';
import banner4 from '../assets/banners/abba20220407-2.jpg';


export const registFiles = (formdatas:FormData[]):string[] => {
    /* real code*/

    /* make for test*/
    const result = [];
    for(let i = 0 ; i <formdatas.length ; i++)
        result.push("test");
    return result;
}

export const deleteFiles = (deleteUrlList:string[]) => {
    /* real code*/
}

export const getBannerList = ():string[] => {
    /* real code*/
    const result = [
        banner1,
        banner2,
        banner3,
        banner4,
    ];
    return result;
}
