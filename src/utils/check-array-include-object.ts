const checkArrayIncludeObject = (array: any[], id: string) => {
    return array.some((e) => {
        return e.id === id || e.deviceID === id;
    });
};

export default checkArrayIncludeObject;
