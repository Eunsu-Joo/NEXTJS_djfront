![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=DJ%20Event%20Page%20With%20NEXT.JS&fontSize=60&animation=fadeIn)

# 🚀 DJ Events Page with Next.js & Strapi

## 🔹 Project Function

> - 로그인 / 회원가입
> - 이벤트 페이지 추가 / 이미지 업로드
> - 이벤트 페이지 수정 / 삭제 (사용자 일 경우)
> - JWT 토큰 해더 추가 & 검증
> - 페이지네이션
> - google map으로 이벤트 장소 노출

## 🔹 Packages

```javascript
  "name": "dj-event-page-width-next",
  "dependencies": {
    "axios": "^0.26.1",
    "cookie": "^0.4.2",
    "lodash": "^4.17.21",
    "mapbox-gl": "^2.7.1",
    "moment": "^2.29.1",
    "next": "12.1.0",
    "qs": "^6.10.3",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-geocode": "^0.2.3",
    "react-icons": "^4.3.1",
    "react-map-gl": "^7.0.10",
    "react-toastify": "^8.2.0",
    "sass": "^1.49.9"
  },
    "devDependencies": {
    "eslint": "8.11.0",
    "eslint-config-next": "12.1.0"
  }
```

## 🔹 Directory Config

- `components`
- `config`
- `context`
- `helpers`
- `pages`
- `public`
- `styles`

### ◼ Directory Rules

#### ◽ Components

**example) Header Component**

- `components`
  - `Header`
    - `index.js`
    - `Header.module.scss`

#### ◽ CSS

CSS는 SCSS 전처리기를 사용했으며, 컴포넌트의 경우 `Directory_name.module.scss` 로 모듈 scss를 사용했으며, input, btn은 프로젝트의 크기가 크지 않아 `global.scss`, 페이지의 경우 `pages.scss`를 생성해 `_app.js`에서 import 했음.

## 🔹 전역 state

### ◼ useContext 사용

` context/AuthContext.js` 생성해서, App을 감싸서 사용함.
컴포넌트 props를 많이 타고 들어가는 로그인 / 회원가입 / user 정보를 state에 저장함.

```javascript
const { user, error, login, logout, checkUser, register } = useContext(AuthContext);
```

## 🔹Backend 처리

### ◼ Strapi CMS 프레임워크 사용

<a  href="https://strapi.io/">🚀 Strapi 공식 홈페이지 </a>

> **Strapi란?**
>
> - Bootstrap + API를 줄여서 Strapi라고 한다. Strapi는 Node.js 웹 프레임워크 중 하나인 Koa 기반으로 구현되었으며, 풀 커스터마이징이 가능한 개발자 우선(Developer-first) 오픈소스 Headless CMS이다.

### ◼ Heroku 배포

<a  href="https://dashboard.heroku.com/apps">💪🏻 Heroku 공식 홈페이지 </a>

> **Heroku란?**
>
> - Heroku는 Java, Node.js, Python등 여러 언어를 지원하는 클라우드 Paas(Platform as a Service, PaaS). 클라우드 컴퓨팅 서비스 분류 중 하나임.

### ◼ Cloudinary Image Upload

<a  href="https://cloudinary.com/">🖼 Cloudinary 공식 홈페이지 </a>

> **Cloudinary란 ?**
>
> - Cloudinary는 클라우드 기반의 이미지 및 비디오 관리 서비스.
