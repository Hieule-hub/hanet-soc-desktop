export interface Region {
    Id: number;
    MasterDataIdentifier?: any;
    Code: string;
    Name: string;
    Description?: any;
    AreaCode: string;
    AreaCode2: string;
    SortOrder?: any;
    ParentCode: string;
    Status: string;
    IssuedDate?: any;
    ValidDate?: any;
    ExpiredDate?: any;
}

export interface ListCamera {
    OfficeCode: string;
    CameraName: string;
    CameraType: string;
    SerialNumber: string;
    LocationId: string;
    DeviceId: string;
}

export interface Place {
    OfficeCode: string;
    OfficeName: string;
    ProvinceName: string;
    DistrictName: string;
    WardName: string;
    ProvinceCode: string;
    DistrictCode: string;
    WardCode: string;
    PlaceId: string;
    ListCamera: ListCamera[];
}

export interface RankType {
    id: number;
    key: string;
    name: string;
}
