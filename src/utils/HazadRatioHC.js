import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import highcharts from 'highcharts';
import bullet from 'highcharts/modules/bullet.js';

bullet(highcharts);

function HazardRatioChart({ data }) {
    console.log(data);
    const genOptions = (marginLeft, marginRight) => ({
        chart: {
            inverted: true,
            height: '60px',
            type: 'line',
            marginLeft: marginLeft || 10,
            marginRight: marginRight || 10,
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false,
        },
        xAxis: {
            visible: false,
        },

        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
        },
    });

    const plotOptions = {
        series: {
            pointPadding: 0.25,
            borderWidth: 0,
            color: 'orange',
            targetOptions: {
                width: '200%',
            },
            pointWidth: 2,
        },
    };

    return (
        <>
            <HighchartsReact
                highcharts={highcharts}
                options={{
                    ...genOptions(10, 200),
                    plotOptions: plotOptions,
                    yAxis: {
                        gridLineWidth: 0,
                        labels: {
                            enabled: false,
                        },
                        title: null,
                        min: data.hazardRatio.min,
                        max: data.hazardRatio.max,
                    },
                    series: [
                        {
                            data: [
                                {
                                    x: 0,
                                    y: data.hazardRatio.min,
                                    marker: {
                                        enabled: true,
                                        symbol: 'circle',
                                        radius: 5,
                                    },
                                },
                                {
                                    x: 0,
                                    y: data.hazardRatio.target1,
                                    marker: {
                                        enabled: true,
                                    },
                                    dataLabels: {
                                        enabled: true,
                                        verticalAlign: 'top',
                                    },
                                },
                                {
                                    x: 0,
                                    y: data.hazardRatio.max,
                                    marker: {
                                        enabled: true,
                                        symbol: 'circle',
                                        radius: 5,
                                    },
                                },
                            ],
                            enableMouseTracking: false,
                            targetOptions: {
                                width: 10,
                            },
                            tooltip: {
                                enabled: false,
                            },
                        },
                    ],
                }}
            />
        </>
    );
}

export { HazardRatioChart };
