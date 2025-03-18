import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import Delivery from "../pages/restaurant/Delivery";
import Pickup from "../pages/restaurant/Pickup";
import Recommendations from "../pages/restaurant/Recommendations";

const tabs = [
  { key: "first", title: "Delivery", component: <Delivery /> },
  { key: "second", title: "Pick Up", component: <Pickup /> },
  { key: "third", title: "Explore", component: <Recommendations /> },
];

const RestComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full mx-auto px-[12px] ">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex bg-orange-100 rounded-lg mb-[10px] p-1">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.key}
              className={({ selected }) =>
                `flex-1 py-2 text-center text-[12px] font-medium rounded-lg transition-all ${
                  selected ? "text-primary" : "text-gray-400"
                }`
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={tab.key} className="rounded-l ">
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default RestComponent;
