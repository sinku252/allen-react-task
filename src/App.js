import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import LoadingSpinner from './common/LoadingSpinner';
import CreateUserComponent from './components/CreateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import ListPostComponent from './components/ListPostComponent';
import AddPostComment from './components/AddPostComment';
import ListPostComment from './components/ListPostComment';
import CreatePostComponent from './components/CreatePostComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListUserComponent />} />
            <Route path="/add-user/:id" element={<CreateUserComponent />} />
            <Route path="/view-user/:id" element={<ViewUserComponent />} />
            <Route path="/user-posts/:id" element={<ListPostComponent />} />
            <Route path="/add-post-comment/:id" element={<AddPostComment />} />
            <Route path="/view-post-comments/:id" element={<ListPostComment />} />
            <Route path="/create-post/:id" element={<CreatePostComponent />} />
            
            
            
          </Routes>

        </div>
        <FooterComponent />
      </Router>
    </div>

  );
}

export default App;