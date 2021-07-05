import React, { useState } from "react";
import { Table, Space } from "antd";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import ReactDragListView from "react-drag-listview";
import AddDrawer from "./components/AddDrawer";
import { useSelector, useDispatch } from "react-redux";
import { addPerson, deletePerson } from "./redux/actions";

const { Header, Content, Footer } = Layout;

const openSideNav = { right: "0px" };
const closeSideNav = { right: "-250px" };
const rotateTop = { transform: "rotateZ(-135deg)" };
const rotateBottom = { transform: "rotateZ(135deg)" };
const moveMiddle = { transform: "translateX(35px)", opacity: "0" };

function App() {
    const people = useSelector((state) => state.people);
    const dispatch = useDispatch();
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
            className: "draggable",
            width: 400,
            filters: [
                { text: "Aoe", value: "Aoe" },
                { text: "Cim", value: "Cim" },
            ],
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => (a.name < b.name ? -1 : 1),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            className: "draggable",

            filters: [
                { text: "18+", value: "18" },
                { text: "30+", value: "30" },
            ],
            onFilter: (value, record) => record.age >= value,
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: 600,
            className: "draggable",
        },

        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <span
                        className="delete-row"
                        onClick={() => dispatch(deletePerson(record.id))}
                    >
                        Delete
                    </span>
                </Space>
            ),
            className: "draggable",
            width: 200,
        },
    ];
    const [tableColumns, setTablecolumns] = useState([...columns]);
    const [toggleNav, setToggleNav] = useState(false);

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

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const OnSubmit = (values) => {
        dispatch(addPerson(values));
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
                            visible={visible}
                            onSubmit={OnSubmit}
                        />
                        <ReactDragListView {...dragProps}>
                            <Table
                                columns={tableColumns}
                                dataSource={people}
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
