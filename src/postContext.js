
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