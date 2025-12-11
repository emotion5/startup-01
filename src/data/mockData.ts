export interface Company {
    id: string;
    name: string;
    description: string;
    foundedDate: string;
    address: string;
    website: string;
    email: string;
}

export interface Project {
    id: string;
    companyId: string;
    title: string;
    description: string;
    visibility: 'public' | 'private';
    status: 'planning' | 'in-progress' | 'completed';
    progress: number; // 0 to 100
    modelType: 'ModernBuilding' | 'TechBuilding';
    color: string;
}

export const companies: Company[] = [
    {
        id: 'c1',
        name: '에코텍 솔루션 (EcoTech)',
        description: '더 나은 미래를 위한 지속 가능한 에너지.',
        foundedDate: '2021-03-15',
        address: '서울시 강남구 테헤란로 123',
        website: 'https://ecotech.example.com',
        email: 'contact@ecotech.example.com'
    },
    {
        id: 'c2',
        name: '네뷸라 AI (Nebula AI)',
        description: '차세대 인공지능 기술의 선두주자.',
        foundedDate: '2020-11-20',
        address: '경기도 성남시 분당구 판교로 456',
        website: 'https://nebula-ai.example.com',
        email: 'info@nebula-ai.example.com'
    },
    {
        id: 'c3',
        name: '바이오라이프 (BioLife)',
        description: '첨단 헬스케어 및 생명공학 연구.',
        foundedDate: '2019-05-10',
        address: '인천시 연수구 송도과학로 789',
        website: 'https://biolife.example.com',
        email: 'support@biolife.example.com'
    }
];

export const projects: Project[] = [
    {
        id: 'p1',
        companyId: 'c1',
        title: '차세대 태양광 패널 효율화',
        description: '기존 패널 대비 30% 효율이 향상된 신소재 태양광 패널 개발 프로젝트입니다.',
        visibility: 'public',
        status: 'in-progress',
        progress: 65,
        modelType: 'ModernBuilding',
        color: '#10b981'
    },
    {
        id: 'p2',
        companyId: 'c1',
        title: '스마트 그리드 에너지 관리 시스템',
        description: '도시 단위의 에너지 소비를 최적화하는 AI 기반 관리 시스템 구축.',
        visibility: 'public',
        status: 'planning',
        progress: 15,
        modelType: 'TechBuilding',
        color: '#059669'
    },
    {
        id: 'p3',
        companyId: 'c2',
        title: '자율주행 4단계 비전 인식 AI',
        description: '악천후에서도 정확하게 사물을 인식하는 고성능 비전 AI 모델 학습.',
        visibility: 'public',
        status: 'in-progress',
        progress: 80,
        modelType: 'TechBuilding',
        color: '#8b5cf6'
    },
    {
        id: 'p4',
        companyId: 'c2',
        title: '생성형 AI 기반 고객 응대 봇',
        description: '감정을 인식하고 자연스럽게 대화하는 고객 서비스 챗봇 개발.',
        visibility: 'private', // 비공개 프로젝트 예시
        status: 'completed',
        progress: 100,
        modelType: 'TechBuilding',
        color: '#7c3aed'
    },
    {
        id: 'p5',
        companyId: 'c3',
        title: '개인 맞춤형 유전자 분석 키트',
        description: '집에서 간편하게 유전자를 검사하고 건강 리포트를 받아보는 서비스.',
        visibility: 'public',
        status: 'completed',
        progress: 100,
        modelType: 'ModernBuilding',
        color: '#f43f5e'
    },
    {
        id: 'p6',
        companyId: 'c3',
        title: '신약 후보 물질 탐색 AI',
        description: 'AI를 활용하여 신약 개발 기간을 획기적으로 단축하는 프로젝트.',
        visibility: 'public',
        status: 'in-progress',
        progress: 40,
        modelType: 'ModernBuilding',
        color: '#e11d48'
    }
];
