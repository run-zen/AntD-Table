import React, { useState, useEffect } from "react";
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
        tags: ["nice", "developer"],
    },
    {
        id: v4(),
        key: v4(),
        name: "Cim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        id: v4(),
        key: v4(),
        name: "Aoe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        id: v4(),
        key: v4(),
        name: "Zoe Zal",
        age: 16,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

function App() {
    const [tableColumns, setTablecolumns] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [toggleNav, setToggleNav] = useState(false);
    const [search, setSearch] = useState({ searchText: "", searchColumn: "" });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearch({ searchText: selectedKeys[0], searchColumn: dataIndex });
    };

    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const focusInput = (id) => {
        document.getElementById(id).select();
    };

    const loadData = (columns) =>
        columns.reduce((result, curritem) => {
            curritem.id = v4();
            curritem.width = 300;
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
            curritem.render = (text) => (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[search.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
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
        width: 80,
    });

    useEffect(() => {
        let ColData = loadData(columns);
        ColData.push(AddDeleteRow());
        setTablecolumns(ColData);
        setTableData(data);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteRow = (id) => {
        setTableData((prev) => {
            let data = prev.reduce((result, curritem) => {
                if (curritem.id !== id) {
                    result.push(curritem);
                }
                return result;
            }, []);

            return data;
        });
    };

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
                                scroll={{ x: "max-content", y: 440 }}
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
