import React, {createContext, ReactNode, useState} from 'react';

interface TabSelected {
    type: "CHAT" | "CONTACT";
    id: string | null | number;
}

type AppContextType = {
    tabSelected: TabSelected;
    setTabSelected: React.Dispatch<React.SetStateAction<TabSelected>>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

interface Props {
    children: ReactNode;
}

const AppProvider = ({children}: Props) => {
    const [tabSelected, setTabSelected] = useState<TabSelected>({type: "CHAT", id: null});

    return (
        <AppContext.Provider value={{tabSelected, setTabSelected}}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
export {AppContext}