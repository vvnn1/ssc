import "./index.sass";
import MetricTable from "./MetricTable";
import AdvancedTable from "./AdvancedTable";

const MetricLayout = () => {
    return (
        <div className="jobmanager-metrics">
            <MetricTable />
            <AdvancedTable />
        </div>
    );
};

export default MetricLayout;