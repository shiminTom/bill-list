import { NavBar,DatePicker } from "antd-mobile";
import { useMemo, useState,useEffect } from "react";
import './index.scss';
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux"; 
import _ from "lodash";

function Month(){
    // 按月做数据分组
    const billList = useSelector(state => state.bill.billList);
    // 使用useMemo来优化性能，避免每次渲染都重新计算分组
    const monthGroup = useMemo(() => {
        return _.groupBy(billList,item=> dayjs(item.date).format('YYYY-MM'));
    }, [billList]);
    const [currentMonthList, setCurrentMonthList] = useState([]);
    // 计算每个月的支出、收入和结余
    const monthResult = useMemo(() => {
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((total, item) => total + item.money, 0);
        const income = currentMonthList.filter(item => item.type === 'income').reduce((total, item) => total + item.money, 0);
        return {
            pay,
            income,
            balance: income + pay
        }
    }, [currentMonthList]);
    // 定义一个状态变量，用于控制日期选择器的显示与隐藏
    const [dateVisible, setDateVisible] = useState(false)
    // 使用dayjs库获取当前日期，并格式化为'YYYY-MM'
    const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'));
    
    // 在组件加载时，设置当前月份的账单列表
    useEffect(() => {
        const newDate = dayjs(new Date()).format('YYYY-MM');
        if( monthGroup[newDate]) {
            setCurrentMonthList(monthGroup[newDate] || []);
        }
    }, [monthGroup]);
    
    // 定义一个函数，用于确认日期
    const onConfirm = (date) => {
        // 隐藏日期选择器
        setDateVisible(false);
        // 格式化日期，格式为'YYYY-MM'
        const formattedDate = dayjs(date).format('YYYY-MM');
        // 如果没有对应的账单列表，则使用空数组
        setCurrentMonthList(monthGroup[formattedDate] || []);
        // 设置当前日期为格式化后的日期
        setCurrentDate(formattedDate);
    }
    return(
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>月度收支</NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">{currentDate} 账单</span>
                        <span className={classNames('arrow',dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className="twoLineOverview">
                        <div className="item">
                            <span className="money">{monthResult.pay}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.balance}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Month