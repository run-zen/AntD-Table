import React, { useState } from "react";
import { Table, Space } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import ReactDragListView from "react-drag-listview";

const { Header, Content, Footer } = Layout;

const columns = [
    {
        title: "Sl No. (fixed column)",
        dataIndex: "key",
        width: 100,
        key: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        className: "draggable",
        width: 200,
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
        width: 200,
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
        className: "draggable",
        width: 200,
    },

    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <div>Invite {record.name}</div>
                <div>Delete</div>
            </Space>
        ),
        className: "draggable",
        width: 200,
    },
];

const data = [
    {
        key: "1",
        name: "Bohn Brown",
        age: 25,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Cim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Aoe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
    {
        key: "4",
        name: "Zoe Zal",
        age: 16,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

function App() {
    const [tableColumns, setTablecolumns] = useState([...columns]);
    const [toggleNav, setToggleNav] = useState(false);

    const openSideNav = { right: "0px" };
    const closeSideNav = { right: "-250px" };

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            if (fromIndex === 0 || toIndex === 0) return;
            const data = [...tableColumns];
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setTablecolumns(data);
        },
        nodeSelector: "th.draggable",
    };

    function toggleSidebar() {
        console.log(`open side bar`);
        setToggleNav((prev) => !prev);
    }

    return (
        <>
            <div
                className="sideNav"
                style={toggleNav ? openSideNav : closeSideNav}
            >
                <span class="closebtn" onClick={toggleSidebar}>
                    &times;
                </span>

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
                        <div
                            key="2"
                            className="sideNav-btn"
                            onClick={toggleSidebar}
                        >{`Open sidebar`}</div>
                    </Menu>
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <ReactDragListView {...dragProps}>
                            <Table
                                columns={tableColumns}
                                dataSource={data}
                                size="middle"
                                pagination={{ position: ["none"] }}
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
