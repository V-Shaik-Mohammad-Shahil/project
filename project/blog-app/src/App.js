import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch all blog posts from the back-end API
    axios.get('http://your-backend-api-url/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  const handleCreatePost = () => {
    // Send a new blog post to the back-end API
    axios.post('http://your-backend-api-url/api/posts', { title, content })
      .then((response) => {
        console.log('Blog post created:', response.data);
        // Refresh the list of blog posts after successful creation
        axios.get('http://your-backend-api-url/api/posts')
          .then((response) => {
            setPosts(response.data);
          })
          .catch((error) => {
            console.error('Error fetching blog posts:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating blog post:', error);
      });
  };

  return (
    <div>
      <h1>Blog App</h1>
      <div>
        <h2>Create a New Blog Post</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      <div>
        <h2>Existing Blog Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
