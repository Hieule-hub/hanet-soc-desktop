import React from 'react';
import BoxList from './components/BoxList';
import MenuSchemeDrawer from './components/MenuSchemeDrawer';
import ConfigBoxDrawer from './components/ConfigBoxDrawer';

export const Box: React.FC = () => {
    return (
        <div>
            <BoxList />
            <MenuSchemeDrawer />
            <ConfigBoxDrawer />
        </div>
    );
};
