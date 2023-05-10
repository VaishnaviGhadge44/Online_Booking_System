import React, { useEffect, useState } from 'react';
import Completed from './Completed';
import InProgress from './InProgress';
import AllBookings from './AllBookings';
import { Tabs } from 'antd';
import { useLocation } from 'react-router-dom';
import Expired from './Expired';

const { TabPane } = Tabs;

const Bookings = (props) => {
const location = useLocation();
const data = location?.state

  const [selectedTab, setSelectedTab] = useState(data||"1");
  const onNavTabClick = key => {
    setSelectedTab(key);
  };

  return (
    <div className="main-content_scroll p-5">
      <div className="main-content">
        <Tabs defaultActiveKey={selectedTab} onChange={onNavTabClick}>
          <TabPane tab="All Bookings" key="1">
            <div className="tab-content">
              <AllBookings />
            </div>
          </TabPane>
          <TabPane tab="Completed Bookings" key="2">
            <div className="tab-content">
              <Completed selectedTab={selectedTab} />
            </div>
          </TabPane>
          <TabPane tab="InProgress Bookings" key="3">
            <div className="tab-content">
              <InProgress selectedTab={selectedTab} />
            </div>
          </TabPane>
          <TabPane tab="Expired Bookings" key="4">
            <div className="tab-content">
              <Expired selectedTab={selectedTab} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Bookings;
