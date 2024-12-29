import { AxiosError } from "axios";
import { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill-new/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { useTranslation } from "react-i18next";

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

interface Props{
  content:string,
  images:IFile[],
  videos:IFile[],
  setImages(imageList:IFile[]):void,
  setVideos(videoList:IFile[]):void,
  setContent(contnet:string):void;
}

const Editor:React.FC<Props> = ({content, images, videos, setImages, setVideos, setContent}) => {
  const { t } = useTranslation();
  const QuillRef = useRef<ReactQuill | null>(null);
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "true");
    input.click();
    input.onchange = async (event: any) => {
      const imageFiles: FileList = event?.target?.files;
      const resizePromises = Array.from(imageFiles).map(async (file) => {
        const id = file.name;
        const previewURL = URL.createObjectURL(file);
        const imageFile = file;
        if (QuillRef.current) {
          const Image = Quill.import("formats/image");
          const editor = QuillRef.current.getEditor();
          const range = editor.getSelection();
          Image.sanitize = (imageFileURL: string) => imageFileURL;
          editor.insertEmbed(range?.index as number, "image", previewURL);
        }
        return { name: id, previewURL, file: imageFile };
      });
      const resizedImages = await Promise.all(resizePromises);
      setImages([...images, ...resizedImages]);
    };
  };
  const videoHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.setAttribute("multiple", "true");
    input.click();

    input.onchange = (event: any) => {
      const videoFiles: FileList = event?.target?.files;
      const vidoeFileObjects: IFile[] = [];
      Array.from(videoFiles).forEach((videoFile: File) => {
        const id = videoFile.name;
        const previewURL = URL.createObjectURL(videoFile);
        vidoeFileObjects.push({ name: id, previewURL, file: videoFile });
        if (QuillRef.current) {
          const Video = Quill.import("formats/video");
          const editor = QuillRef.current.getEditor();
          const range = editor.getSelection();
          Video.sanitize = (previewURL: string) => previewURL;
          editor.insertEmbed(range?.index as number, "video", previewURL);
        }
      });
      setVideos([...videos, ...vidoeFileObjects]);
    };
  };
  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'image', 'video', 'link','code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'],
        ],
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
      },
    };
  }, []);
  const formats = [
    'align',
    'background',
    'blockquote',
    'bold',
    'code-block',
    'color',
    'float',
    'font',
    'header',
    'height',
    'image',
    'italic',
    'link',
    'script',
    'strike',
    'size',
    'underline',
    'width',
    'video'
  ];
  return (
    <ReactQuill
        ref={QuillRef}
        formats={formats}
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
        style={{height: '600px', marginBottom: '10%'}}
        placeholder={t("AdminBoard:Regist.Attribute01")}
      />
  );
};

export default Editor;

