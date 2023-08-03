import { Form } from 'antd';
import type { IPage } from '@/types/common.type';
import { SchemeDetail } from '@/modules/Scheme/SchemeDetail';
import { useRouter } from 'next/router';

const Page: IPage = () => {
    const router = useRouter();
    const { schemeId } = router.query;

    return <SchemeDetail schemeId={schemeId as string} />;
};

Page.Title = 'Chi tiết kịch bản';

export default Page;
