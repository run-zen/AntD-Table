import React, { useState, useEffect, useRef } from "react";
import { Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { Layout, Menu, Breadcrumb, Button, Input } from "antd";
import {
    PlusCircleFilled,
    SearchOutlined,
    DeleteFilled,
} from "@ant-design/icons";
import ReactDragListView from "react-drag-listview";
import AddDrawer from "./components/AddDrawer";
import { v4 } from "uuid";
import { Tabs } from "antd";
import { Bar, Scatter } from "react-chartjs-2";

const { TabPane } = Tabs;

const { Header, Content, Footer } = Layout;

const openSideNav = { right: "0px" };
const closeSideNav = { right: "-250px" };
const rotateTop = { transform: "rotateZ(-135deg)" };
const rotateBottom = { transform: "rotateZ(135deg)" };
const moveMiddle = { transform: "translateX(35px)", opacity: "0" };

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
];

const data = [
    {
        id: v4(),
        key: v4(),
        name: "Bohn Brown",
        age: 25,
        address: "New York No. 1 Lake Park",
        bar: [1, 2, 3, 4],
        barLabels: ["2017", "2018", "2019", "2020"],
        scatter: [
            {
                x: -10,
                y: 0,
            },
            {
                x: 0,
                y: 10,
            },
            {
                x: 10,
                y: 5,
            },
            {
                x: 0.5,
                y: 5.5,
            },
        ],
        scatterLabel: "scatter",
    },
    {
        id: v4(),
        key: v4(),
        name: "Cim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        bar: [1, 2, 3, 4],
        barLabels: ["2017", "2018", "2019", "2020"],
        scatter: [
            {
                x: -10,
                y: 0,
            },
            {
                x: 0,
                y: 10,
            },
            {
                x: 10,
                y: 5,
            },
            {
                x: 0.5,
                y: 5.5,
            },
        ],
        scatterLabel: "scatter",
    },
    {
        id: v4(),
        key: v4(),
        name: "Aoe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        bar: [1, 2, 3, 4],
        barLabels: ["2017", "2018", "2019", "2020"],
        scatter: [
            {
                x: -10,
                y: 0,
            },
            {
                x: 0,
                y: 10,
            },
            {
                x: 10,
                y: 5,
            },
            {
                x: 0.5,
                y: 5.5,
            },
        ],
        scatterLabel: "scatter",
    },
    {
        id: v4(),
        key: v4(),
        name: "Zoe Zal",
        age: 16,
        address: "Sidney No. 1 Lake Park",
        bar: [4, 2, 6, 9],
        barLabels: ["2017", "2018", "2019", "2020"],
        scatter: [
            {
                x: -10,
                y: 0,
            },
            {
                x: 0,
                y: 10,
            },
            {
                x: 10,
                y: 5,
            },
            {
                x: 0.5,
                y: 5.5,
            },
        ],
        scatterLabel: "scatter",
    },
];

