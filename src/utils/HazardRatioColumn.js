import { HazardRatioChart } from './HazadRatioHC';

export const HazardRatioColumn = () => ({
    title: <div>chart</div>,
    key: 'chart',
    dataIndex: 'chart',
    width: '20%',
    className: 'chart-cell',
    render: (text, row, index) => {
        const obj = {
            children: null,
            props: {},
        };
        if (row.bar) {
            obj.children = <HazardRatioChart data={row} />;
        }
        if (row.type) {
            obj.props.colSpan = 0;
        }
        return obj;
    },
});
