Output:
<img src="https://res.cloudinary.com/dl26pbek4/image/upload/v1678339542/cn-gifs/postkeeper-app_zq4dms.gif" >

1. **Post Context Creation (postContext.js):**
   - **Original**: The initial step was to create a context for managing posts. This context will provide the necessary state and functions to components that need to interact with posts.
   - **Changes**: 
     - Imported necessary functions and components from React (`createContext`, `useContext`, `useState`).
     - Created a new context using `createContext()`.
     - Implemented a custom hook `usePostContext()` to easily access the context value.
     - Implemented a provider component `PostProvider` that wraps its children with the post context provider.
     - Inside the provider, managed state for saved posts using `useState()`.
     - Defined functions to add posts (`addPost()`) and reset posts (`resetPosts()`).
   - **Why**: Context provides a way to pass data through the component tree without having to pass props down manually at every level. This makes the data accessible to any component in the tree. The custom hook simplifies accessing the context value within components.
   - **Alternatives**: You could also manage state using Redux or other state management libraries, but for simpler applications like this, React context is sufficient and avoids the overhead of additional libraries.
   
```jsx

import React,{createContext, useState,useContext} from 'react';
const PostContext=createContext();
export const usePostContext=()=>useContext(PostContext);
export const PostProvider=({children})=>{
    const [savedPosts,setSavedPosts]=useState([]);
    const addPost=(post)=>{
        setSavedPosts((provPost)=>[...provPost,post]);
    };
    const resetPosts=()=>{
        setSavedPosts([]);
    };
    return (

        <PostContext.Provider value={{savedPosts,addPost,resetPosts}}>
            {children}
        </PostContext.Provider>
    );
}

```

2. **Integration of Post Provider (App.js):**
   - **Original**: The post provider needed to wrap the components that will access the post context to ensure they can access the context values.
   - **Changes**: 
     - Imported the `PostProvider` component.
     - Wrapped the `Navbar` and `List` components with the `PostProvider`.
   - **Why**: Wrapping the components with the provider ensures that any child component within them can access the post context.
   - **Alternatives**: You could wrap individual components with the provider if only specific parts of the application need access to the post context.

```jsx
<PostProvider>
     <div className="App">
      <Navbar />
      <List />
    </div>
   </PostProvider>
```
3. **Updating Navbar Component (Navbar.js):**
   - **Original**: The Navbar component was initially using local state to manage saved posts. It needed to be updated to use the context instead.
   - **Changes**: 
     - Imported the `usePostContext` hook.
     - Removed the local state for saved posts and instead accessed the `savedPosts` and `resetPosts` functions from the post context using the `usePostContext` hook.
   - **Why**: Using context centralizes the state management, ensuring that all components are in sync and reducing complexity.
   - **Alternatives**: You could continue using local state, but it would require passing state and functions down through props, leading to more boilerplate code.

```jsx
export const Navbar = () => {
  const { savedPosts, resetPosts } = usePostContext();

  const showSavedList = savedPosts.length > 0;

  return (
    <div className="navbar">
      <span onClick={resetPosts}>Reset</span>
      {showSavedList && (
        <div className="saved-list">
          {savedPosts.map((p) => (
            <div className="saved-post" key={p.id}>
              <h3>{p.text}</h3>
              <img src={p.img} alt={p.text} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

```

4. **Updating List Component (List.js):**
   - **Original**: The List component needed to be updated to use the `addPost` function from the post context when saving posts.
   - **Changes**: 
     - Imported the `usePostContext` hook.
     - Removed the local state for saved posts and instead accessed the `addPost` function from the post context using the `usePostContext` hook.
   - **Why**: Using context ensures consistency and avoids prop drilling by providing access to the necessary functions directly within the component.
   - **Alternatives**: Similar to the Navbar component, you could continue using local state, but it would lead to redundant state management and potential inconsistency.

```jsx
export const List = () => {
  const { addPost } = usePostContext();

  const handleSave = (post) => {
    addPost(post);
  };

  return (
    <div className="list">
      {posts.map((p) => (
        <div className="post" key={p.id}>
          <h3>{p.text}</h3>
          <img src={p.img} alt={p.text} />
          <img
            src="https://cdn-icons-png.flaticon.com/512/102/102279.png"
            alt="save"
            onClick={() => handleSave(p)}
          />
        </div>
      ))}
    </div>
  );
};

```

By implementing these changes, the application now efficiently manages the state of saved posts using React context, making it easier to maintain and scale as needed.



