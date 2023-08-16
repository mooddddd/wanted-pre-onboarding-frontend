import { useEffect, useState } from 'react';
import { request, setAccessToken } from '../organisms/utils';
import { useInput } from '../organisms/hooks';
import { useNavigate } from 'react-router-dom';
import {
  AddListButton,
  CheckBoxStyled,
  FormStyle,
  LeftButton,
  ListStyle,
  ModifyInput,
  TodoContentWrapper,
  TodoWrapper,
} from './styled';

export const Todo = () => {
  const [list, setList] = useState([]);
  const [modify, setModify] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [deleteId, setDeleteId] = useState(null);

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

  // 체크박스 업데이트
  const checkHandler = async (todoId, isCompleted) => {
    try {
      setAccessToken(token);
      const body = {
        todo: list.find((v) => v.id === todoId).todo,
        isCompleted,
      };
      await request.put(`/todos/${todoId}`, body);
      getList();
    } catch (e) {
      console.log(e.message);
    }
  };

  // 내용 수정
  const newTodoHandler = (e) => {
    setNewTodo(e.target.value);
  };
  const modifyTodoId = (todoId) => {
    setModify(todoId);
  };
  const modifyHandler = async (todoId, newTodo) => {
    try {
      setAccessToken(token);
      const body = {
        todo: newTodo,
        isCompleted: list.find((v) => v.id === todoId).isCompleted,
      };
      await request.put(`/todos/${todoId}`, body);
      setModify(null);
      getList();
    } catch (e) {
      console.log(e.message);
    }
  };

  // 삭제
  const deleteHandler = async (todoId) => {
    setDeleteId(todoId);
    try {
      setAccessToken(token);
      await request.delete(`/todos/${todoId}`);
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

  const todoMap = list.map((v) => (
    <ListStyle key={v.id}>
      {modify === v.id ? (
        <form>
          <label>
            <CheckBoxStyled
              type='checkbox'
              checked={v.isCompleted}
              onChange={(e) => {
                e.preventDefault();
                checkHandler(v.id, e.target.checked);
              }}
            />
            <ModifyInput
              data-testid='modify-input'
              defaultValue={v.todo}
              onChange={newTodoHandler}
            />
          </label>
          <LeftButton
            data-testid='submit-button'
            onClick={(e) => {
              e.preventDefault();
              modifyHandler(v.id, newTodo);
            }}
          >
            제출
          </LeftButton>
          <button data-testid='cancel-button' onClick={() => setModify(null)}>
            취소
          </button>
        </form>
      ) : (
        <>
          <label>
            <CheckBoxStyled
              type='checkbox'
              checked={v.isCompleted}
              onChange={(e) => {
                e.preventDefault();
                checkHandler(v.id, e.target.checked);
              }}
            />
            <span>{v.todo}</span>
          </label>
          <LeftButton
            data-testid='modify-button'
            onClick={(e) => {
              e.preventDefault();
              modifyTodoId(v.id);
            }}
          >
            수정
          </LeftButton>
          <button
            data-testid='delete-button'
            onClick={(e) => {
              e.preventDefault();
              deleteHandler(v.id);
            }}
          >
            삭제
          </button>
        </>
      )}
    </ListStyle>
  ));

  return (
    <>
      <TodoWrapper>
        <TodoContentWrapper>
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

          <ul>{todoMap}</ul>
        </TodoContentWrapper>
      </TodoWrapper>
    </>
  );
};
