import React, {createContext, ReactNode, useState} from 'react';

export interface TabSelected {
    chat: {
        tabId: string;
        isSelected: boolean;
    },
    contact: {
        tabId: number;
        isSelected: boolean;
    }
}

const initialState: TabSelected = {
    chat: {
        tabId: "",
        isSelected: true,
    },
    contact: {
        tabId: 0,
        isSelected: false,
    }
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
    const [tabSelected, setTabSelected] = useState<TabSelected>(initialState);

    return (
        <AppContext.Provider value={{tabSelected, setTabSelected}}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
export {AppContext}