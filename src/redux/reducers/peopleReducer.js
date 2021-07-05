import { v4 } from "uuid";

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

const peopleReducer = (state = data, action) => {
    switch (action.type) {
        case "ADD":
            let row = { ...action.payload };
            row.id = v4();
            row.key = v4();
            const AddState = [...state, row];
            return AddState;
        case "DELETE":
            const id = action.payload;
            const deleteState = state.filter((el) => el.id !== id);
            return deleteState;
        default:
            return state;
    }
};

export default peopleReducer;
