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
        },
        // 同步添加账单方法
        addBill (state, action) {
            state.billList.push(action.payload)
        }
    }
    
})

// 解构actionCreater
const { setBillList,addBill } = billStore.actions;
// 编写异步编写
const getBillList = () => {
    return async (dispatch) => {
        // 异步请求
        const res = await axios.get("http://localhost:4000/ka");
        // 调用同步方法
        dispatch(setBillList(res.data));
    }
}

const addBillList = (data) => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.post('http://localhost:4000/ka', data)
    // 触发同步reducer
    dispatch(addBill(res.data))
  }
}

export { getBillList,addBillList };

// 到处reducer
const billReducer = billStore.reducer;

export default billReducer;