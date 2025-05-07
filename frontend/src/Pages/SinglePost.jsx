import { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BlogContext } from '../Context/BlogContext';

const SinglePost = () => {
  const { id } = useParams();
  const { posts, deletePost } = useContext(BlogContext);
  const navigate = useNavigate();

  const post = posts.find(p => p.id === id);
  if (!post) return <div>Post not found</div>;

  const handleDelete = () => {
    deletePost(id);
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>
      <div className="mt-4">
        <Link to={`/edit/${id}`} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Edit</Link>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default SinglePost;
