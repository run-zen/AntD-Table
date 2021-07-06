import React, { useState, useEffect, useRef, useCallback } from "react";
import { Table, Space } from "antd";
import { Layout, Menu, Breadcrumb, Button, Input } from "antd";
import Highlighter from "react-highlight-words";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import ReactDragListView from "react-drag-listview";
import AddDrawer from "./components/AddDrawer";
// import { useSelector, useDispatch } from "react-redux";
// import { addPerson, deletePerson } from "./redux/actions";
import { v4 } from "uuid";

const { Header, Content, Footer } = Layout;

const openSideNav = { right: "0px" };
const closeSideNav = { right: "-250px" };
const rotateTop = { transform: "rotateZ(-135deg)" };
const rotateBottom = { transform: "rotateZ(135deg)" };
const moveMiddle = { transform: "translateX(35px)", opacity: "0" };

const columns = [
    // {
    //     title: "Sl No. (fixed column)",
    //     dataIndex: "key",
    //     fixed: "left",
    //     key: "key",
    //     width: 100,
    // },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        // className: "draggable",
        // width: 400,
        // filters: [
        //     { text: "Aoe", value: "Aoe" },
        //     { text: "Cim", value: "Cim" },
        // ],
        // onFilter: (value, record) => record.name.indexOf(value) === 0,
        // sorter: (a, b) => (a.name < b.name ? -1 : 1),
        // sortDirections: ["ascend", "descend"],
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        // className: "draggable",

        // filters: [
        //     { text: "18+", value: "18" },
        //     { text: "30+", value: "30" },
        // ],
        // onFilter: (value, record) => record.age >= value,
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        // width: 600,
        // className: "draggable",
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
    // const people = useSelector((state) => state.people);
    // const dispatch = useDispatch();
    // const deleteColumn = {
    //     title: "Action",
    //     key: "action",
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <span
    //                 className="delete-row"
    //                 onClick={() => dispatch(deletePerson(record.id))}
    //             >
    //                 Delete
    //             </span>
    //         </Space>
    //     ),
    //     className: "draggable",
    //     width: 200,
    // };

    const [tableColumns, setTablecolumns] = useState([...columns]);
    const [tableData, setTableData] = useState([...data]);
    const [toggleNav, setToggleNav] = useState(false);
    const searchInput = useRef(null);
    const [search, setSearch] = useState({ searchText: "", searchColumn: "" });
    const stateRef = useRef();
    stateRef.current = search;

    const getColumnSearchProps = useCallback(
        (dataIndex) => ({
            width: 300,
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={(node) => (searchInput.current = node)}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{ marginBottom: 8, display: "block" }}
                        focus={{ cursor: "all" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex)
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
                                setSearch({
                                    searchText: selectedKeys[0],
                                    searchColumn: dataIndex,
                                });
                                // setSearchText(selectedKeys[0]);
                                // setSearchedColumn(dataIndex);
                                // this.setState({
                                //     searchText: selectedKeys[0],
                                //     searchedColumn: dataIndex,
                                // });
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{ color: filtered ? "#1890ff" : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex]
                          .toString()
                          .toLowerCase()
                          .includes(value.toLowerCase())
                    : "",
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current.select(), 100);
                }
            },
            render: (text) =>
                stateRef.current.searchColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: "#ffc069",
                            padding: 0,
                        }}
                        searchWords={[stateRef.current.searchText]}
                        autoEscape={true}
                        textToHighlight={text ? text.toString() : ""}
                    />
                ) : (
                    text
                ),
        }),
        []
    );

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearch({ searchText: selectedKeys[0], searchColumn: dataIndex });

        // setSearchedColumn(dataIndex);
        // setSearchText(selectedKeys[0]);
        // this.setState({
        //     searchText: selectedKeys[0],
        //     searchedColumn: dataIndex,
        // });
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearch({
            searchText: "",
            searchColumn: "",
        });
        // setSearchText("");
        // this.setState({ searchText: "" });
    };

    useEffect(() => {
        setTablecolumns((prev) => {
            let columns = [...prev];
            columns = columns.map((el) => {
                return { ...el, ...getColumnSearchProps(el.dataIndex) };
            });
            return [...columns];
        });
    }, [getColumnSearchProps]);

    useEffect(() => {
        setTablecolumns((prev) => {
            return [
                ...prev,
                {
                    title: "Action",
                    key: "action",
                    render: (text, record) => (
                        <Space size="middle">
                            <span
                                className="delete-row"
                                onClick={() => deleteRow(record.id)}
                            >
                                Delete
                            </span>
                        </Space>
                    ),
                    className: "draggable",
                    width: 200,
                },
            ];
        });
    }, []);

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            // if (fromIndex === 0 || toIndex === 0) return;
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

    const deleteRow = (id) => {
        setTableData((prev) => {
            let data = [...prev];
            data = data.filter((el) => el.id !== id);
            return [...data];
        });
    };

    const OnSubmit = (values) => {
        // dispatch(addPerson(values));
        let row = { ...values };
        row.id = v4();
        row.key = v4();
        setTableData((prev) => {
            return [...prev, { ...row }];
        });
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
