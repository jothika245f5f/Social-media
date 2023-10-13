
import './App.css';
import Header from './Header';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Post from './Post';
import PostLayout from './PostLayout';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import call from "./call/Posts"
import EditPost from './EditPost';


function App() {
  const[posts,setPosts]=useState([]);
  const[search,setSearch]= useState('');
  const[searchReslt,setSearchReslt]=useState([]);
  const[postTitle,setPostTitle]=useState('');
  const[postBody,setPostBody]=useState('');
  const[editPostTitle,setEditPostTitle]=useState('');
  const[editPostBody,setEditPostBody]=useState('');
  const navigate= useNavigate()
  const baseURL= "http://localhost:3500/posts";
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try{
      // axios.get(baseURL).then((res)=>{
      //   setPosts(res.data);
      // })
      const res = await call.get("/posts")
      setPosts(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchPosts();
  }, [])

  useEffect(() =>{
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
     setSearchReslt(filteredResults.reverse());
  }, [posts,search]);

  const handleSubmit =async (e) =>{
    e.preventDefault();
    const id= posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime= format(new Date(),'MMMM dd, yyyy pp') ;
    const newPost ={id ,title: postTitle,datetime,body : postBody};
    try{
      const res= await call.post("/posts",newPost);
      const allPost=[...posts,res.data];
    setPosts(allPost);
    setPostTitle('');
    setPostBody('');
    navigate('/');
    }catch(err){
      console.log(err);
    }
  }

  const handleEdit =async (id) =>{
   
    const datetime= format(new Date(),'MMMM dd, yyyy pp') ;
    const updatePost ={id ,title: editPostTitle,datetime, body : editPostBody};
    
    try{
      const res =await call.put(`/posts/${id}`,updatePost);
      setPosts(posts.map((post)=>post.id === id ? {... res.data} : post));
      setEditPostTitle('');
      setEditPostBody('');
      navigate('/');
      // axios.put(baseURL,updatePost).then((res) =>{ 
      //   setPosts(posts.map((post)=>post.id === id ? {... res.data} : post));
      //   setEditPostTitle('');
      //   setEditPostBody('');
      //   navigate('/');
      // })
    }catch(err){
      console.log(err);
    }
  }

  const handleDelete = async (id)=>{
    try{
      await call.delete(`/posts/${id}`)
    
    const allPostAfDel= posts.filter((post)=> post.id !==id);
    setPosts(allPostAfDel);
    navigate('/')
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="App">
      
      {/* <nav>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/postpage'}>PostPage</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/newpost' element={<NewPost />} />
        <Route path='/postpage' element={<PostLayout />}>
            <Route index element={<PostPage />} />
            <Route path=':id' element={<Post />} />
            <Route path='newpost' element={<NewPost />}></Route>
        </Route>
        <Route path='*' element={<Missing />} />

      </Routes> */}
     <Header title="My Media"/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path='/' element={ <Home posts={searchReslt}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/newpost'> 
              <Route index element={<NewPost 
                  handleSubmit={handleSubmit} postTitle={postTitle} 
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                  />} />
              <Route path=':id' element={<PostPage
                  posts={posts} 
                  handleDelete={handleDelete}/>} />
        </Route>
        <Route path='/edit/:id' element={<EditPost 
                  posts={posts} handleEdit={handleEdit}
                  editPostTitle={editPostTitle}
                  editPostBody={editPostBody}
                  setEditPostTitle={setEditPostTitle}
                  setEditPostBody={setEditPostBody}
              />} />
      <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
