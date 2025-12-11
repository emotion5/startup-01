import type { Project as ExternalProject } from '../../../data/mockData';
import type { WorkHubProject } from './types';

// 외부 데이터를 WorkHub 형식으로 변환
export class ProjectAdapter {
    static toWorkHubProject(external: ExternalProject): WorkHubProject | null {
        // visibility가 'public'인 것만 가져옴 (예시 정책)
        if (external.visibility !== 'public') {
            return null;
        }

        return {
            id: external.id,
            name: external.title,
            description: external.description,
            visibility: external.visibility,
            status: external.status,
        };
    }

    static async fetchPublicProjects(): Promise<WorkHubProject[]> {
        // 현재: mockData에서 가져옴
        // 향후: API 호출로 변경 가능
        // 동적 import를 사용하여 결합도를 낮춤
        const { projects } = await import('../../../data/mockData');
        return projects
            .filter(p => p.visibility === 'public')
            .map(p => ProjectAdapter.toWorkHubProject(p))
            .filter((p): p is WorkHubProject => p !== null);
    }
}
