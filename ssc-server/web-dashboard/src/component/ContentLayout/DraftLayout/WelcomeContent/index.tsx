import ToolBar from "../ToolBar";
import "./index.sass";

const WelcomeContent = () => {
    return (
        <>
            <div className="panel-bar panel panel-ltr panel-border-bottom">
                <ToolBar isOpenFile={false} />
            </div>
            <div className="panel-bar navigation-bar panel panel-ltr panel-border-bottom">
                <span className="nav-tab-substitute" ></span>
            </div>
            <div className="editor-welcome-layout panel">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1133.86 1133.86" enableBackground="new 0 0 1133.86 1133.86" xmlSpace="preserve" data-spm-anchor-id="a2cn1.draft.0.i18.763c4121885oPp">
                    <text transform="matrix(1 0 0 1 41.5686 296.4502)">
                        <tspan x="0" y="0" fontSize="34px" className="tip">Windows/Linux</tspan>
                        <tspan x="254.668" y="0" fontSize="34px" letterSpacing="37" className="tip"></tspan>
                        <tspan x="303.082" y="0" fontSize="34px" letterSpacing="90" className="tip"></tspan>
                        <tspan x="404.108" y="0" fontSize="34px" className="tip">Mac</tspan>
                        <tspan x="469.585" y="0" fontSize="34px" letterSpacing="24" className="tip"></tspan>
                        <tspan x="505.136" y="0" fontSize="34px" letterSpacing="90" className="tip"></tspan>
                        <tspan x="707.19" y="0" fontSize="34px" className="tip">操作</tspan>
                        <tspan x="0" y="81.6" fontSize="34px" className="text">Ctrl-S</tspan>
                        <tspan x="97.966" y="81.6" fontSize="34px" letterSpacing="-7" className="text"></tspan>
                        <tspan x="101.027" y="81.6" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="81.6" fontSize="34px" className="text">⌘-S</tspan>
                        <tspan x="476.093" y="81.6" fontSize="34px" letterSpacing="18" className="text"></tspan>
                        <tspan x="505.136" y="81.6" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="81.6" fontSize="34px" className="text">保存</tspan>
                        <tspan x="0" y="126.4" fontSize="34px" className="text">Ctrl-Z</tspan>
                        <tspan x="100.207" y="126.4" fontSize="34px" letterSpacing="-9" className="text"></tspan>
                        <tspan x="101.027" y="126.4" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="126.4" fontSize="34px" className="text">⌘-Z</tspan>
                        <tspan x="478.334" y="126.4" fontSize="34px" letterSpacing="16" className="text"></tspan>
                        <tspan x="505.136" y="126.4" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="126.4" fontSize="34px" className="text">撤销</tspan>
                        <tspan x="0" y="171.2" fontSize="34px" className="text">Ctrl-Y</tspan>
                        <tspan x="100.838" y="171.2" fontSize="34px" letterSpacing="-10" className="text"></tspan>
                        <tspan x="101.027" y="171.2" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="171.2" fontSize="34px" className="text">⌘⇧Z</tspan>
                        <tspan x="492.661" y="171.2" fontSize="34px" letterSpacing="1" className="text"></tspan>
                        <tspan x="505.136" y="171.2" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="171.2" fontSize="34px" className="text">重做</tspan>
                        <tspan x="0" y="216" fontSize="34px" className="text">Ctrl+F</tspan>
                        <tspan x="105.237" y="216" fontSize="34px" letterSpacing="86" className="text"></tspan>
                        <tspan x="202.054" y="216" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="216" fontSize="34px" className="text">⌘F</tspan>
                        <tspan x="456.337" y="216" fontSize="34px" letterSpacing="38" className="text"></tspan>
                        <tspan x="505.136" y="216" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="216" fontSize="34px" className="text">查找</tspan>
                        <tspan x="0" y="260.8" fontSize="34px" className="text">Ctrl+H</tspan>
                        <tspan x="111.994" y="260.8" fontSize="34px" letterSpacing="79" className="text"></tspan>
                        <tspan x="202.054" y="260.8" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="260.8" fontSize="34px" className="text">⌘⌥F</tspan>
                        <tspan x="490.337" y="260.8" fontSize="34px" letterSpacing="4" className="text"></tspan>
                        <tspan x="505.136" y="260.8" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="260.8" fontSize="34px" className="text">替换</tspan>
                        <tspan x="0" y="305.6" fontSize="34px" className="text">Ctrl+Shift+K</tspan>
                        <tspan x="210.69" y="305.6" fontSize="34px" letterSpacing="81" className="text"></tspan>
                        <tspan x="303.082" y="305.6" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="305.6" fontSize="34px" className="text">⇧⌘K</tspan>
                        <tspan x="505.062" y="305.6" fontSize="34px" letterSpacing="-10" className="text"></tspan>
                        <tspan x="505.136" y="305.6" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="305.6" fontSize="34px" className="text">删除当前行</tspan>
                        <tspan x="0" y="350.4" fontSize="34px" className="text">Shift+Alt + ↓ / ↑</tspan>
                        <tspan x="279.238" y="350.4" fontSize="34px" letterSpacing="13" className="text"></tspan>
                        <tspan x="303.082" y="350.4" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="350.4" fontSize="34px" className="text">⇧⌥↓ / ⇧⌥↑</tspan>
                        <tspan x="623.316" y="350.4" fontSize="34px" letterSpacing="73" className="text"></tspan>
                        <tspan x="707.19" y="350.4" fontSize="34px" className="text">向上/下复制当前行</tspan>
                        <tspan x="0" y="395.2" fontSize="34px" className="text">Alt+ ↑ / ↓</tspan>
                        <tspan x="166.995" y="395.2" fontSize="34px" letterSpacing="24" className="text"></tspan>
                        <tspan x="202.054" y="395.2" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="395.2" fontSize="34px" className="text">⌥↓ / ⌥↑</tspan>
                        <tspan x="555.315" y="395.2" fontSize="34px" letterSpacing="40" className="text"></tspan>
                        <tspan x="606.163" y="395.2" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="395.2" fontSize="34px" className="text">向上/下移动当前行</tspan>
                        <tspan x="0" y="440" fontSize="34px" className="text">Ctrl+Home/End</tspan>
                        <tspan x="262.321" y="440" fontSize="34px" letterSpacing="30" className="text"></tspan>
                        <tspan x="303.082" y="440" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="440" fontSize="34px" className="text">⌘↑ / ⌘↓</tspan>
                        <tspan x="566.073" y="440" fontSize="34px" letterSpacing="29" className="text"></tspan>
                        <tspan x="606.163" y="440" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="440" fontSize="34px" className="text">跳转到行尾</tspan>
                        <tspan x="0" y="484.8" fontSize="34px" className="text">Home/End</tspan>
                        <tspan x="175.312" y="484.8" fontSize="34px" letterSpacing="15" className="text"></tspan>
                        <tspan x="202.054" y="484.8" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="484.8" fontSize="34px" className="text">Home/End</tspan>
                        <tspan x="579.421" y="484.8" fontSize="34px" letterSpacing="15" className="text"></tspan>
                        <tspan x="606.163" y="484.8" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="484.8" fontSize="34px" className="text">跳转到行初/行尾</tspan>
                        <tspan x="0" y="529.6" fontSize="34px" className="text" data-spm-anchor-id="a2cn1.draft.0.i17.763c4121885oPp">Ctrl-Backspace</tspan>
                        <tspan x="249.14" y="529.6" fontSize="34px" letterSpacing="43" className="text"></tspan>
                        <tspan x="303.082" y="529.6" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="529.6" fontSize="34px" className="text">⌥-Delete</tspan>
                        <tspan x="562.62" y="529.6" fontSize="34px" letterSpacing="32" className="text"></tspan>
                        <tspan x="606.163" y="529.6" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="529.6" fontSize="34px" className="text">删除左侧单词</tspan>
                        <tspan x="0" y="574.4" fontSize="34px" className="text">Ctrl-Delete</tspan>
                        <tspan x="184.493" y="574.4" fontSize="34px" letterSpacing="6" className="text"></tspan>
                        <tspan x="202.054" y="574.4" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="574.4" fontSize="34px" className="text">⌥-Delete</tspan>
                        <tspan x="562.62" y="574.4" fontSize="34px" letterSpacing="32" className="text"></tspan>
                        <tspan x="606.163" y="574.4" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="574.4" fontSize="34px" className="text">删除右侧单词</tspan>
                        <tspan x="0" y="619.2" fontSize="34px" className="text">Ctrl+Alt+ ↑ / ↓</tspan>
                        <tspan x="254.004" y="619.2" fontSize="34px" letterSpacing="38" className="text"></tspan>
                        <tspan x="303.082" y="619.2" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="404.108" y="619.2" fontSize="34px" className="text">⌥⌘↑/⌥⌘↓</tspan>
                        <tspan x="601.8" y="619.2" fontSize="34px" letterSpacing="-6" className="text"></tspan>
                        <tspan x="606.163" y="619.2" fontSize="34px" letterSpacing="90" className="text"></tspan>
                        <tspan x="707.19" y="619.2" fontSize="34px" className="text">向上/下增加多光标</tspan>
                    </text>
                    <line fill="none" strokeMiterlimit="10" x1="41.569" y1="327.909" x2="1058.708" y2="327.909" className="text-line"></line>
                </svg>
            </div>
        </>
    );
};

export default WelcomeContent;