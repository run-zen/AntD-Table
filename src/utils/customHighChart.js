import HighchartsReact from 'highcharts-react-official';
import highcharts from 'highcharts';

function CustomHighChartBar(props) {
    return (
        <HighchartsReact
            highcharts={highcharts}
            options={{
                chart: {
                    type: 'bar',
                    height: '50px',
                },
                title: null,
                legend: {
                    enabled: false,
                },
                xAxis: {
                    visible: false,
                    gridLineWidth: 0,
                    title: {
                        enabled: false,
                    },
                    labels: {
                        enabled: false,
                    },
                },
                yAxis: {
                    visible: false,
                    gridLineWidth: 0,
                    max: 400,
                    reversedStacks: false,
                    title: {
                        enabled: false,
                    },
                    labels: {
                        enabled: false,
                    },
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                    },
                },
                series: [
                    {
                        name: '2017',
                        data: [props.data[0]],
                    },
                    {
                        name: '2018',
                        data: [props.data[1]],
                    },
                    {
                        name: '2019',
                        data: [props.data[2]],
                    },
                    {
                        name: '2020',
                        data: [props.data[3]],
                    },
                ],
                credits: {
                    enabled: false,
                },
            }}
        />
    );
}

export default CustomHighChartBar;
