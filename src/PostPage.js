import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PostPage = ({posts,handleDelete}) => {
  const {id} = useParams();
  console.log(id,'id')
  const post= posts.find((post)=>(post.id).toString() === id);
  return (
   <main className='PostPage'>
     <article className='post'>
      {post && 
      <>
         <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{ post.body} </p>
        <Link to={`/edit/${post.id}`}>
          <button >Edit Post</button>
        </Link>
        <button onClick={() => handleDelete(post.id)}>
          Delete Post
        </button>
        </>

        }
        {!post &&
        <>
        <h2>POst not found</h2>
        <Link to={'/'}><h2>Visit our home page</h2></Link>
        </>
        }

    </article>
    
   </main>
  )
}

export default PostPage