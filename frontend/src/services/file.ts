// import { registThumbnail, registImageFiles, registVideoFiles } from '../apis/inquiry'

export const registThumbnail_s = async (thumbnail:IFile): Promise<string> => {
    return "test";
};
const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

export const registImageFiles_s = async (description:string, images:IFile[]): Promise<{preUrl:string[], lastUrl:string[]}> => {
    return {preUrl:[], lastUrl:[]};
};
export const registVideoFiles_s = async (description:string, videos:IFile[]): Promise<{preUrl:string[], lastUrl:string[]}> => {
    return {preUrl:[], lastUrl:[]};
};