import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import highcharts from "highcharts";
import highchartstimeline from "highcharts/modules/timeline";
highchartstimeline(highcharts);

function BarChart(props) {
    const [data, setdata] = useState([]);

    const prepareData = () => {
        let data = [...props.data];
        data = data.reduce((Result, currItem, index) => {
            const date = new Date(currItem.date);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            currItem.x = Date.UTC(year, month, day);
            if (year === 2017) {
                currItem.color = "blue";
            } else if (year === 2018) {
                currItem.color = "red";
            } else if (year === 2019) {
                currItem.color = "green";
            } else if (year === 2020) {
                currItem.color = "orange";
            }
            Result.push(currItem);
            return Result;
        }, []);

        return data;
    };

    useEffect(() => {
        setdata(prepareData());
    }, []);

    const plotOptions = {
        series: {
            tooltip: {
                className: "tooltip",
                headerFormat: `<span style="color:{point.color}">● </span><span style="font-weight: bold;" >{point.x:%d %b %Y}</span><br/>`,
                pointFormat: `<div>{point.name}</div><br/><div>{point.description}</div>`,
            },
        },
    };

    const genOptions = {
        chart: {
            type: "timeline",
            height: "60px",
        },
        xAxis: {
            type: "datetime",
            visible: false,
            min: Date.UTC(2016, 11, 31),
            max: Date.UTC(2020, 11, 31),
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
        credits: {
            enabled: false,
        },
        tooltip: {
            outside: true,
            hideDelay: 10,
        },
    };

    return (
        <HighchartsReact
            highcharts={highcharts}
            options={{
                ...genOptions,
                plotOptions: plotOptions,
                series: [
                    {
                        dataLabels: {
                            enabled: false,
                            // allowOverlap: false,
                            // format:
                            //     '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
                            //     "{point.x:%d %b %Y}</span><br/>{point.label}",
                        },
                        marker: {
                            symbol: "circle",
                            radius: 5,
                        },
                        lineWidth: 3,
                        data: data,
                    },
                ],
            }}
        />
    );
}

export default BarChart;
