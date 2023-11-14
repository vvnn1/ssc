import * as perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import {
    PerspectiveViewerConfig,
    HTMLPerspectiveViewerElement,
} from "@finos/perspective-viewer";
import { useEffect, useRef } from "react";
import "./index.sass";
import "@finos/perspective-viewer/dist/css/themes.css";

const data = `Row ID,Order ID,Order Date,Ship Date,Ship Mode,Customer ID,Segment,Country,City,State,Postal Code,Region,Product ID,Category,Sub-Category,Sales,Quantity,Discount,Profit
1,CA-2013-152156,11/9/2013,11/12/2013,Second Class,CG-12520,Consumer,United States,Henderson,Kentucky,42420,South,FUR-BO-10001798,Furniture,Bookcases,261.96,2,0.0,41.9136
2,CA-2013-152156,11/9/2013,11/12/2013,Second Class,CG-12520,Consumer,United States,Henderson,Kentucky,42420,South,FUR-CH-10000454,Furniture,Chairs,731.94,3,0.0,219.582
3,CA-2013-138688,6/13/2013,6/17/2013,Second Class,DV-13045,Corporate,United States,Los Angeles,California,90036,West,OFF-LA-10000240,Office Supplies,Labels,14.62,2,0.0,6.8714
4,US-2012-108966,10/11/2012,10/18/2012,Standard Class,SO-20335,Consumer,United States,Fort Lauderdale,Florida,33311,South,FUR-TA-10000577,Furniture,Tables,957.5775,5,0.45,-383.031
5,US-2012-108966,10/11/2012,10/18/2012,Standard Class,SO-20335,Consumer,United States,Fort Lauderdale,Florida,33311,South,OFF-ST-10000760,Office Supplies,Storage,22.368,2,0.2,2.5164
6,CA-2011-115812,6/9/2011,6/14/2011,Standard Class,BH-11710,Consumer,United States,Los Angeles,California,90032,West,FUR-FU-10001487,Furniture,Furnishings,48.86,7,0.0,14.1694
7,CA-2011-115812,6/9/2011,6/14/2011,Standard Class,BH-11710,Consumer,United States,Los Angeles,California,90032,West,OFF-AR-10002833,Office Supplies,Art,7.28,4,0.0,1.9656
8,CA-2011-115812,6/9/2011,6/14/2011,Standard Class,BH-11710,Consumer,United States,Los Angeles,California,90032,West,TEC-PH-10002275,Technology,Phones,907.152,6,0.2,90.7152
9,CA-2011-115812,6/9/2011,6/14/2011,Standard Class,BH-11710,Consumer,United States,Los Angeles,California,90032,West,OFF-BI-10003910,Office Supplies,Binders,18.504,3,0.2,5.7825
`;

const worker = perspective.default.shared_worker();

const config: PerspectiveViewerConfig = {
    sort: [["Row ID", "asc"]],
};

const StreamResultTable = () => {
    const viewer = useRef<HTMLPerspectiveViewerElement>(null);
    useEffect(() => {
        if (viewer.current) {
            const table = worker.table(data);
            viewer.current.load(table);
            viewer.current.restore(config);
        }
    }, []);



    return (
        <perspective-viewer ref={viewer}></perspective-viewer>
    );
};

export default StreamResultTable;