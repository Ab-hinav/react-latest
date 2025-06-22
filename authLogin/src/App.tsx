import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import AppBar from './components/AppBar';
import AmazonCart from './pages/amazonCart';
import { RecoilRoot } from 'recoil';
import WishListPage from './pages/wishListPage';

const Layout = () => {

  return (
    <div className='min-h-screen flex flex-col' >
      <AppBar />
      <Outlet />
    </div>
  );
};




function App() {


  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<AmazonCart />} />
            <Route path="/wish-list" element={<WishListPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App
