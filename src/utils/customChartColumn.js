import BarChart from "./customHighChart";

const data = [
    {
        title: "2017",
        color: "blue",
    },
    {
        title: "2018",
        color: "red",
    },
    {
        title: "2019",
        color: "green",
    },
    {
        title: "2020",
        color: "orange",
    },
];

export const chartColumn = () => ({
    title: (
        <div className="year-cell">
            <h3 className="header-center">Header</h3>
            <div className="years">
                {data.map((el) => (
                    <div className={`year year-${el.color}`}>{el.title}</div>
                ))}
            </div>
        </div>
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
            </>
        );
    },
});
