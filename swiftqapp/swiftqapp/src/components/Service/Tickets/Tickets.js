import React, { useState } from "react";
import {Table} from 'antd';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import { Button,Space } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../Tickets/Tickets.css";



const Tickets = () => {
  const location = useLocation();
    console.log(location.state);
    const [tickets, setTickets] = useState(location?.state?.tickets);
    const navigate = useNavigate();

    
    const columns = [
      {
        title: 'Ticket Id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Ticket Description',
        dataIndex: 'ticketDesceription',
        key: 'ticketDesceription',
      },
      {
        title: 'User Email',
        dataIndex: 'userEmail',
        key: 'userEmail',
      },
      {
        title: 'Center Email',
        dataIndex: 'centerEmail',
        key: 'centerEmail',
      },
    
      {
        title: 'Product Category',
        dataIndex: 'productCategory',
        key: 'productCategory',
      },
      {
        title: 'Model Name',
        dataIndex: 'modelName',
        key: 'modelName',
      },
      {
        title: 'In Warranty',
        dataIndex: 'inWarrenty',
        key: 'inWarrenty',
        render : (text) => String(text),
      },
      {
        title: 'Ticket Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Issue Type',
        dataIndex: 'issueType',
        key: 'issueType',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => {
          console.log("table log : ", record);
          return (
               <Space size="middle">
            <Link to="/chat" state={record}><Button className="view-button">View</Button></Link>
               </Space>
         
         
        )},
      }
      
    ];
    
    
    return(
      <>
      <div className="title_name">{location?.state?.title}</div>
      
      <Link to="/tickets-overview"><ArrowLeftOutlined className="arrow"/> </Link>
      


    {/* // <div className="app status-table" > */}
    <Table columns={columns} dataSource={tickets} rowClassName={(record, index) => (record.status=="OPEN"? 'green':'red')} />
    {/* // </div> */}
    </>
    );

}

export default Tickets;

