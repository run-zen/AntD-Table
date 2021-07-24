import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import highcharts from "highcharts";
import highchartstimeline from "highcharts/modules/timeline";
highchartstimeline(highcharts);

function BarChart(props) {
    const [data, setdata] = useState([]);
    const [zones, setZones] = useState([]);

    const prepareData = () => {
        let data = [...props.data];
        data = data.reduce((Result, currItem, index) => {
            const date = new Date(currItem.x);
            const year = date.getFullYear();
            if (year === 2017) {
                currItem.color = "blue";
            } else if (year === 2018) {
                currItem.color = "red";
            } else if (year === 2019) {
                currItem.color = "green";
            } else if (year === 2020) {
                currItem.color = "yellow";
            }
            Result.push(currItem);
            return Result;
        }, []);
        data.unshift({
            x: Date.UTC(2017, 0, 1),
            name: "start",
            dataLabels: {
                enabled: false,
            },
            color: "rgba(0,0,0,0)",
        });
        data.push({
            x: Date.UTC(2020, 12, 30),
            name: "end",
            color: "rgba(0,0,0,0)",
        });

        return data;
    };

    const prepareZones = () => {
        let zones = [
            {
                value: "first Date",
                color: "rgba(0,0,0,0)",
            },

            {
                value: "lastDate + 1",
                color: "grey",
            },
            {
                color: "rgba(0,0,0,0)",
            },
        ];
        const len = props.data.length;
        zones[0].value = props.data[0].x;
        zones[1].value = props.data[len - 1].x + 1;

        return zones;
    };

    useEffect(() => {
        setdata(prepareData());
        setZones(prepareZones());
    }, []);
    return (
        <HighchartsReact
            highcharts={highcharts}
            options={{
                chart: {
                    type: "timeline",
                    height: "50px",
                },
                xAxis: {
                    type: "datetime",
                    visible: false,
                },
                yAxis: {
                    gridLineWidth: 0,
                    title: null,
                    labels: {
                        enabled: false,
                    },
                },
                legend: {
                    enabled: false,
                },
                title: null,
                subtitle: null,
                tooltip: {
                    outside: true,
                    hideDelay: 10,
                },
                credits: {
                    enabled: false,
                },
                series: [
                    {
                        dataLabels: {
                            enabled: false,
                        },
                        tooltip: {
                            headerFormat:
                                '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
                                "{point.x:%d %b %Y}</span><br/>",
                            pointFormat: `<div>{point.label}</div><br/>{point.description}`,
                        },
                        marker: {
                            symbol: "circle",
                        },
                        lineWidth: 2,
                        zoneAxis: "x",
                        zones: zones,
                        data: data,
                    },
                ],
            }}
        />
    );
}

export default BarChart;
