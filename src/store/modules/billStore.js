import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const billStore = createSlice({
    name: "bill",
    // 数据状态
    initialState: {
        billList: []
    },
    reducers: {
        // 同步修改方法
        setBillList(state, action) {
            // 设置账单列表
            state.billList = action.payload;
        }
    }
    
})

// 解构actionCreater
const { setBillList } = billStore.actions;
// 编写异步
const getBillList = () => {
    return async (dispatch) => {
        // 异步请求
        const res = await axios.get("http://localhost:3001/ka");
        // 调用同步方法
        dispatch(setBillList(res.data));
    }
}

export { getBillList };

// 到处reducer
const billReducer = billStore.reducer;

export default billReducer;