import { useContext } from 'react';
import { BlogContext } from '../Context/BlogContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { posts } = useContext(BlogContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Blog Posts</h1>
      <Link to="/edit/new" className="bg-blue-300 text-white px-4 py-2 rounded inline-block mb-4">Add Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-4 border-b pb-4">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <Link to={`/post/${post.id}`} className="text-blue-200 text-lg font-semibold block mb-1">
              {post.title}
            </Link>
            <p className=" text-md">{post.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
