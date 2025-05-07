import { createContext, useState } from 'react';

export const BlogContext = createContext();

const dummyPosts = [
        {
          id: '1',
          title: 'First Blog',
          content: 'Welcome to our very first blog post! In this post, we share the journey of starting this blog and what kind of content you can expect in the future.',
          image: 'https://picsum.photos/200/300',
        },
        {
          id: '2',
          title: 'Second Blog',
          content: 'In this post, we explore how React and Tailwind CSS can be combined to build modern, responsive UIs quickly. Learn some quick tips and tricks to level up your frontend development.',
          image: 'https://picsum.photos/seed/picsum/200/300',
        },
        {
          id: '3',
          title: 'Third Blog',
          content: 'State management is crucial for large applications. Here, we dive deep into using Context API effectively and when to consider more advanced libraries like Redux or Zustand.',
          image: 'https://picsum.photos/seed/tech/200/300',
        },
        {
          id: '4',
          title: 'Fourth Blog',
          content: 'Learn how to structure your React project for scalability and maintainability. From file organization to custom hooks, this guide covers everything you need to build enterprise-ready apps.',
          image: 'https://picsum.photos/seed/scalable/200/300',
        }
      ];
      
  


export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState(dummyPosts);

  const addPost = (post) => setPosts([...posts, post]);
  const updatePost = (updated) => setPosts(posts.map(p => p.id === updated.id ? updated : p));
  const deletePost = (id) => setPosts(posts.filter(p => p.id !== id));

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};
