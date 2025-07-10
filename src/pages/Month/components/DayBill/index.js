import classNames from "classnames";
import{ useState,useMemo } from "react";
import './index.scss'

export default function DayBill({ date, billList}) {
    // 控制展开收起
    const [expand, setExpand] = useState(true);
    // 计算每天的支出、收入和结余
    const dayResult = useMemo(() => {
            const pay = billList.filter(item => item.type === 'pay').reduce((total, item) => total + item.money, 0);
            const income = billList.filter(item => item.type === 'income').reduce((total, item) => total + item.money, 0);
            return {
                pay,
                income,
                balance: income + pay
            }
    }, [billList])
    return (
        <div className="dayBill">
            <div className="bill_header">
                <div className="dayBill__title" onClick={() => setExpand(!expand)}>
                    <span>{date}</span>
                    <span className={classNames('arrow', !expand && 'expand')}></span>
                </div>
                <div className={classNames('dayBill__content', !expand && 'packup')}>
                    <div className="dayBill__content__item">
                        <span className="pay">支出</span><span>{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="dayBill__content__item">
                        <span className="income">收入</span><span>{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="dayBill__content__item">
                        <span className="balance_money">{dayResult.balance.toFixed(2)}</span> <span className="balance">结余</span>
                    </div>
                </div>
            </div>
            <div className="bill_footer">
                {
                    billList.map(item => {
                        return (
                            <div className="bill" key={item.id}>
                                <div className="bill_content">
                                    <div className="detail">{item.useFor}</div>
                                    <div className={classNames('money', item.type )}>{item.money.toFixed(2)}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}