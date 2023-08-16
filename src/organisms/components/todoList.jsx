import { useState } from 'react';
import {
  CheckBoxStyled,
  ListStyle,
  ModifyInput,
  LeftButton,
} from '../../pages/styled';
import { request, setAccessToken } from '../utils';

export const TodoList = ({ list, token, getList }) => {
  const [modify, setModify] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [deleteId, setDeleteId] = useState(null);

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

  return todoMap;
};
