import { usePosts } from "@/contexts/usePost";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

const App = () => {
    const { posts, dispatch } = usePosts();
  
    const addPost = () => {
      dispatch({ type: 'ADD_POST', payload: 'New Post' });
    };
  
    const removePost = (index: any) => {
      dispatch({ type: 'REMOVE_POST', payload: index });
    };
  
    return (
      <div>
        <button onClick={addPost}>Add Post</button>
        <ul>
          {posts.map((post: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
            <li key={index}>
              {post} <button onClick={() => removePost(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default App;