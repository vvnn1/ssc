import AdvancedTable from "./AdvancedTable";
import MetricTable from "./MetricTable";
import './index.sass'

const MetricLayout = () => {
    return (
        <div className="metric-layout">
            <MetricTable />
            <AdvancedTable />
        </div>
    )
};

export default MetricLayout;