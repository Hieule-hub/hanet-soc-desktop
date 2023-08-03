/* eslint-disable prefer-const */
import { forwardRef, HTMLAttributes, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { Monitor } from '@/types/monitor.type';
import Status from '@/components/Status';
import classNames from 'classnames';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    enableDrag?: boolean;
    withOpacity?: boolean;
    isDragging?: boolean;
    item: Monitor;
    onChoose: (value: any) => void;
};

const ItemToggle = forwardRef<HTMLDivElement, ItemProps>(
    ({ item, enableDrag, withOpacity, isDragging, style, children, onChoose, ...props }, ref) => {
        const router = useRouter();
        let timer: any = 0;
        let prevent = false;

        const onSingleClickHandler = () => {
            timer = setTimeout(() => {
                if (!prevent) {
                    //single action
                    // console.log('Single Click');
                    if (item.status !== 0 || !item.config) {
                        onChoose(item.serial);
                    }
                }
            }, 200);
        };

        const onDoubleClickHandler = () => {
            clearTimeout(timer);
            prevent = true;
            //double action
            // console.log('Double Click');
            if (item.status !== 0) {
                router.push(`/box/${item.id}`);
            }

            setTimeout(() => {
                prevent = false;
            }, 200);
        };

        const { status } = item;

        return (
            <div
                className={classNames('box-item-container', {
                    offline: status === 0
                })}
            >
                {status === 0 && (
                    <div className="status">
                        <Status status={0} />
                    </div>
                )}

                {enableDrag && (
                    <>
                        <div ref={ref} className="box-item-content" {...props}>
                            {children}
                        </div>
                        <div className="label">{item.name}</div>
                    </>
                )}
                {!enableDrag && (
                    <>
                        <div
                            ref={ref}
                            className="box-item-content"
                            // onClick={() => onChoose(item.serial)}
                            onClick={onSingleClickHandler}
                            onDoubleClick={onDoubleClickHandler}
                        >
                            {children}
                        </div>
                        <div className="label">{item.name}</div>
                    </>
                )}
            </div>
        );
    }
);

export default ItemToggle;
