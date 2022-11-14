# 오작뀨 :: 탄생석 악세사리 주문제작 쇼핑몰

<div>

</div>

<br />

## 1. 프로젝트 소개

#### 세상에 하나뿐인 추억을 선물할 수 있는 탄생석 악세서리 주문 제작 쇼핑몰입니다.

1. 제품을 탄생석별 / 악세사리 별로 확인 할 수 있습니다
2. 원하는 문구를 이니셜로 각인할 수 있는 서비스를 제공합니다
3. 회원 가입을 하지 않아도 상품을 구경하고 장바구니에 넣을 수 있습니다.

<br />

### 1-1. 데모

### [오작뀨 악세사리 쇼핑몰 바로가기](http://www.ojakkyu.com/)

#### 관리자 계정 테스트

| 이메일   | admin@test.com |
| -------- | -------------- |
| 비밀번호 | 12341234       |

<br />

### 1-2. API 문서

### https://www.notion.so/7-api-ffeb14283ada40e2bbd8a3f930abcd90

<br>

### 1-3. 와이어프레임

### [준비중입니다](#)

<br>

### 1-4. 컨벤션

#### https://www.notion.so/elice/278a7a6fc0e84e54975798502803fae9

<br>

## 2. 기술 스택

<img src="https://kdt-gitlab.elice.io/sw_track/class_03/web_project/team7/ojakkyu/uploads/3f0935427734d2d6a6102f089a7c5693/tech_stack.png" width="640" />

<br>

| 포지션 | 스택                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| FE     | HTML, CSS, JavaScript, [Font-Awesome](https://fontawesome.com), [다음 주소 API](https://postcode.map.daum.net/guide), ... |
| BE     | NodeJS, ExpressJS, MongoDB, Mongoose Babel ...                                                                            |
| Deploy | PM2, NGINX, Goggle Domains                                                                                                |

<br>

<!--
### 1-4. 데모 영상

=== 준비 중 입니다. ===

<details><summary>사용자 회원가입, 로그인</summary>

![image](https://user-images.githubusercontent.com/91174156/172159634-1e105633-9948-464e-a540-5429200a1353.gif)


</details>

<details><summary>카테고리 추가 및 반영</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)

1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<br /> -->

<!--
### 1-3. 페이지 별 화면

=== 준비 중 입니다. ===

|                                              |                                              |
| -------------------------------------------- | -------------------------------------------- |
| ![image](https://i.ibb.co/jyxjcd3/image.png) | ![image](https://i.ibb.co/Q860RKz/image.png) |
| 메인 페이지                                  | 회원가입 화면                                |
| ![image](https://i.ibb.co/RpYN379/image.png) |                                              |
| 로그인 페이지                                | 앞으로 추가할 페이지                         |

<br />
-->

## 3. 페이지별 UI 및 기능 설명

=== 준비중 ===

<br />

## 4. 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

### 4-1. 디렉토리 구조

- FE: `src/views` 폴더
- BE: src/views 이외 폴더 전체

```bash
src
├──.db
│	├──models
│	└──schemas
├──middlewares
├──routers
├──services
│
├──views
│	├──login
│	├──register
│	├──account
│	├──admin
│	├── ...
│	├──components
│	├──styles
│	└──utils
│
└─app.js
```

<br />

## 5. 제작자

| 이름         | 포지션 | 담당 업무                 |
| ------------ | ------ | ------------------------- |
| 유의석(팀장) | BE     | -                         |
| 정지헌       | BE     | -                         |
| 이다노       | FE     | -                         |
| 이유정       | FE     | -                         |
| 김진영       | FE     | 로그인/회원가입, 개인정보 |

<br />

## 6. 로컬 환경 실행

### 6.1. Git Clone

```bash
git clone https://kdt-gitlab.elice.io/sw_track/class_03/web_project/team7/ojakkyu.git
```

### 6.2. Node Package 설치

```bash
npm install
```

### 6.3. `.env`(환경 변수) 설정

```bash
MONGODB_URL=<몽고DB URL>
PORT=3000
```

### 6.4. express 앱 실행

```bash
npm start
```

<br>

## 7. 버전

> ### 1.0.0 : 최초 배포 22.11.11
