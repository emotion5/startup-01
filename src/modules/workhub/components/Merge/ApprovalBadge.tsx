import React from 'react';

interface ApprovalBadgeProps {
    status: 'pending' | 'approved' | 'rejected' | 'merged';
}

const ApprovalBadge: React.FC<ApprovalBadgeProps> = ({ status }) => {
    const colors = {
        pending: { bg: '#fff7ed', text: '#c2410c' },
        approved: { bg: '#f0fdf4', text: '#15803d' },
        rejected: { bg: '#fef2f2', text: '#b91c1c' },
        merged: { bg: '#f3e8ff', text: '#7e22ce' }
    };

    const style = colors[status];

    return (
        <span style={{
            padding: '4px 8px',
            borderRadius: '9999px',
            backgroundColor: style.bg,
            color: style.text,
            fontSize: '0.8rem',
            fontWeight: 600,
            textTransform: 'uppercase'
        }}>
            {status}
        </span>
    );
};

export default ApprovalBadge;
