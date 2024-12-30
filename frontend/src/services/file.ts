import { registFiles, deleteFiles } from '../apis/file'

export const registThumbnail_s = async (thumbnail:IFile): Promise<string> => {
    const formDatas:FormData[] = [];
    const formData = new FormData();
    formData.append("file", thumbnail.file);
    const resultLastUrl = await registFiles(formDatas);
    return resultLastUrl[0];
};

export const modifyThumbnail_s = async (preThumnail:string, modifyThumbnail:IFile): Promise<string> => {
    await deleteFiles([preThumnail]);
    const formDatas:FormData[] = [];
    const formData = new FormData();
    formData.append("file", modifyThumbnail.file);
    const resultLastUrl = await registFiles(formDatas);
    return resultLastUrl[0];
};

export const registImageFiles_s = async (content:string, images:IFile[]): Promise<{preUrl:string[], lastUrl:string[]}> => {
    const gainSource = /<img[^>]+src=["']([^'">]+)['"]/gi;
    const resultPreUrl = [];
    const formDatas:FormData[] = [];
    const matches = content.matchAll(gainSource);
    for (const match of matches) {
        for(let i = 0 ; i < images.length; i++){
            if(images[i].previewURL === match[1]){
                resultPreUrl.push(match[1]);
                let formData = new FormData();
                formData.append("file", images[i].file);
                formDatas.push(formData);
                break;
            }
        }
    }
    if(formDatas.length === 0)
        return {preUrl:[], lastUrl:[]};
    const resultLastUrl = await registFiles(formDatas);
    return {preUrl:resultPreUrl, lastUrl:resultLastUrl};
};

export const registVideoFiles_s = async (content:string, videos:IFile[]): Promise<{preUrl:string[], lastUrl:string[]}> => {
    const gainSource = /<iframe[^>]+src=["']([^'">]+)['"]/gi;
    const resultPreUrl = [];
    const formDatas:FormData[] = [];
    const matches = content.matchAll(gainSource);
    for (const match of matches) {
        for(let i = 0 ; i < videos.length; i++){
            if(videos[i].previewURL === match[1]){
                resultPreUrl.push(match[1]);
                let formData = new FormData();
                formData.append("file", videos[i].file);
                formDatas.push(formData);
                break;
            }
        }
    }
    if(formDatas.length === 0)
        return {preUrl:[], lastUrl:[]};
    const resultLastUrl = await registFiles(formDatas);
    return {preUrl:resultPreUrl, lastUrl:resultLastUrl};
};

export const deleteFiles_s = async (preContent:string, modifyContent:string) =>{
    const gainImageSource = /<img[^>]+src=["']([^'">]+)['"]/gi;
    const gainVideoSource = /<iframe[^>]+src=["']([^'">]+)['"]/gi;
    const preImageUrls = Array.from(preContent.matchAll(gainImageSource), match => match[1]);
    const modifyImageUrls = new Set(Array.from(modifyContent.matchAll(gainImageSource), match => match[1]));
    const preVideoUrls = Array.from(preContent.matchAll(gainVideoSource), match => match[1]);
    const modifyVideoUrls = new Set(Array.from(modifyContent.matchAll(gainVideoSource), match => match[1]));
    const deleteUrlList: string[] = [];
    for (const url of preImageUrls) {
        if (!modifyImageUrls.has(url))
            deleteUrlList.push(url);
    }
    for (const url of preVideoUrls) {
        if (!modifyVideoUrls.has(url))
            deleteUrlList.push(url);
    }
    await deleteFiles(deleteUrlList);
}