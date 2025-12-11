# Startup Hub 3D Showroom - PRD (Product Requirements Document)

## 1. 프로젝트 개요 (Project Overview)
**Startup Hub**는 다양한 스타트업을 한눈에 모아보고, 각 기업의 아이덴티티가 담긴 **3D 쇼룸**을 탐험할 수 있는 인터랙티브 웹 플랫폼입니다.
일반적인 2D 배너 형태의 대시보드에서 시작하여, 흥미를 느낀 기업을 클릭하면 몰입형 3D 공간으로 전환되는 경험을 제공합니다.

### 1.1 목표 (Goals)
- **MVP (Minimum Viable Product)**: 핵심 기능(대시보드 ↔ 3D 쇼룸 이동, 기본 상호작용)이 작동하는 프로토타입 완성.
- **애자일 개발**: 복잡한 3D 모델링보다는 '공간감'과 '정보 전달'에 집중하여 빠르게 배포 가능한 형태 구현.
- **확장성**: 추후 멀티플레이어(Avatar), 채팅, 실제 데이터 연동이 가능하도록 유연한 아키텍처 설계.

---

## 2. 핵심 기능 (Core Features)

### 2.1 메인 대시보드 (2D)
- **스타트업 리스트**: 카드/배너 형태의 스타트업 목록 표시.
- **검색/필터**: 카테고리별(핀테크, AI, 바이오 등) 필터링 (MVP에서는 목업 데이터 기반).
- **진입 트리거**: 카드 클릭 시 해당 스타트업의 3D 쇼룸 페이지로 라우팅 (`/exhibition/:id`).

### 2.2 3D 쇼룸 (3D Exhibition Hall)
- **공간 구성**: 스타트업의 테마(Modern, Tech, Eco 등)에 맞는 3D 건물/방 렌더링.
- **인터랙티브 오브젝트**:
    - **Info Kiosk**: 클릭 시 회사 소개 모달 팝업.
    - **Status Board**: 클릭 시 채용 정보나 뉴스 표시.
    - **Product Stand**: 주요 제품 3D 모델 뷰어.
- **네비게이션**:
    - 마우스 드래그로 시점 변환 (OrbitControls).
    - (Optional) 키보드 WASD로 간단한 카메라 이동.
- **UI 오버레이**: 3D 화면 위에 닫기 버튼, 간단한 안내 문구 표시.

---

## 3. 사용자 흐름 (User Flow)
1. **접속**: 메인 페이지 (`/`) 접속.
2. **탐색**: 대시보드에서 관심 있는 스타트업 발견.
3. **진입**: 스타트업 카드 클릭 -> 로딩 화면 -> 3D 쇼룸 입장.
4. **경험**: 3D 공간을 둘러보고 키오스크 등을 클릭하여 정보 습득.
5. **복귀**: '나가기' 버튼 클릭 -> 메인 대시보드로 복귀.

---

## 4. 시스템 아키텍처 (System Architecture)

제안해주신 구조를 기반으로, **확장성**과 **R3F(React Three Fiber) 최적화**를 고려하여 소폭 다듬었습니다.

```
src/
├── assets/                  # 로컬 정적 자원 (이미지, 아이콘)
│
├── components/
│   ├── canvas/              # [3D] R3F 관련 컴포넌트
│   │   ├── Buildings/       # 건물/방 모델 (Lazy Loading 권장)
│   │   ├── Props/           # 상호작용 가능한 작은 3D 객체들
│   │   ├── Effects/         # 조명, Post-processing, 환경 설정
│   │   └── Camera/          # 카메라 컨트롤 (Orbit, FirstPerson)
│   │
│   ├── ui/                  # [2D] 일반 DOM UI 컴포넌트
│   │   ├── Dashboard/       # 메인 페이지 전용 (Card, List)
│   │   ├── Overlay/         # 3D 위에 뜨는 UI (Modal, Tooltip)
│   │   └── Common/          # 버튼, 인풋 등 공통 아토믹 컴포넌트
│   │
│   └── layout/              # 페이지 레이아웃 (Header, Footer, CanvasWrapper)
│
├── hooks/                   # 커스텀 훅
│   ├── useStore.js          # (Zustand) 전역 상태 (현재 선택된 스타트업, 모달 상태)
│   └── useInteract.js       # 3D 오브젝트 호버/클릭 로직 추상화
│
├── pages/
│   ├── DashboardPage.jsx    # 메인 (2D)
│   └── ExhibitionPage.jsx   # 상세 (3D Canvas 포함)
│
├── utils/                   # 유틸리티 함수
│   ├── math.js              # 3D 좌표 계산 등
│   └── constants.js         # 설정값 (카메라 초기 위치, 색상 팔레트)
│
├── data/                    # 목업 데이터
│   └── startups.json        # 스타트업 메타 데이터
│
├── App.jsx                  # 라우팅 (React Router)
└── main.jsx                 # Entry Point
```

### 주요 변경/제안 사항
1. **`components/layout`**: 2D 페이지와 3D 페이지의 레이아웃 구조가 다를 수 있으므로 분리.
2. **`components/canvas/Effects`**: 조명(`SceneEnv`)과 후처리 효과를 관리하는 폴더.
3. **`utils`**: 3D 개발 시 자주 쓰이는 수학 함수나 상수 관리를 위해 추가.

---

## 5. 기술 스택 (Tech Stack)
- **Core**: React, Vite
- **3D**: React Three Fiber (R3F), Drei (유틸리티), Rapier (물리 엔진 - 필요시)
- **State**: Zustand (가볍고 3D와 2D 간 상태 공유에 적합)
- **Styling**: TailwindCSS (빠른 UI 프로토타이핑)
- **Routing**: React Router v6
- **Animation**: Framer Motion (2D UI), React Spring or Maath (3D 보간)

## 6. 마일스톤 (Milestones)
1. **Week 1 (Foundation)**: 프로젝트 세팅, 라우팅, 기본 2D 대시보드 구현.
2. **Week 1 (3D Core)**: R3F 캔버스 세팅, 기본 큐브/평면으로 공간 구성, 카메라 컨트롤.
3. **Week 2 (Interaction)**: 3D 오브젝트 클릭 시 Zustand 상태 변경 -> 2D 모달 팝업 연동.
4. **Week 2 (Polish)**: 무료 3D 에셋(GLB) 적용, 조명/그림자 개선, 배포.
