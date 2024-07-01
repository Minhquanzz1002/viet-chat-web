import {Empty, Excel, Html, Pdf, Photo, Video, Word, Zip} from "../Icons/Files";

interface AttachmentViewerProps {
    filename: string;
}
const AttachmentViewer = ({filename} : AttachmentViewerProps) => {
    if (filename.includes('.mp4') || filename.includes('.mkv')) {
        return <Video/>
    }
    else if (filename.includes('.zip')) {
        return <Zip/>
    }
    else if (filename.includes('.docx')) {
        return <Word/>
    }
    else if (filename.includes('.pdf')) {
        return <Pdf/>
    }
    else if (filename.includes('.html')) {
        return <Html/>
    }
    else if (filename.endsWith('.xlsx') || filename.endsWith('.xls')) {
        return <Excel/>
    }
    else if (filename.includes('.png') || filename.includes('.jpg')) {
        return <Photo/>
    } else {
        return (
            <div className="relative">
                <Empty/>
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">FILE</div>
            </div>
        )
    }
};

export default AttachmentViewer;