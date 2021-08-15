import { List } from 'antd';
// import { Bar } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
import CustomHighChartBar from './customHighChart';

const data = [
    {
        title: '2017',
    },
    {
        title: '2018',
    },
    {
        title: '2019',
    },
    {
        title: '2020',
    },
];

export const chartColumn = () => ({
    title: <div>chart</div>,
    key: 'chart',
    dataIndex: 'chart',
    width: '50%',
    render: (text, row, index) => {
        const obj = {
            children: null,
            props: {},
        };
        if (row.bar) {
            obj.children = <CustomHighChartBar data={row.bar} />;
        }
        if (row.type) {
            obj.props.colSpan = 0;
        }
        return obj;
    },
});
