const baseUrlImg = '/icons/svg';

export const urlImgDeviceRender = (type: number): string => {
    switch (type) {
        case 0:
            return `${baseUrlImg}/aicam-ha1000.svg`;
        case 2:
        case 4:
            return `${baseUrlImg}/access.svg`;

        case 5:
            return `${baseUrlImg}/aicam-home.svg`;
        case 6:
            return `${baseUrlImg}/aicam_outdoor.svg`;
        case 7:
            return `${baseUrlImg}/aicam-f1.svg`;

        default:
            return `${baseUrlImg}/camera.png`;
    }
};
