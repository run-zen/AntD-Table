import React from "react";
import { Table, Space } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import ReactDragListView from "react-drag-listview";

const { Header, Content, Footer } = Layout;

function App() {
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
            age: 32,
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
            age: 18,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
        },
    ];

    // const [tableData,setTabledata] = React.useState([...data])
    const [tableColumns, setTablecolumns] = React.useState([...columns]);

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

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                >
                    {new Array(3).fill(null).map((_, index) => {
                        const key = index + 1;
                        return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                    })}
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
                        />
                    </ReactDragListView>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
}

export default App;
