import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Form } from 'antd';

import type { SchemeFieldFormValues } from '@/types/scheme.type';

//redux

import { useAppDispatch } from '@/stores/redux';
import { addScheme, getSchemesList } from '@/stores/redux/thunks/scheme.thunk';

import SchemeForm from './components/SchemeForm';

export const CreateScheme: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmitAction = (values: SchemeFieldFormValues) =>
        dispatch(addScheme(values)).unwrap();

    return <SchemeForm submitAction={handleSubmitAction} />;
};
