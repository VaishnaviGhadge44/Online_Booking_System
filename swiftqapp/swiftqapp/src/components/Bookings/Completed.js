import React, { useEffect, useState } from 'react';
import { getallUsers } from './../../service/api';
import { Link } from 'react-router-dom';
import { Space, Table, Button, Col, Row,Pagination,Modal,Form,Input,Result  } from 'antd';
import { FaRegAngry } from "react-icons/fa";
import Moment from 'moment';
import {connect} from 'react-redux'
import { fetchRolesDetails } from '../../redux/user/user.actions';


const Completed = (props) => {
  const { userData, fetchRolesDetails} = props;

console.log("Completed userData " , userData);
    const [bookings, setBookings] = useState([]);
    const [maxValue,setMaxValue]=useState(12)
    const [minValue,setMinValue]=useState(0)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data,setData]=useState({})
  
    const showModal = (qq) => {
      setOpen(true);
      setData(qq)
    };


  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
  };


  
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };
    useEffect(() => {
        getUsers();
    }, [props.selectedTab])

    const getUsers = async () =>{
        const response = await getallUsers(userData.centerEmailId);
        setBookings(response.data.filter((item)=>item.userBookingStatus==="COMPLETED"));
    }
    const handleCancel = () => {
      setOpen(false);
    };


      const handleChange = value => {
        if (value <= 1) {
          setMaxValue(12)
          setMinValue(0)
        } else {
          setMaxValue(value*12)
          setMinValue(maxValue)
        }
      };

      return (
        <div className="site-card-wrapper">
          <div className="row">
            <div className="col-md-12 mt-3 centerHeader">
              <h1 style={{ color: "#113344" }}>Complete Bookings</h1>
            </div>
          </div>
          <Row gutter={16}>
            {/* {bookings?.map((item)=><Col span={6}>
            <Card  bordered={true} style={{height:150}}>
              {item._id}({item.userEmail})
            </Card>
          </Col>)} */}
            {bookings.length > 0 ? (
              bookings?.slice(minValue, maxValue).map((item) => (
                <Col
                  md={{ span: 12 }}
                  xs={{ span: 24 }}
                  lg={{ span: 6 }}
                  className="mb-4 mt-5"
                  onClick={() => showModal(item)}
                >
                  <button
                    className={`card-container col-12 btn btn-outline-${
                      item.userBookingStatus == "Completed"
                        ? "success"
                        : item.userBookingStatus == "inProgress"
                        ? "warning"
                        : "primary"
                    }`}
                  >
                    <i
                      className={`card--icon ${
                        item.userBookingStatus == "Completed"
                          ? "green"
                          : item.userBookingStatus == "inProgress"
                          ? "yellow"
                          : "blue"
                      } fa-solid fa-file-lines`}
                    ></i>
                    <span className="card--quantity">{item._id}</span>
                    <p className="card--name">{item.userEmail}</p>
                  </button>
                </Col>
              ))
            ) : (
              <Row>
                {/* <Col span={24}>
                  <Result
                    style={{ width: "90vw" }}
                    icon={<FaRegAngry size={50} color="red" />}
                    title="Great, Another Dead End!"
                  />
                </Col> */}
              </Row>
            )}
          </Row>
          <Modal
            open={open}
            title={`Booking Details for ${data._id}`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            width={800}
          >
            <Form {...formItemLayout}>
              <Row>
                <Col span={10}>
                   User Email
                    <Input
                      type="email"
                      id="input-email"
                      placeholder="User Email address"
                      value={data.userEmail}
                      disabled
                    />
                 
                </Col>
                <Col span={2}>
                </Col>

                <Col span={10}>
                  SC Email
                    <Input
                      type="email"
                      id="input-email"
                      placeholder="SC Email address"
                      value={data.centerEmailId}
                      disabled
                    />
                 
                </Col>
              </Row>
              <Col span={2}>
                </Col>

              <Row>
                <Col span={10}>
                  In Warranty
                    <Input
                      type="text"
                      id="input-subject"
                      placeholder="Subject"
                      value={data.inWarrenty ? "Yes" : "No"}
                      disabled
                    />                 
                </Col>
                <Col span={2}>
                </Col>

                <Col span={10}>
                  Model-Name
                    <Input
                      name="message"
                      type="text"
                      id="input-model"
                      value={data.modelName}
                      placeholder="Model"
                      disabled
                    />                  
                </Col>
              </Row>
             


              <Row>
                <Col span={10}>
                  Slot-Time
                    <Input
                      type="text"
                      id="input-slot"
                      placeholder="Slot"
                      value={
                        Moment(Moment(data.slotStartTime, "HH").format("LT"), [
                          "h:mm A",
                        ]).format("HH:mm") +
                        "-" +
                        Moment(Moment(data.slotEndTime, "HH").format("LT"), [
                          "h:mm A",
                        ]).format("HH:mm")
                      }
                      disabled
                    />
                  
                </Col>
                <Col span={2}>
                </Col>
                <Col span={10}>
                  Slot-Date
                    <Input
                      type="text"
                      id="input-slot"
                      placeholder="Slot"
                      value={data.slotDate}
                      disabled
                    />
                  
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                 Product-Cat.
                    <Input
                      name="message"
                      type="text"
                      id="input-model"
                      value={data.productCategory}
                      placeholder="category"
                      disabled
                    />
                 
                </Col>
                <Col span={2}>
                </Col>
                <Col span={12}>
                  Price
                    <Input
                      type="number"
                      placeholder="Price"
                      disabled
                      id="input"
                      value={data.price}
                    />                  
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  Description
                    <Input.TextArea
                      name="message"
                      type="text"
                      id="input-message"
                      value={data.userIssueDescription}
                      placeholder="Message"
                      disabled
                    />                 
                </Col>
              </Row>
            </Form>
          </Modal>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={12}
            onChange={handleChange}
            total={bookings.length}
            className="float-end"
          />
        </div>
      );
}

const mapStateToProps = state => ({
  ...state,
  userData:state.user.users
});
const mapDispatchToProps = dispatch => ({
  fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
