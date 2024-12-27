import { registFiles } from '../apis/file'

export const registThumbnail_s = async (thumbnail:IFile): Promise<string> => {
    const formDatas:FormData[] = [];
    const formData = new FormData();
    formData.append("file", thumbnail.file);
    const resultLastUrl = await registFiles(formDatas);
    return resultLastUrl[0];
};

export const registImageFiles_s = async (content:string, images:IFile[]): Promise<{preUrl:string[], lastUrl:string[]}> => {
    const gainSource = /<img[^>]+src=["']([^'">]+)['"]/gi;
    const resultPreUrl = [];
    const formDatas:FormData[] = [];
    const matches = content.matchAll(gainSource);
    for (const match of matches) {
        resultPreUrl.push(match[1]);
        let formData = new FormData();
        for(let i = 0 ; i < images.length; i++){
            if(images[i].previewURL === match[1]){
                formData.append("file", images[i].file);
                formDatas.push(formData);
                break;
            }
        }
    }
    const resultLastUrl = await registFiles(formDatas);
    return {preUrl:resultPreUrl, lastUrl:resultLastUrl};
};

export const registVideoFiles_s = async (content:string, videos:IFile[]): Promise<{preUrl:string[], lastUrl:string[]}> => {
    const gainSource = /<iframe[^>]+src=["']([^'">]+)['"]/gi;
    const resultPreUrl = [];
    const formDatas:FormData[] = [];
    const matches = content.matchAll(gainSource);
    for (const match of matches) {
        resultPreUrl.push(match[1]);
        let formData = new FormData();
        for(let i = 0 ; i < videos.length; i++){
            if(videos[i].previewURL === match[1]){
                formData.append("file", videos[i].file);
                formDatas.push(formData);
                break;
            }
        }
    }
    const resultLastUrl = await registFiles(formDatas);
    return {preUrl:resultPreUrl, lastUrl:resultLastUrl};
};