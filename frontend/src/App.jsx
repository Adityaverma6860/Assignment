import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SinglePost from './Pages/SinglePost';
import EditPost from './Pages/EditPost';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
