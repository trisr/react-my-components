import { createContext, useContext, useReducer } from "react";

const PostsContext = createContext<any>(null);

const postsReducer = (state: any[], action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...state, action.payload];
        case 'REMOVE_POST':
            return state.filter((_: any, index: any) => index !== action.payload);
        default:
            return state;
    }
}

export const PostsProvider = ({children}: any) => {
    const [posts, dispatch] = useReducer(postsReducer, []);

    return (
        <PostsContext.Provider value={{ posts, dispatch }}>
            {children}
        </PostsContext.Provider>
    )
}

export const usePosts = () => {
    return useContext(PostsContext);
}