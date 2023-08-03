import { Form } from 'antd';
import type { IPage } from '@/types/common.type';
import { useRouter } from 'next/router';
import BoxDetail from '@/modules/Box/BoxDetail';

const Page: IPage = () => {
    const router = useRouter();
    const { boxId } = router.query;

    return <BoxDetail boxId={boxId as string} />;
};

Page.Title = 'Chi tiết box';

export default Page;
