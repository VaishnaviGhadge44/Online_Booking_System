import React, { useEffect, useState } from 'react';
import { getallUsers,editBooking } from './../../service/api';
import { Link } from 'react-router-dom';
import { Space, Table, Button, Col, Row,Pagination,Modal,Form,Input,Result  } from 'antd';
import { FaRegAngry } from "react-icons/fa";
import { fetchRolesDetails } from '../../redux/user/user.actions';
import Moment from 'moment';
import {connect} from 'react-redux'
const InProgress = (props) => {
  const { userData, fetchRolesDetails} = props;

    const [bookings, setBookings] = useState([]);
    const [maxValue,setMaxValue]=useState(12)
    const [minValue,setMinValue]=useState(0)
    const [maxValue1,setMaxValue1]=useState(12)
    const [minValue1,setMinValue1]=useState(0)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data,setData]=useState({})
  
    const showModal = (qq) => {
      setOpen(true);
      setData(qq)
    };
  
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };

    const onValueChange = (e) =>
    {
        
        data.price=Number(e.target.value)
        setData(data);
    }
    const editUserDetails = async (e) =>{
      e.preventDefault()
      await editBooking(data._id,data.price);
      handleCancel()
      getUsers()
   }
  

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


    const handleCancel = () => {
      setOpen(false);
    };
    useEffect(() => {
        getUsers();
    }, [props.selectedTab])

    const getUsers = async () =>{
        const response = await getallUsers(userData.centerEmailId);
        console.log("item.slotdate" , response.data);
        setBookings(response.data.filter((item)=>item.userBookingStatus==="INPROGRESS"));
    }


      const handleChange = value => {
        if (value <= 1) {
          setMaxValue(12)
          setMinValue(0)
        } else {
          setMaxValue(value*12)
          setMinValue(maxValue)
        }
      };
      const handleChange1 = value => {
        if (value <= 1) {
          setMaxValue1(12)
          setMinValue1(0)
        } else {
          setMaxValue1(value*12)
          setMinValue1(maxValue1)
        }
      };

      return (
        <div className="site-card-wrapper">
          <div className="row">
            <div className="col-md-12 mt-3 centerHeader">
              <h1 style={{ color: "#625d5d" }}>
                Today's Bookings(In Progress)
              </h1>
            </div>
          </div>
          <br />
          <Row gutter={16}>
            {bookings?.filter(
              (item1) =>
                Moment(item1.slotDate, "YYYY-MM-DD").format("YYYY-MM-DD") ==
                Moment().format("YYYY-MM-DD")
            ).length > 0 ? (
              bookings
                ?.filter(
                  (item1) =>
                    Moment(item1.slotDate, "YYYY-MM-DD").format("YYYY-MM-DD") ==
                    Moment().format("YYYY-MM-DD")
                )
                .slice(minValue, maxValue)
                .map((item) => (
                  <Col
                    md={{ span: 12 }}
                    xs={{ span: 24 }}
                    lg={{ span: 6 }}
                    className="mb-4"
                    onClick={() => showModal(item)}
                  >
                    <button
                      className={`card-container col-12 btn btn-outline-${
                        item.userBookingStatus == "Completed"
                          ? "success"
                          : item.userBookingStatus == "INPROGRESS"
                          ? "warning"
                          : "primary"
                      }`}
                    >
                      <i
                        className={`card--icon ${
                          item.userBookingStatus == "Completed"
                            ? "green"
                            : item.userBookingStatus == "INPROGRESS"
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
                <Col span={24}>
                  {/* <Result
                    style={{ width: "90vw" }}
                    icon={<FaRegAngry size={50} color="red" />}
                    title="Great, Another Dead End!"
                  /> */}
                </Col>
              </Row>
            )}
          </Row>
          {bookings?.filter(
            (item1) =>
              Moment(item1.slotDate, "YYYY-MM-DD").format("YYYY-MM-DD") ==
              Moment().format("YYYY-MM-DD")
          ).length > 0 && (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={12}
              onChange={handleChange}
              total={bookings.length}
              className="float-end"
            />
          )}
          <br />
          <hr />
          <div className="row">
            <div className="col-md-12 mt-3 centerHeader">
              <h1 style={{ color: "#113344" }}>All Bookings(In Progress)</h1>
            </div>
          </div>
          <br />
          <Row gutter={16}>
            {bookings.length > 0 ? (
              bookings?.slice(minValue1, maxValue1).map((item) => (
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
                        : item.userBookingStatus == "INPROGRESS"
                        ? "warning"
                        : "primary"
                    }`}
                  >
                    <i
                      className={`card--icon ${
                        item.userBookingStatus == "Completed"
                          ? "green"
                          : item.userBookingStatus == "INPROGRESS"
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
                <Col span={24}>
                  <Result
                    style={{ width: "90vw" }}
                    icon={<FaRegAngry size={50} color="red" />}
                    title="Great, Another Dead End!"
                  />
                </Col>
              </Row>
            )}
          </Row>
          {bookings.length > 0 && (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={12}
              onChange={handleChange1}
              total={bookings.length}
              className="float-end"
            />
          )}

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
                  UserEmail: &nbsp;
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
                SC Email: 
                    <Input
                      type="email"
                      id="input-email"
                      placeholder="SC Email address"
                      value={data.centerEmailId}
                      disabled
                    />
                  
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                 In Warranty":
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
                  Model-Name:
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
                 Slot-Time:
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
                 Slot-Date:
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
                <Col span={10}>
                  Product-Cat.:
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
                <Col span={10}>
                  Price:
                    <Input
                      type="number"
                      placeholder="Price"
                      id="input"
                      onChange={onValueChange}
                      defaultValue={data.price}
                    />                 
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  Description"
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

              <hr />
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  {data.userBookingStatus == "INPROGRESS" && (
                    
                      <Button
                        type="primary"
                        htmlType="submit"
                        id="input-submit"
                        onClick={editUserDetails}
                        className="btn btn-secondary btnFont ant-btn-primary"
                      >
                        Submit
                      </Button>                   
                  )}
                </Col>
              </Row>
            </Form>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);

