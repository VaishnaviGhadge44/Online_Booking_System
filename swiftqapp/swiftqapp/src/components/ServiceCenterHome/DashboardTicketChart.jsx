import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { getAllTickets } from '../../service/api';
import {useState,useEffect} from 'react';

import './Dashboard.scss';
// Resolves charts dependancy
charts(FusionCharts); 



function TicketPieChart(props){

 
    const [ticket, setTicket] = useState({}); 
   
    let key = "status"; 
    let key2 = "label"; 
    let arr2 = [];

    useEffect(()=>{
        if(props.tickets.length > 0){
            getTickets();

        }
    },[props.tickets])
 
    function getTickets(){
        props.tickets.forEach((x)=>{
            x[key2] = x[key]; // Assign new key 
            // delete x[key]; // Delete old key
        if(arr2.some((val)=>{ return val[key2] == x[key2] })){
            arr2.forEach((k)=>{
            if(k[key2] === x[key2]){ 
                k["value"]++
            }
            })
        }else{ 
            let a = {}
            a[key2] = x[key2]
            a["value"] = 1
            arr2.push(a);
        }
        }); 
        console.log("arr2 tickets : " ,arr2);
        setTicket(arr2); 
    }
   



   

    const dataSource = {
        chart: {
          caption: "Tickets",
          plottooltext: "<b>$percentValue $label</b> Tickets",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "bottom",  
          usedataplotcolorforlabels: "1",
          theme: "fusion",
          bgColor : "#ffffff",
          dataEmptyMessage : "There is no data to be displayed here",
          dataEmptyMessageFont : "Helvetica",
          dataEmptyMessageFontSize : "20",
          dataEmptyMessageColor : "#13334a"
        },
        data: ticket
      };
    return (
        <>
        {ticket.length > 0 && <ReactFusioncharts
            type="pie2d"
            width="100%"
            height="500"
            dataFormat="JSON"
            dataSource={dataSource}
          />}
      </>
    );
}


export default TicketPieChart
