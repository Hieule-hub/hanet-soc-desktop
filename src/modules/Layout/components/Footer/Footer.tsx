import React from 'react';

interface Props {}

const Footer: React.FC<Props> = (props) => {
    return (
        <footer className="footer">
            <div>
                <strong className="text-primary">Hanet</strong>
                <span> 2022 © All Rights Reserved.</span>
            </div>
            <div className="ml-auto">
                <span>Powered by </span>
                <strong className="text-primary">Hanet</strong>
            </div>
        </footer>
    );
};

export default Footer;
