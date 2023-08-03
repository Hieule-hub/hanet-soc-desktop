import React from 'react';

export interface IPage extends React.FC {
    Layout?: (props: { children: React.ReactNode }) => React.ReactNode;
    Title?: string;
}
