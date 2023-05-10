import React,{useState,useEffect} from 'react';
import { getServiceCentreTickets, getUserTickets as getUserTicketsApi} from '../../../service/api';
import {useNavigate} from 'react-router-dom';
import './Overview.scss';
import { connect } from 'react-redux';

const Overview = (props) => {
  const { userData } = props;
 
  const navigate = useNavigate();
  // const gotoTickets = useCallback(() => navigate('/tickets', {replace: true}), [navigate]);

  // let loggedInUser = JSON.parse(localStorage.getItem('loginResponse'));

  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    if(userData.userRole == 'SERVICECENTER') {
      getTickets();
    } else {
      getUserTickets();
    }
  }, [])

  const getTickets = async () =>{
      const response = await getServiceCentreTickets(userData.centerEmailId);
      setTickets(response.data);
  } 

const getUserTickets = async () =>{
    const response = await getUserTicketsApi(userData.userEmailId);
    setTickets(response.data);
} 

const filterTicketsAndAddTitle = (status, title) => {
  return {
    title : title,
    tickets : status ? tickets?.filter((item)=>item.status==status) : tickets
  }
}


  return (
    <>
    <div className="title">Ticket Status</div>
    <section className="p-4">
      <div className="container">
        <div className="row ">
         <div className="col col-lg-4 col-md-6 col-xs-12">
         <div className="card-container  btn btn-outline-primary "  onClick={() => navigate('/tickets', {state: filterTicketsAndAddTitle(null, "All Tickets"),replace: true})} >
            <i className="card--icon blue fa-solid fa-file-lines"></i>
            <span className="card--quantity"> {tickets?.length}</span>
            <p className="card--name">Total Tickets</p>
          </div>
         </div>


         <div className="col col-lg-4 col-md-6 col-xs-12">
         <div className="card-container btn btn-outline-warning " onClick={() => navigate('/tickets', {state: filterTicketsAndAddTitle("OPEN", "Open Tickets"), replace: true})}>
            <i className="card--icon yellow fa-solid fa-file-lines"></i>
            <span className="card--quantity ">{tickets?.filter((item)=>item.status=="OPEN")?.length}</span>
            <p className="card--name">Open Tickets</p>
          </div>
         </div>

         <div className="col col-lg-4 col-md-6 col-xs-12">
         <div className="card-container btn btn-outline-success" onClick={() => navigate('/tickets', {state: filterTicketsAndAddTitle("CLOSE", "Close Tickets"), replace: true})}>
            <i className="card--icon black fa-solid fa-file-lines"></i>
            <span className="card--quantity">{tickets?.filter((item)=>item.status=="CLOSE")?.length}</span>
            <p className="card--name">Closed Tickets</p>
          </div>
         </div>

        
         
        </div>
      </div>
    </section>

    </>
  );
};

const mapStateToProps = (state) => ({
  ...state,
  userData: state.user.users,
});
const mapDispatchToProps = (dispatch) => ({
  // fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
