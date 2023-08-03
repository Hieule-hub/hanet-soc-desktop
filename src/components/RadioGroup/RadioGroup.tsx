import React from 'react';
import { Radio, Col, Row } from 'antd';
import type { RadioGroupProps } from 'antd';
import { monitors } from '@/constants/monitors';
import { Gutter } from 'antd/lib/grid/row';

interface Props extends RadioGroupProps {
    gutter: Gutter | [Gutter, Gutter];
}

export const RadioGroup: React.FC<Props> = ({ gutter, className = '', ...props }) => {
    return (
        <Radio.Group className={'hanet-radio-group-layout ' + className} {...props}>
            <Row gutter={gutter}>
                {monitors.map(({ cam, id, value }) => {
                    return (
                        <Col key={id}>
                            <Radio
                                value={value}
                                className={`hanet-form-layout-radio-ant value value-${value}`}
                            >
                                <div> {cam} screen</div>
                            </Radio>
                        </Col>
                    );
                })}
            </Row>
        </Radio.Group>
    );
};
