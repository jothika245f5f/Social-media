import React from 'react'
import Feed from './Feed'
const Home = ({posts}) => {
  console.log(posts,'in home')
  return (
    <main className='Home'>
      {posts.length ? (
        <Feed posts={posts} />
      ): (
        <p style={{marginTop : '2rem'}}>
          No Posts to display
        </p>
      )}
    
</main>
  )
}

export default Home