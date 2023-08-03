import type { IPage } from '@/types/common.type';
import HistoryVideo from '@modules/HistoryVideo';

const Page: IPage = () => {
    return <HistoryVideo />;
};

Page.Title = 'Quản lý màn hình';

export default Page;
