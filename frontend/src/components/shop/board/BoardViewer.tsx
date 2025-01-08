import { memo, useMemo } from "react";
import ReactQuill from "react-quill";

interface Props {
    content: string;
}

const BoardViewer: React.FC<Props> = memo(({ content }) => {
    const modules = useMemo(() => ({ toolbar: false }), []);
    return <ReactQuill 
        value={content} 
        readOnly={true} 
        modules={modules} />;
});

export default BoardViewer;
