import { useEffect, useState } from 'react';
import { request, setAccessToken } from '../organisms/utils';
import { useInput } from '../organisms/hooks';

export const Todo = () => {
  const [list, setList] = useState([]);

  const todo = useInput('');
  const data = localStorage.getItem('access_token').split('"');
  const token = data[1];

  const getList = async () => {
    setAccessToken(token);
    const { data } = await request.get('/todos');
    setList(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setAccessToken(token);
      let body = {
        todo: todo.value,
      };
      await request.post('/todos', body);
    } catch (e) {
      console.log(e.message);
    }
  };

  const checkHandler = async (todoId, isCompleted) => {
    try {
      setAccessToken(token);
      const body = {
        todo: list[todoId - 1].todo,
        isCompleted,
      };
      const { data } = await request.put(`/todos/${todoId}`, body);
      console.log(data);
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
        console.log(list);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const todoMap = list.map((v) => (
    <li key={v.id}>
      <label>
        <input
          type='checkbox'
          checked={v.isCompleted}
          onChange={(e) => checkHandler(v.id, e.target.checked)}
        />
        <span>{v.todo}</span>
      </label>
      <button data-testid='modify-button'>수정</button>
      <button data-testid='delete-button'>삭제</button>
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

// todo list 목록 보이기
// 내용과 완료 여부 표시 필수
//

{
  /* <li>
<label>
  <input type='checkbox' />
  <input data-testid='modify-input' />
</label>
<button data-testid='submit-button'>제출</button>
<button data-testid='cancel-button'>취소</button>
</li> */
}
