import {useState} from 'react';

const ChatView = () => {
    const [hidden, setHidden] = useState<boolean>(false);
    return (
        <div className="flex w-full gap-2">
            <div className="flex-1 bg-gray-600">
                <div>
                    <button onClick={() => setHidden(!hidden)}>click hidden</button>
                </div>
            </div>
            <div className={`flex-none w-80 ease-out ${hidden && 'hidden'}`}>tab</div>
        </div>
    );
};

export default ChatView;