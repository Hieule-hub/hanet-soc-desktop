import type { IPage } from '@/types/common.type';
import { CreateScheme } from '@/modules/Scheme/CreateScheme';

const Page: IPage = () => {
    return <CreateScheme />;
};

Page.Title = 'Thêm kịch bản';

export default Page;
