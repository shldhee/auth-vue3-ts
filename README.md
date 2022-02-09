# auth-vue3-ts

## 프로젝트 실행 방법

- node version : v14.17.0
- npm version : v6.14.13

```

$ npm ci or $ npm install

$ npm run serve
```

## 주 사용 라이브러리와 사용 의도

### vue3

- 2022/2/7 기준으로 vue3가 default version ([link](https://blog.vuejs.org/posts/vue-3-as-the-new-default.html))

### pinia

- 상태 관리 라이브러리
- `Vuex`보다 편리하고 직관적으로 사용 가능
- `Mutations`이 없어 코드가 간결해진다.
- `Typescript`를 잘 지원하고 `Autocompletion`도 빠르고 정확
- VueConf 2021에서 제안되었다. (Vuex5 구현체로 Pinia를 작성)

<img src="https://media.vlpt.us/images/eggplantiny/post/699066c8-f4c7-4cc3-9ad3-43bc3b89c5b4/KakaoTalk_20211125_225344889.webp" width="640px" height="372px" title="2021 vueconf toronto"></img>

## 프로젝트 폴더 구조와 설계 의도

```
--src
----assets : 에셋 모음(이미지, 스타일 등)
----components : 컴포넌트 파일
----router : 라우터 관리(프로젝트 페이지 구성)
----services : API 통신, LocalStorage 관련
----store : 상태 관리(pinia 관련)
----utils : 유틸 함수 관리
----views : 페이지 관리(라우터 관련)
```

- 역할 구분을 효율적으로 하기 위해 폴더명을 하는 역할에 맞게 작성
- 규모가 커지고 기능이 추가되면 기능에 맞게 폴더를 추가
- auth 말고 다른 도메인, 모듈이 추가되면 상위 폴더내 형제폴더로 구성

## 컴포넌트 구조와 설계 의도

```
-- components
---- BasicButton.vue - 글로벌 버튼 컴포넌트
---- BasicInput.vue - 글로벌 인풋 컴포넌트
---- Counter.vue - 인증 코드 타이머 컴포넌트
---- UserCard.vue - 회원 정보 카드 컴포넌트
```

- 컴포넌트 수가 많아지면 `common, auth, user`로 하위 폴더로 만들면서 확장
- 버튼, 인풋폼이 공통으로 사용되어 컴포넌트로 만들고 props, slot을 사용해 커스텀을 가능하게 제작

## (상태 관리를 사용한 경우) 상태 관리의 구조와 설계 의도

-- store
---- auth.ts - state, actions, getters로 구성되어 있다. (getters는 사용하지 않고 있다.)

- `pinia`는 중첩 구조가 없고 평면 구조이다.
- 따라서 각 기능에 맞는 스토어가 추가되면 `store` 폴더 아래 `auth.ts`와 동일하게 작성해주면 된다.
- 제공되는 API들이 auth 관련이라서 한 파일에 작성

```
- No more nested structuring of modules. You can still nest stores implicitly by importing and using a store inside another but Pinia offers a flat structuring by design while still enabling ways of cross composition among stores. You can even have circular dependencies of stores.

- No namespaced modules. Given the flat architecture of stores, "namespacing" stores is inherent to how they are defined and you could say all stores are namespaced.
```

## (테스트를 작성한 경우) 테스트 시나리오 작성 의도와 목적

-

## 리뷰어에게 강조하고 싶은 부분 또는 그 외 기타 내용

- 새로운 기술과 문법을 사용하게 된 이유를 설명드리겠습니다.

- 실무에서 Vue2, Javacsript 구조로 작업을 했습니다. Typescript를 적용해보려고 했지만, 여러가지 문제로 하지 못했습니다. 따라서 Typescript를 학습하기 위해 React, Typescript를 사용해 개인공부와 토이프로젝트를 진행하고 있었습니다.

- 이번에 Typescript를 사용해야 하는데 React를 사용해 작업하려고 했으나, 실무에서 더 많이 쓰고 트러블 슈팅에 편한 Vue를 사용하기로 했습니다. 이제 표준이된 Vue3는 Typescript 지원이 좋아졌고 Setup, Compoisition API를 활용해 더 효율적인 코드를 작성하고자 했습니다. 더 좋은 코드, 더 효율적인 코드를 작성하기 위해 구글링을 통해 새로운 기술들을 보고 적용했습니다.
