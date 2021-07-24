import { List } from "antd";
// import { Bar } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
import BarChart from "./customHighChart";

const data = [
    {
        title: "2017",
    },
    {
        title: "2018",
    },
    {
        title: "2019",
    },
    {
        title: "2020",
    },
];

export const chartColumn = () => ({
    title: (
        <List
            size="large"
            header={<div>Header</div>}
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
        />
    ),
    key: "chart",
    dataIndex: "chart",
    width: "50%",
    render: (text, row, index) => {
        if (!row.bar) {
            return (
                <>
                    <div>No Data found</div>
                </>
            );
        }
        return (
            <>
                <BarChart data={row.timeline} />
                {/* <div className="barCharts">
                    <Row gutter={10}>
                        {data.map((el, index) => {
                            const color = index * 60;
                            return (
                                <Col span={6}>
                                    <Bar
                                        data={{
                                            labels: ["sale"],
                                            datasets: [
                                                {
                                                    label: el.title,
                                                    data: [row.bar[index]],
                                                    backgroundColor: [
                                                        `hsla(${color},100%,80%,0.5)`,
                                                    ],
                                                    borderColor: [
                                                        `hsla(${color},100%,30%,1)`,
                                                    ],
                                                    borderWidth: 1,
                                                    barThickness: 30,
                                                },
                                            ],
                                        }}
                                        height={40}
                                        options={{
                                            indexAxis: "y",
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: {
                                                    display: false,
                                                    grid: {
                                                        display: false,
                                                    },
                                                    stacked: true,
                                                    max: 100,
                                                },
                                                y: {
                                                    beginAtZero: true,
                                                    display: false,
                                                    stacked: true,
                                                },
                                            },
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                                datalabels: {
                                                    anchor: "center",
                                                    align: "center",
                                                    color: "black",
                                                    formatter: function (
                                                        value,
                                                        context
                                                    ) {
                                                        return value + "%";
                                                    },
                                                },
                                            },
                                        }}
                                        plugins={[ChartDataLabels]}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </div> */}
                {/* <Tabs defaultActiveKey="1" tabPosition={"top"} centered>
                <TabPane tab="Bar Chart" key="1">
                </TabPane>
                <TabPane tab="Scatter Chart" key="2">
                    <Scatter
                        data={{
                            datasets: [
                                {
                                    label: row.scatterLabel,
                                    data: row.scatter,
                                    backgroundColor: "red",
                                },
                            ],
                        }}
                        height={200}
                        options={{ maintainAspectRatio: false }}
                    />
                </TabPane>
            </Tabs> */}
            </>
        );
    },
});
