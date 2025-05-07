import React from 'react';

const BlogForm = ({ formData, onChange, onSubmit, isEdit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Enter title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={onChange}
        placeholder="Enter content"
        className="w-full p-2 border rounded h-40"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {isEdit ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default BlogForm;
