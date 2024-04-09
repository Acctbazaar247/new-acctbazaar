import AppTabs from "../ui/AppTabs";
import { useEffect, useState } from "react";
import OrderAccountCard from "./OrderAccountCard";
import { IOrder } from "@/types/common";
type Props = {
  onChange: (string: string) => void;
  data: IOrder[];
};
const OrdersMain: React.FC<Props> = ({ onChange, data }) => {
  const tabs = [
    { label: "All" },
    { label: "Pending" },
    { label: "Completed" },
    { label: "Cancelled" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].label);
  useEffect(() => {
    if (onChange) {
      onChange(activeTab);
    }
  }, [activeTab, onChange]);
  return (
    <div className="bg-white rounded-2xl w-full min-h-[90vh] p-6 2xl:p-8">
      <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-3/4 py-6 space-y-6">
        {data.map((single) => {
          return <OrderAccountCard orderInfo={single} key={single.id} />;
        })}
      </div>
    </div>
  );
};

export default OrdersMain;
