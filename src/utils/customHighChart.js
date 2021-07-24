import HighchartsReact from "highcharts-react-official";
import highcharts from "highcharts";
import highchartstimeline from "highcharts/modules/timeline";
highchartstimeline(highcharts);

function BarChart(props) {
    return (
        <HighchartsReact
            highcharts={highcharts}
            options={{
                chart: {
                    zoomType: "x",
                    type: "timeline",
                },
                xAxis: {
                    type: "datetime",
                    visible: false,
                },
                yAxis: {
                    gridLineWidth: 1,
                    title: null,
                    labels: {
                        enabled: false,
                    },
                },
                legend: {
                    enabled: false,
                },
                title: {
                    text: "",
                },
                subtitle: {
                    text: "",
                },
                tooltip: {
                    style: {
                        width: 300,
                    },
                },
                credits: {
                    enabled: false,
                },
                series: [
                    {
                        dataLabels: {
                            allowOverlap: false,
                            format:
                                '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
                                "{point.x:%d %b %Y}</span><br/>{point.label}",
                        },
                        marker: {
                            symbol: "circle",
                        },
                        data: [
                            {
                                x: 1514764800000,
                                name: "Event name",
                                label: "Event label",
                                description: "Description of this event.",
                            },
                            {
                                x: 1526774400000,
                                name: "Event name",
                                label: "Another event label",
                                description: "Description of second event",
                            },
                        ],
                    },
                ],
            }}
        />
    );
}

export default BarChart;
