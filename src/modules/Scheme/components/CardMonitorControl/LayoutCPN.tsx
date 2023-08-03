import React from 'react';
import Image from 'next/image';

interface Props {
    layout: number | string;
}

export const LayoutCPN: React.FC<Props> = ({ layout }) => {
    const layoutNum = +layout;

    switch (layoutNum) {
        case 4:
            return (
                <Image
                    src="/images/scheme/option-layout-4.svg"
                    width={107}
                    height={60}
                    alt="/images/scheme/option-layout-4.svg"
                />
            );
        case 9:
            return (
                <Image
                    src="/images/scheme/option-layout-9.svg"
                    width={107}
                    height={60}
                    alt="/images/scheme/option-layout-9.svg"
                />
            );

        case 16:
            return (
                <Image
                    src="/images/scheme/option-layout-16.svg"
                    width={107}
                    height={60}
                    alt="/images/scheme/option-layout-16.svg"
                />
            );

        default:
            return (
                <Image
                    src="/images/scheme/option-layout-1.svg"
                    width={107}
                    height={60}
                    alt="/images/scheme/option-layout-1.svg"
                />
            );
    }
};
