import { useState } from "react";
import { Resizable as ReactResizable, ResizeCallbackData } from 'react-resizable';
import './index.sass'

type ResizableProps = {
    children: React.ReactNode;
    className?: string;
    axis: 'x' | 'y';
    size: number;
    resizeHandle: 's' | 'w' | 'e' | 'n';
    minSize?: number;
    maxSize?: number;
};

const Resizable = (props: ResizableProps) => {
    const [reSize, setReSize] = useState<number>(props.size);

    const onResize = (_: any, { size }: ResizeCallbackData) => {
        if (props.axis === 'x') {
            setReSize(adequateSize(size.width));
        } else if (props.axis === 'y') {
            setReSize(adequateSize(size.height));
        }
    }


    const adequateSize = (curSize: number): number => {
        if(props.minSize && props.minSize > curSize) {
            return props.minSize;
        }

        if (props.maxSize && props.maxSize < curSize) {
            return props.maxSize;
        }

        return curSize;
    }

    return (
        // @ts-ignore
        <ReactResizable
            width={props.axis === 'x' ? reSize : undefined}
            height={props.axis === 'y' ? reSize : undefined}
            onResize={onResize}
            axis={props.axis}
            className={props.className ? [props.resizeHandle + '-border-resizable', props.className].join(' ') : props.resizeHandle + '-border-resizable'}
            resizeHandles={[props.resizeHandle]}
        >
            <div style={{ flexBasis: reSize + "px" }}>
                {props.children}
            </div>
        </ReactResizable>
    )
};

export default Resizable;