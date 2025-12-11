import React from 'react';

interface BranchLineProps {
    from: { x: number; y: number };
    to: { x: number; y: number };
}

const BranchLine: React.FC<BranchLineProps> = ({ from, to }) => {
    // Simple Bezier curve or straight line
    // Adjusting connection points (center of nodes)
    // Assuming node width ~180px, height ~70px
    const startX = from.x + 90;
    const startY = from.y + 70;
    const endX = to.x + 90;
    const endY = to.y;

    const controlPointY = (startY + endY) / 2;

    const pathData = `M ${startX} ${startY} C ${startX} ${controlPointY}, ${endX} ${controlPointY}, ${endX} ${endY}`;

    return (
        <path
            d={pathData}
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
        />
    );
};

export default BranchLine;
