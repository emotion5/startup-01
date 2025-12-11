import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/whiteboard.module.css';
import BranchNode from './BranchNode';
import BranchLine from './BranchLine';
import type { Branch } from '../../types/branch.types';

interface WhiteboardCanvasProps {
    branches: Branch[];
    currentBranchId: string | null;
}

// Simple layout algorithm helper
const calculateLayout = (branches: Branch[]) => {
    const layout: Record<string, { x: number; y: number }> = {};
    const levels: Record<string, number> = {};

    // Find root (company)
    const root = branches.find(b => b.type === 'company');
    if (!root) return layout;

    // Level 0
    layout[root.id] = { x: 400, y: 50 };
    levels[root.id] = 0;

    // Helper to process children
    const processChildren = (parentId: string, level: number, startX: number, gap: number) => {
        const children = branches.filter(b => b.parentBranchId === parentId);
        if (children.length === 0) return;

        const totalWidth = children.length * gap;
        let currentX = startX - totalWidth / 2 + gap / 2;

        children.forEach(child => {
            layout[child.id] = { x: currentX, y: 50 + level * 150 };
            levels[child.id] = level;
            processChildren(child.id, level + 1, currentX, gap * 0.8);
            currentX += gap;
        });
    };

    processChildren(root.id, 1, 400, 250);

    return layout;
};

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({ branches, currentBranchId }) => {
    const navigate = useNavigate();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    const layout = calculateLayout(branches);

    const handleBranchClick = (branchId: string) => {
        navigate(`/workhub/branch/${branchId}`);
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            setScale(s => Math.min(Math.max(s * delta, 0.5), 2));
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains(styles.canvas)) {
            setIsDragging(true);
            setLastPos({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            const dx = e.clientX - lastPos.x;
            const dy = e.clientY - lastPos.y;
            setPosition(p => ({ x: p.x + dx, y: p.y + dy }));
            setLastPos({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className={styles.whiteboardContainer}>
            <div
                className={styles.canvas}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: '0 0'
                }}
            >
                <svg className={styles.svgLayer}>
                    {branches.map(branch => {
                        if (!branch.parentBranchId) return null;
                        const parentPos = layout[branch.parentBranchId];
                        const childPos = layout[branch.id];
                        if (!parentPos || !childPos) return null;

                        return (
                            <BranchLine
                                key={`line-${branch.id}`}
                                from={parentPos}
                                to={childPos}
                            />
                        );
                    })}
                </svg>

                {branches.map(branch => {
                    const pos = layout[branch.id];
                    if (!pos) return null;
                    return (
                        <BranchNode
                            key={branch.id}
                            branch={branch}
                            x={pos.x}
                            y={pos.y}
                            isActive={branch.id === currentBranchId}
                            onClick={handleBranchClick}
                        />
                    );
                })}
            </div>

            <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'white', padding: 10, borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <button onClick={() => setScale(s => Math.min(s + 0.1, 2))}>+</button>
                <span style={{ margin: '0 10px' }}>{Math.round(scale * 100)}%</span>
                <button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}>-</button>
            </div>
        </div>
    );
};

export default WhiteboardCanvas;
