export const Todo = () => {
  const contentTest = [
    { id: 1, todo: '과제하기', isCompleted: false, userId: 1 },
    { id: 2, todo: '동물의 숲 하기', isCompleted: false, userId: 1 },
    { id: 3, todo: '커피 마시기', isCompleted: false, userId: 1 },
  ];
  return (
    <>
      <div>
        <div>
          <input data-testid='new-todo-input' />
          <button data-testid='new-todo-add-button'>추가</button>
        </div>

        <ul>
          <li>
            <label>
              <input type='checkbox' />
              <span>TODO 1</span>
            </label>
            <button data-testid='modify-button'>수정</button>
            <button data-testid='delete-button'>삭제</button>
          </li>

          <li>
            <label>
              <input type='checkbox' />
              <input data-testid='modify-input' />
            </label>
            <button data-testid='submit-button'>제출</button>
            <button data-testid='cancel-button'>취소</button>
          </li>
        </ul>
      </div>
    </>
  );
};

// todo list 목록 보이기
// 내용과 완료 여부 표시 필수
//
