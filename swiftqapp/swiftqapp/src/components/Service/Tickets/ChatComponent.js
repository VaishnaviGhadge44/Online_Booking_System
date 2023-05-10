import * as React from "react";
import { Row,Col,Card, Modal,Rate } from "antd";
import "../Tickets/ChatComponent.scss";
import { Button } from 'antd';
//import '~antd/dist/antd.css';
import {useNavigate,useLocation, Link} from 'react-router-dom';
import Chat from './chat/Chat';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { closeTicket,postReviewAndRatings } from '../../../service/api'
import { connect } from "react-redux";

const ChatComponent = (props) => {

  // let loggedInUser = JSON.parse(localStorage.getItem('loginResponse'));
  const { userData } = props;

const location = useLocation();
const data = location?.state
const ticket = data;
const navigate = useNavigate();
const [closed, setClosed] = React.useState(false);

const [status, setStatus] = React.useState(ticket.status);

React.useEffect(()=>{
}, [status])

const closeTicketHandler = async () => {
  //put call ticket.ticketId
    const response = await closeTicket(ticket.ticketId);
    ticket.status = 'CLOSE';
    setStatus('CLOSE');
    setClosed(true);
}
const handleSubmit = async () => {
    const reviewandrating = 
      {
        "userEmailId": ticket.userEmail,
        "userRating":rating ,
        "userReview": feedback
      }
    const response = await postReviewAndRatings(ticket.centerEmail, reviewandrating);
    closeTicketHandler();
    setIsModalOpen(false);
  
}
const [isModalOpen, setIsModalOpen] = React.useState(false);
const[rating,setRating] = React.useState()
const[feedback,setFeedback] = React.useState()

const showModal = () => {
  setIsModalOpen(true);
};

const handleCancel = () => {
  closeTicketHandler();
  setIsModalOpen(false);
};
const handleRating = (rating) =>{
  setRating(rating)
}
const handleFeedback = (event) => {
  setFeedback(event.target.value);
}


  return (
    <>
    <Row>
    {/* <Col span={12}> */}
    {/* <Row gutter={[16, 16]} className="p-4"> */}
  <Col xs={24} xl={12}>
  {/* <Button type="button" onClick={() => navigate(-1)}><ArrowLeftOutlined /></Button> */}
  <ArrowLeftOutlined onClick={() => closed ?   navigate('/tickets-overview') : navigate(-1)} className="arrow"/>


    <div className="details">
      <div className="site-card-border-less-wrapper">
    <Card title="Ticket Details" bordered={false} >
      <div> <Row gutter={[16, 16]}>
        <Col span={8}><b>Ticket Id</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?._id}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>Ticket Description</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?.ticketDesceription}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>Email</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?.userEmail}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>Center Email</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?.centerEmail}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>product Category</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?.productCategory}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>Model Name</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?.modelName}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>In Warrenty</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?.inWarrenty+""}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>Ticket Status</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{status}</Col>
      </Row><br/>
      <Row gutter={[16, 16]}>
        <Col span={8}><b>Issue Type</b></Col>
        <Col span={2}>:</Col>
        <Col span={14}>{ticket?.issueType}</Col>
      </Row><br></br>
      {userData.userRole == 'USER' && status != "CLOSE" &&
      <Row gutter={[16,16]}>
        {/* <Col span={16}> If your Issue is resolved  then Click here<br/><Button className="close"  onClick={closeTicketHandler} >Close</Button></Col> */}
        <Col span={16}> If your Issue is resolved  then Click here<br/><Button  className="close"   onClick={showModal}  >Close</Button></Col> 
      
</Row>}

</div>
      
    </Card>
  </div>
  </div>

  </Col>
  
  <Col xs={24} xl={12}>
    <>
    <div className="chat">
      <div className="chat_here">Chat here</div><br/>

      <Chat ticket={ticket}/>
    
    </div>
    </>
  </Col>
</Row>
{/* </Col> */}
{/* </Row> */}

   <Modal title="Review" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}   >
    <h5>FeedBack </h5>
     <p><textarea className="feedback" 
             input type="textarea" 
             name="textValue"
             onChange={handleFeedback}
           />
           </p>
     <p>Ratings</p>
     <Rate count={5} onChange={handleRating} />
   </Modal>

 
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);