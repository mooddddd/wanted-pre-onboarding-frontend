import { useEffect, useState } from 'react';
import { request, setAccessToken } from '../organisms/utils';
import { useInput } from '../organisms/hooks';

export const Todo = () => {
  const [list, setList] = useState([]);
  const [modify, setModify] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const todo = useInput('');
  const data = localStorage.getItem('access_token').split('"');
  const token = data[1];

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
      const { data } = await request.put(`/todos/${todoId}`, body);
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
      const { data } = await request.put(`/todos/${todoId}`, body);
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
      if (!token) return;
      try {
        getList();
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const todoMap = list.map((v) => (
    <li key={v.id}>
      {modify === v.id ? (
        <form>
          <label>
            <input
              type='checkbox'
              checked={v.isCompleted}
              onChange={(e) => {
                e.preventDefault();
                checkHandler(v.id, e.target.checked);
              }}
            />
            <input
              data-testid='modify-input'
              defaultValue={v.todo}
              onChange={newTodoHandler}
            />
          </label>
          <button
            data-testid='submit-button'
            onClick={(e) => {
              e.preventDefault();
              modifyHandler(v.id, newTodo);
            }}
          >
            제출
          </button>
          <button data-testid='cancel-button' onClick={() => setModify(null)}>
            취소
          </button>
        </form>
      ) : (
        <>
          <label>
            <input
              type='checkbox'
              checked={v.isCompleted}
              onChange={(e) => {
                e.preventDefault();
                checkHandler(v.id, e.target.checked);
              }}
            />
            <span>{v.todo}</span>
          </label>
          <button
            data-testid='modify-button'
            onClick={(e) => {
              e.preventDefault();
              modifyTodoId(v.id);
            }}
          >
            수정
          </button>
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
    </li>
  ));

  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <input data-testid='new-todo-input' {...todo} />
          <button data-testid='new-todo-add-button' type='submit'>
            추가
          </button>
        </form>

        <ul>{todoMap}</ul>
      </div>
    </>
  );
};
