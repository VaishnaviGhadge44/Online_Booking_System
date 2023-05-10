import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import {useState,useEffect} from 'react';
import { getallUsers } from '../../service/api';
import './Dashboard.scss';
import { getAllTickets } from '../../service/api';
// import { Category, ChartComponent, ColumnSeries, Inject, LineSeries,Legend, SeriesCollectionDirective, SeriesDirective,DataLabel, Tooltip } from '@syncfusion/ej2-react-charts';
import * as React from "react"; 
import * as ReactDOM from "react-dom";
import axios from "axios";
// Resolves charts dependancy
charts(FusionCharts);
 
function ChartViewer(props){
    const [booking, setBooking] = useState({});
    let key = "slotDate";  
    let key2 = "label"; 
    let arr2 = []; 

    useEffect(()=>{
        if(props.bookings.length > 0){

        getBookings();
    }
    },[props.bookings])
 
    function getBookings(){
        props.bookings.forEach((x)=>{
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
        console.log("arr2 bookings: " ,arr2);
        setBooking(arr2); 
    }
  
   
 
            const dataSource = {
                chart: {
                  caption: "Bookings",
                  subcaption: "",
                  yaxisname: "No. Of Bookings",
                  decimals: "1",
                  theme: "fusion",
                  bgColor: "#ffffff",
                  dataEmptyMessage : "There is no data to be displayed here",
                  dataEmptyMessageFont : "Helvetica",
                  dataEmptyMessageFontSize : "20",
                  dataEmptyMessageColor : "#13334a"
                },
                data: booking
              };
 
    return (
        <>
        {booking.length > 0 &&  <ReactFusioncharts
        type="column2d"
        width="100%"
        height="500"
        dataFormat="JSON"
        dataSource={dataSource}
      />}
      </>
     
    );
}
export default ChartViewer












// import {useState,useEffect} from 'react';
// import { getallUsers } from '../../service/api';
// import { getAllTickets } from '../../service/api';

// import { Category, ChartComponent, ColumnSeries, Inject, LineSeries,Legend, SeriesCollectionDirective, SeriesDirective,DataLabel, Tooltip } from '@syncfusion/ej2-react-charts';
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import axios from "axios";


// function ChartViewer(){

// let loggedInUser = JSON.parse(sessionStorage.getItem('loginResponse'));

//     useEffect(() => {
//         getUsers();
//         getTickets();
//     }, [])
//     const [tickets, setTickets] = useState([]);

//     const getTickets = async () =>{
//         const response = await getAllTickets(loggedInUser.email_id);
//         setTickets(response.data);
//     }

//         const [bookings, setBookings] = useState([]); 
//         const [booking, setBooking] = useState({});
//         const getUsers = async () =>{ 
            
//             await getallUsers("testing@gmail.com").then(response => {
//                 console.log(response);
//                 setBookings(response.data);
//             }).then(response => {
//                 let key = "slotDate"; 
//                 let arr2 = [];
     
//                 bookings.forEach((x)=>{
    
//                 if(arr2.some((val)=>{ return val[key] == x[key] })){
    
//                     arr2.forEach((k)=>{
//                     if(k[key] === x[key]){
//                         k["occurrence"]++
//                     }
//                     })
    
//                 }else{
//                     let a = {}
//                     a[key] = x[key]
//                     a["occurrence"] = 1
//                     arr2.push(a);
//                 }
//                 });
    
    
//                 console.log("arr2 : " ,arr2);
    
//                     setBooking(arr2);
//             }
               
//             );

           

//     }


//     return(
//         <ChartComponent primaryXAxis={{valueType:"Category",title:"Dates"}} id="charts" primaryYAxis={{title:"Bookings Count"}} legendSettings={{visible:true}} tooltip={{enable:true}}>
//   <Inject services={[LineSeries,ColumnSeries, Tooltip, Category,Legend,DataLabel, Category]}/>
//   <SeriesCollectionDirective>
//     <SeriesDirective type='Line' dataSource={booking} xName="slotDate" yName="occurrence" name='Bookings' marker={{dataLabel:{visible:true},visible:true}}/>
//   </SeriesCollectionDirective>
// </ChartComponent>
//     )
// }


// export default ChartViewer




