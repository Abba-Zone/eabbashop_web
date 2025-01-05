import { useMemo } from "react";
import ReactQuill from 'react-quill'

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
          style={{height: '600px', marginBottom: '10%'}} // style 
        />
  );
};

export default ViewEditor;

