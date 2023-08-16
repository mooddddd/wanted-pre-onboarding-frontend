# 원티드 프리온보딩 프론트엔드 - 선발 과제

## 지원자 성명

이은지

## 프로젝트 소개

해당 프로젝트는 원티드 프리온보딩 프론트앤드 코스 선발 과정을 위해 제작하였습니다.

- React를 이용하여 구현하였으며 `Sing up(회원가입)`, `Sign in(로그인)`, `Todo List` 총 세 개의 페이지로 구성하였습니다. 정상적 로그인 시 JWT token을 응답으로 받아 로컬스토리지에 저장하며, 로컬스토리지에 저장된 Token의 유무에 따라 Todo List page의 접근 권한이 설정됩니다. Token이 존재하지 않는다면 Todo List 링크 클릭 시 로그인 페이지로 넘어가게 됩니다.

- 회원가입및 로그인 페이지에서 요구되는 이메일의 경우 `@`가 필수적이며 `.` 뒤의 알파벳이 세 개 초과시 올바른 이메일로 인식하지 않습니다.

- Todo List는 checkBox를 통한 완료 여부 설정 가능, List 전체 조회 및 항목 생성, 수정, 삭제 기능을 구현하였습니다.

## 실행방법

### 사용 기술

- React
- Styled-components
- axios
- gh-pages
- Javascript
- Node.js

### 실행하기

배포된 사이트로 접속하여 실행할 수 있습니다.

혹은 npm을 사용하여 로컬에서 실행할 수 있습니다.

```sh
npm install
npm start
```

## 배포 사이트

https://mooddddd.github.io/wanted-pre-onboarding-frontend/#/
