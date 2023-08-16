import { NavLink } from 'react-router-dom';
import { HeaderWrapper, HeaderUl } from './styled/header.styled';

export const Header = () => {
  const menuArr = [
    { title: 'Main', path: '/' },
    { title: 'SignUp', path: 'signup' },
    { title: 'SignIn', path: 'signin' },
    { title: 'Todo', path: 'todo' },
  ];

  const menuMap = menuArr.map((v) => (
    <li key={v.title}>
      <NavLink to={v.path}>{v.title}</NavLink>
    </li>
  ));

  return (
    <HeaderWrapper>
      <HeaderUl>{menuMap}</HeaderUl>
    </HeaderWrapper>
  );
};
