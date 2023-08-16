import { useEffect, useState } from 'react';
import { request, setAccessToken } from '../organisms/utils';
import { useInput } from '../organisms/hooks';
import { useNavigate } from 'react-router-dom';
import {
  AddListButton,
  FormStyle,
  TodoContentWrapper,
  TodoWrapper,
} from './styled';
import { TodoList } from '../organisms/components/todoList';

export const Todo = () => {
  const [list, setList] = useState([]);

  const todo = useInput('');
  const data = localStorage.getItem('access_token');
  const token = data ? data.split('"')[1] : null;

  const navigate = useNavigate();

  // 리스트
  const getList = async () => {
    setAccessToken(token);
    const { data } = await request.get('/todos');
    setList(data);
  };

  // 등록
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setAccessToken(token);
      let body = {
        todo: todo.value,
      };
      await request.post('/todos', body);
      todo.setValue('');
      getList();
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (!token) return navigate('/signin');
      try {
        getList();
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <>
      <TodoWrapper>
        <TodoContentWrapper>
          <h1>Todo List</h1>
          <FormStyle onSubmit={submitHandler}>
            <input
              data-testid='new-todo-input'
              value={todo.value}
              onChange={todo.onChange}
              placeholder='내용을 입력해주세요.'
            />
            <AddListButton data-testid='new-todo-add-button' type='submit'>
              추가
            </AddListButton>
          </FormStyle>

          <ul>
            <TodoList list={list} token={token} getList={getList} />
          </ul>
        </TodoContentWrapper>
      </TodoWrapper>
    </>
  );
};
