import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../Context/BlogContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, addPost, updatePost } = useContext(BlogContext);
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    if (isEdit) {
      const existing = posts.find(p => p.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, posts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updatePost({ ...formData, id });
    } else {
      addPost({ ...formData, id: Date.now().toString() });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Content"
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default EditPost;
