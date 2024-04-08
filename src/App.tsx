import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/LoginPage';
import PrivateLayout from './layouts/PrivateLayout';
import HomePage from './pages/HomePage';
import TransferPage from './pages/TransferPage';
import RechargePage from './pages/RechargePage';
import CryptoPage from './pages/CryptoPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import RegisterPage from './pages/RegisterPage';


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />}/>
      <Route element={<PrivateLayout />}>
        <Route index path="/home" element={<HomePage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Help" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
