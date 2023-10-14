import { Tabs, TabsProps } from "antd";
import './index.sass'
import { useRef } from "react";
import ScrollPin from "../ScrollPin";



const ScrollContent = (props: { children?: React.ReactNode }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <ScrollPin containerRef={contentRef} />
            <div className="tab-scroll-content" ref={contentRef}>
                {props.children}
            </div>
        </>

    )
}


const wrapScrollItems = (items: TabsProps['items']) => {
    return items?.map(item => {
        return {
            ...item,
            children: <ScrollContent>{item.children}</ScrollContent>
        }
    })
}

const ScrollTab = (props: TabsProps) => {
    return (
        <Tabs
            {...props}
            items={wrapScrollItems(props.items)}
            className={props.className ? ['scroll-tabs', props.className].join(" ") : 'scroll-tabs'}
        />
    )
};

export default ScrollTab;