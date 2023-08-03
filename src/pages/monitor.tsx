import type { IPage } from '@/types/common.type';
import Monitor from '@modules/Monitor';

const Page: IPage = () => {
    return <Monitor />;
};

Page.Title = 'Quản lý màn hình';

export default Page;
