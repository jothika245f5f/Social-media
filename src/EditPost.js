import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EditPost = ({handleEdit,posts,editPostTitle,editPostBody,
                    setEditPostTitle,setEditPostBody}) => {
   const {id} = useParams();
   console.log(id,'ggyhfg')
   const post= posts.find(post => (post.id).toString() == id); 
   
   useEffect(()=>{
        if(post){
            setEditPostTitle(post.title);
            setEditPostBody(post.body);
        }
   },[post,setEditPostTitle,setEditPostBody])
  return (
    <main className='NewPost'>
        {editPostTitle &&
        <>
        <h1>EditPost</h1>
        <form className='newPostForm' onSubmit={(e)=> e.preventDefault()}>
          <lable htmlFor="postTitle">Edit Title:</lable>
          <input 
          id='postTitle'
          type='text'
          required
          value={editPostTitle}
         onChange={(e) => setEditPostTitle(e.target.value)}
         />

          <label htmlFor='postBody'>Edit Post:</label>
          <textarea 
          id='postBody'
          required
          value={editPostBody}
          onChange={(e) => setEditPostBody(e.target.value)} />

          <button type='submit' onClick={()=> handleEdit(post.id)}> Submit </button>

        </form>
        </>}
    </main>
  )
}

export default EditPost