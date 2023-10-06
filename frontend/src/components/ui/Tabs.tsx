"use client";

import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";

interface Props {
  onTabChange: (value: string) => void;
}

const TabsUI = ({ onTabChange }: Props) => {
  const TABS = [
    {
      label: "Все",
      value: "all",
    },
    {
      label: "Активные",
      value: "active",
    },
    {
      label: "Скрытые",
      value: "hidden",
    },
  ];
  return (
    <Tabs value="all" className="w-full md:w-max">
      <TabsHeader>
        {TABS.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={() => onTabChange(value)}>
            &nbsp;&nbsp;{label}&nbsp;&nbsp;
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default TabsUI;
