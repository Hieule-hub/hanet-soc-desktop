import React from 'react';

interface Props {
    label?: string;
}

export const MonitorItem: React.FC<Props> = ({ label = 'MT' }) => {
    return <div className="hanet-monitor-item">{label}</div>;
};
