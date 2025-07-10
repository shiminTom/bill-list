import { Outlet,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBillList } from "../../store/modules/billStore.js";
import { TabBar } from "antd-mobile";
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from "antd-mobile-icons";
import "./index.scss";

const tabs = [
  {
    key: "/month",
    title: "月度账单",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "记账",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
];

function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const navigate = useNavigate();
  const switchRouter = (path) => {
    navigate(path);
  };
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>

      <div className="footer">
        <TabBar onChange={switchRouter}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}

export default Layout;
