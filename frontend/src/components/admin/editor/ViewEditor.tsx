import { useMemo } from "react";
import ReactQuill from 'react-quill'
import 'react-quill-new/dist/quill.snow.css';

interface Props{
  content:string,
}

const ViewEditor:React.FC<Props> = ({content}) => {
  const modules = useMemo(() => {
    return {
        toolbar: false,
    };
  }, []);
  return (
      <ReactQuill
          value={content}
          readOnly={true}
          modules={modules}
          theme="snow"
          style={{height: '600px', marginBottom: '10%'}} // style 
        />
  );
};

export default ViewEditor;

