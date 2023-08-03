import React, { useEffect, useState } from 'react';
import { SchemeFieldFormValues } from '@/types/scheme.type';

//redux
import { useAppDispatch } from '@/stores/redux';
import { getScheme, updateScheme } from '@/stores/redux/thunks/scheme.thunk';

import SchemeForm from './components/SchemeForm';

interface Props {
    schemeId: string;
}

export const SchemeDetail: React.FC<Props> = ({ schemeId }) => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<SchemeFieldFormValues | null>(null);
    useEffect(() => {
        if (schemeId) {
            dispatch(getScheme(schemeId))
                .unwrap()
                .then((res) => {
                    const { detail, ...props } = res;
                    setFormData({ ...props, ...detail });
                });
        }
    }, [schemeId]);

    const handleSubmitAction = (values: SchemeFieldFormValues) =>
        dispatch(updateScheme({ id: schemeId, body: values })).unwrap();

    return <SchemeForm submitAction={handleSubmitAction} formData={formData} />;
};
