import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { PostsList } from "./components/posts/PostsList";
import { NewPostForm } from "./components/posts/NewPostForm";
import { PostDetails } from "./components/posts/PostDetails";
import { NoRoute } from "./components/layouts/NoRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/new" element={<NewPostForm />} />
        <Route path="*" element={<NoRoute />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
