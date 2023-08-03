import React, { FC, CSSProperties } from 'react';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ItemToggle, { ItemProps } from './ItemToggle';

export const SortableItem: FC<ItemProps> = (props) => {
    const { item, enableDrag } = props;
    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id
    });

    const { config } = item;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        margin: '10px',
        borderRadius: '6px',
        zIndex: isDragging ? '100' : 'auto',
        opacity: isDragging ? 0.3 : 1
    };

    const screenStyles: CSSProperties = {
        backgroundColor: config?.layout ? 'white' : '#545454',
        borderRadius: '6px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: enableDrag ? '#fff' : '#545454'
    };

    return (
        <ItemToggle
            ref={setNodeRef}
            style={style}
            withOpacity={isDragging}
            enableDrag={props.enableDrag}
            {...props}
            {...attributes}
            {...listeners}
        >
            <div style={screenStyles}>
                {config?.layout && (
                    <Image
                        src={`/images/scheme/option-layout-${config?.layout}.svg`}
                        width={102}
                        height={56}
                        alt={`option-layout-${config?.layout}.svg`}
                    />
                )}
            </div>
        </ItemToggle>
    );
};
