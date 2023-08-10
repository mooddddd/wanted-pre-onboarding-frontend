import { Routes, Route } from 'react-router-dom';
import { Header } from '../organisms/layout/header';
import { Main, Signin, Signup, Todo } from '../pages';
import { Footer } from '../organisms/layout/footer';

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