function App() {
    const [tableColumns, setTablecolumns] = useState([]);
    const [tableData, setTableData] = useState(data);
    const [toggleNav, setToggleNav] = useState(false);
    const [search, setSearch] = useState({ searchText: "", searchColumn: "" });
    const searchRef = useRef(null);
    searchRef.current = search;
    const ref = useRef(null);
    ref.current = tableData;

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearch({ searchText: selectedKeys[0], searchColumn: dataIndex });
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearch({ searchText: "", searchColumn: "" });
    };

    const focusInput = (id) => {
        document.getElementById(id).select();
    };

    const loadData = (columns) =>
        columns.reduce((result, curritem) => {
            curritem.className = "draggable";
            curritem.id = v4();
            curritem.width = "10%";
            curritem.filterDropdown = ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        id={curritem.id}
                        placeholder={`Search ${curritem.dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(
                                selectedKeys,
                                confirm,
                                curritem.dataIndex
                            )
                        }
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(
                                    selectedKeys,
                                    confirm,
                                    curritem.dataIndex
                                )
                            }
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            );
            curritem.filterIcon = (filtered) => (
                <SearchOutlined
                    style={{ color: filtered ? "#1890ff" : undefined }}
                />
            );
            curritem.onFilter = (value, record) =>
                record[curritem.dataIndex]
                    ? record[curritem.dataIndex]
                          .toString()
                          .toLowerCase()
                          .includes(value.toLowerCase())
                    : "";
            curritem.onFilterDropdownVisibleChange = (visible) => {
                if (visible) {
                    setTimeout(() => focusInput(curritem.id), 100);
                }
            };
            curritem.render = (text) =>
                searchRef.current.searchColumn === curritem.dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: "#ffc069",
                            padding: 0,
                        }}
                        searchWords={[searchRef.current.searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                ) : (
                    text
                );

            result.push(curritem);
            return result;
        }, []);

    const AddDeleteRow = () => ({
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <span
                    className="delete-row"
                    onClick={() => deleteRow(record.id)}
                >
                    <DeleteFilled />
                </span>
            </Space>
        ),
        className: "draggable delete-column",
        width: "5%",
    });
    const chartColumn = () => ({
        title: "Chart",
        key: "chart",
        dataIndex: "chart",
        width: "50%",
        render: (text, record, index) => (
            <>
                <Tabs defaultActiveKey="1" tabPosition={"top"} centered>
                    <TabPane tab="Bar Chart" key="1">
                        <Bar
                            data={{
                                labels: record.barLabels,
                                datasets: [
                                    {
                                        label: null,
                                        data: record.bar,
                                        backgroundColor: [
                                            "hsla(0,50%,50%,0.2)",
                                            "rgba(54, 162, 235, 0.2)",
                                            "rgba(255, 206, 86, 0.2)",
                                            "rgba(75, 192, 192, 0.2)",
                                        ],
                                        borderColor: [
                                            "hsla(0,50%,50%,1)",
                                            "rgba(54, 162, 235, 1)",
                                            "rgba(255, 206, 86, 1)",
                                            "rgba(75, 192, 192, 1)",
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            height={200}
                            options={{
                                indexAxis: "y",
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        beginAtZero: true,
                                        display: true,
                                    },
                                },
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                    </TabPane>
                    <TabPane tab="Scatter Chart" key="2">
                        <Scatter
                            data={{
                                datasets: [
                                    {
                                        label: record.scatterLabel,
                                        data: record.scatter,
                                        backgroundColor: "red",
                                    },
                                ],
                            }}
                            height={200}
                            options={{ maintainAspectRatio: false }}
                        />
                    </TabPane>
                </Tabs>
            </>
        ),
    });

    const serialNumCol = () => ({
        title: "Sl No.",
        key: "serialnum",
        render: (text, record, index) => index,
        width: "5%",
    });

    const AddCustomColumns = (column) => {
        column.push(AddDeleteRow());
        column.push(chartColumn());
        column.unshift(serialNumCol());
        return [...column];
    };

    useEffect(() => {
        console.log("i am here");
        let ColData = AddCustomColumns(loadData(columns));
        setTablecolumns(ColData);
    }, []);

    function deleteRow(id = 0) {
        if (id === 0) {
            let data = [...tableData];
            data.pop();
            return setTableData(data);
        }

        let data = ref.current.filter((el) => el.id !== id);
        console.log(data);
        setTableData([...data]);
        return;
    }

    const OnSubmit = (values) => {
        let row = values;
        row.id = v4();
        row.key = v4();
        setTableData((prev) => {
            let prevData = [...prev];
            prevData.push(row);
            return prevData;
        });
    };

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const data = [...tableColumns];
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setTablecolumns(data);
        },
        nodeSelector: "th.draggable",
    };

    function toggleSidebar() {
        setToggleNav((prev) => !prev);
    }

    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const showDrawer = () => {
        setVisibleDrawer(true);
    };
    const onClose = () => {
        setVisibleDrawer(false);
    };

    return (
        <>
            <div
                className="sideNav"
                style={toggleNav ? openSideNav : closeSideNav}
            >
                <div>About</div>
                <div>Services</div>
                <div>Clients</div>
                <div>Contact</div>
            </div>
            <Layout className="layout">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                    >
                        <Menu.Item key="1">{`Home`}</Menu.Item>
                    </Menu>
                </Header>
                <div
                    key="2"
                    className="sideNav-btn"
                    onClick={toggleSidebar}
                    style={
                        toggleNav
                            ? { position: "fixed" }
                            : { position: "absolute" }
                    }
                >
                    <div style={toggleNav ? rotateTop : null}></div>
                    <div style={toggleNav ? moveMiddle : null}></div>
                    <div style={toggleNav ? rotateBottom : null}></div>
                </div>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>{`Home`}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Button
                            type="primary"
                            onClick={showDrawer}
                            className="add-btn"
                        >
                            <PlusCircleFilled />
                            Add
                        </Button>

                        <AddDrawer
                            onClose={onClose}
                            visible={visibleDrawer}
                            onSubmit={OnSubmit}
                        />
                        <ReactDragListView {...dragProps}>
                            <Table
                                columns={tableColumns}
                                dataSource={tableData}
                                size="middle"
                                pagination={{ position: ["none"] }}
                                scroll={{ x: "100%", y: "70vh" }}
                                bordered="true"
                            />
                        </ReactDragListView>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </>
    );
}

export default App;
