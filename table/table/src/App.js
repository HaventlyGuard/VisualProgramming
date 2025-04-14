import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';

const Comments = lazy(() => import('./pages/Comments'));
const Posts = lazy(() => import('./pages/Posts'));
const Albums = lazy(() => import('./pages/Albums'));
const Todos = lazy(() => import('./pages/Todos'));
const Users = lazy(() => import('./pages/Users'));

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Comments />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Suspense>
          </Layout>
        </div>
      </BrowserRouter>
  );
}

export default App;