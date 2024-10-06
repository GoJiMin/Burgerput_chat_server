# Burgerput 채팅 서버 리포지토리

![burgerchat_main.png](https://github.com/user-attachments/assets/107bf4e1-a117-46f0-b144-2f226de382ea)
### 배포 URL : https://burgerput-chat.site

<br>

## 프로젝트 소개

버거풋 기능 중 관리자에게 문의하기 기능을 수행하기 위한 채팅 서버 프로젝트입니다.

### 프로젝트를 시작하게 된 배경

기존 버거풋 프로젝트에서 발생하는 문제를 빠르게 해결하고, 관리자가 실시간으로 피드백을 제공할 수 있는 시스템을 만들기 위한 목표로 시작되었습니다. 
사용자 경험을 개선하기 위해 관리자와의 원활한 소통이 필수적이라 판단하여 이 채팅 서버를 구축하게 되었습니다.

### 프로젝트 주요 기능

- 실시간 소통을 위한 WebSocket 연결: 채팅 서버는 Socket.io를 사용하여 실시간으로 관리자를 연결하는 기능을 제공합니다.
- 메시지 전송 및 수신: Socket.io의 .on()과 .emit() 메서드를 통해 실시간으로 메시지를 주고받습니다.

<br>

## 1. 개발 환경

### 사용 기술
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![socket.io](https://img.shields.io/badge/Web%20Socket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![zustand](https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white")
![Next-Auth](https://img.shields.io/badge/nextauth-191919?style=for-the-badge&logo=nextauth&logoColor=black)

### 버전 관리
![git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![github](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github)

### 인프라
![linux](https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![githubactions](https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![amazonaws](https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws)
![amazons3](https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![amazonec2](https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)

<br>

## 2. 채택한 기술
    
### Next.js

- **커스텀 서버 기능**: Next.js의 커스텀 서버 기능을 통해 복잡한 백엔드 인프라를 구축하지 않고도 간편하게 서버를 설정할 수 있었습니다. Socket.io를 Next.js 커스텀 서버에 통합하여, 실시간 채팅 기능을 구현하는 것이 매우 편리했습니다.

- **백엔드와 프론트의 유연한 동작**: Next.js는 백엔드와 프론트엔드가 유연하게 동작할 수 있어, 커스텀 서버로 채팅 서버를 구축하면서 동시에 채팅에 참여하는 클라이언트 페이지도 함께 개발할 수 있었습니다. 별도로 백엔드와 프론트를 관리할 필요 없이, 하나의 프레임워크 내에서 서버와 클라이언트 기능을 모두 구현할 수 있었습니다.

- **API Routes**: Next.js의 API Routes 기능을 사용하여, 별도의 백엔드 서버 없이도 손쉽게 API 엔드포인트를 만들 수 있었습니다. 특히, node-mailer를 이용해 관리자에게 메일을 보내는 기능을 Next.js API Routes를 통해 간편하게 구현할 수 있었습니다.

### Socket.io

- **실시간 양방향 통신 지원**: Socket.io는 실시간으로 양방향 통신을 지원하기 때문에, 사용자가 관리자와 실시간으로 소통할 수 있는 기능을 손쉽게 구현할 수 있었습니다.

- **간편한 채팅 기능 구현**: Socket.io는 이벤트 기반 아키텍처로 .on()과 .emit() 같은 메서드를 통해 손쉽게 이벤트를 등록하고 데이터를 주고받을 수 있어, 실시간 메시지 전송 및 수신을 구현하는 데 매우 유리했습니다.

- **크로스 플랫폼 지원**: Socket.io는 다양한 플랫폼에서 지원되기 때문에, 관리자 페이지를 모바일로 주로 접속하는 데 있어 유리했습니다. 이를 통해 데스크탑과 모바일 모두에서 일관된 채팅 기능을 제공할 수 있어, 관리자와 사용자 모두에게 편리한 채팅 환경을 구축할 수 있었습니다.

### Next-Auth

- **간편한 인증 구현**: Next-Auth는 복잡한 인증 로직을 간단하게 구현할 수 있도록 지원합니다. 특히, Credentials Provider를 사용하여 ID와 비밀번호를 통한 로그인 인증을 쉽게 설정할 수 있었으며, 이를 통해 별도의 백엔드 로직을 작성하지 않고도 인증을 처리할 수 있었습니다.

## 3. 프로젝트 구조
```
├─scripts
└─src
    └─app
        ├─api
        │  ├─auth
        │  │  └─[...nextauth]
        │  └─entrance
        ├─auth
        │  └─signin
        ├─components
        │  └─ui
        ├─context
        ├─fonts
        ├─hooks
        ├─lib
        ├─model
        ├─services
        ├─socket
        └─store                
```

<br>

## 4. 페이지별 기능

### [로그인 화면]
| 로그인 화면 - desktop | 로그인 화면 - mobile |
|----------|----------|
|![desktop_login_page](https://github.com/user-attachments/assets/0203369f-0c88-408f-b334-36392f2c6b6a)|![mobile_login_page](https://github.com/user-attachments/assets/1a8a39b0-3f84-44dd-9eaf-6c716d82abc4)|
- 루트 경로 및 하위 경로에 대한 접근 시 토큰 검사 후 토큰이 없을 경우 보여지는 페이지입니다.
  - 각 경로에 대한 토큰 검사는 Next.js의 middleware를 통해 이루어집니다.

<br>

### [메인 화면]
| 메인 화면 - desktop | 메인 화면 - mobile |
|----------|----------|
|![desktop_chat_test](https://github.com/user-attachments/assets/7afbe08e-a85f-4bda-921b-bdb3567737ab)|![mobile_chat_test](https://github.com/user-attachments/assets/778adb60-a0fd-4736-be84-aec18f777629)|
- 메인 화면을 통해 버거풋 사용자와 채팅이 가능합니다.

<br>

## 5. 인프라 🧬

### 인프라 구조

![infra](https://github.com/user-attachments/assets/575e0739-0151-4a3d-8374-548fbf000266)

### CI/CD 파이프라인

![ci-cd](https://github.com/user-attachments/assets/c4e19980-7ebd-49e0-9446-78f9e721c0f9)

<br />
