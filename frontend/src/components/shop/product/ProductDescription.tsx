import { useMemo } from "react";
import ReactQuill from 'react-quill'

interface Props{
    content:string,
}

const ProductDescription:React.FC<Props> = ({content}) => {
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
        />
    );
}
    
export default ProductDescription;
