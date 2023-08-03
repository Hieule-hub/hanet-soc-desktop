import React, { FC } from 'react';

type GridProps = {
    title?: string;
    children: React.ReactNode;
    columns: number;
};

const Grid: FC<GridProps> = ({ title, children, columns }) => {
    return (
        <div style={{ width: '100%' }}>
            {title && <h3>{title}</h3>}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridGap: 10,
                    maxWidth: '1920px',
                    // width: '100%',
                    margin: '15px auto',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Grid;
