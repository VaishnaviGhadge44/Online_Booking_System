import React, { useEffect, useState } from 'react';
import { getallUsersBookings,getServeCenterByEmailId } from './../../service/api';
import "./mybookings.scss";
import { jsPDF } from "jspdf";
import { Link } from 'react-router-dom';
import { Space, Table, Button, Col, Row,Pagination,Modal,Form,Input,Result  } from 'antd';
import { FaRegAngry } from "react-icons/fa";
import Moment from 'moment';

import { fetchRolesDetails } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const Completed = (props) => {

  const { userData, fetchRolesDetails} = props;
console.log("Completed userData " , userData);
    const [bookings, setBookings] = useState([]);
    const [maxValue,setMaxValue]=useState(12)
    const [minValue,setMinValue]=useState(0)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data,setData]=useState({})
    const [scAddress,setSCAddress]=useState({})
    const [scData,setSCData]=useState({})

    const showModal = (qq) => {
      console.log("QQ" , qq);
      setOpen(true);
      setData(qq)
      getSCs(qq);
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
    }, [])

    const getUsers = async () =>{
        const response = await getallUsersBookings(userData.userEmailId);
        setBookings(response.data.filter((item)=>item.userBookingStatus==="COMPLETED"));
    }
    const handleCancel = () => {
      setOpen(false);
    };

    const getSCs = async (qq) =>{
      console.log("qq" , qq);
      const response = await getServeCenterByEmailId(qq.centerEmailId);
      console.log(response.data);
      setSCData(response.data);
      setSCAddress(response.data.scAddress);
  }
const {city, pinCode, state,street} = scAddress;

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

   
  const downloadPdf = async (data) => {
    const doc = new jsPDF("l");
    doc.setFont("Helvetica", "bold");
    doc.text("Bookings Details", 130, 10);
    doc.line(15, 15, 283, 15); // horizontal line
    doc.setLineWidth(0.5);

    doc.setFont("Helvetica", "bold");
    doc.text("User Email :", 20, 25);
    doc.setFont("Helvetica", "normal");
    doc.text(data.userEmail, 110, 25);

    doc.setFont("Helvetica", "bold");
    doc.text("Service Center Email :", 20, 40);
    doc.setFont("Helvetica", "normal");
    doc.text(data.centerEmailId, 110, 40);

    doc.setFont("Helvetica", "bold");
    doc.text("Service Center Name :", 20, 55);
    doc.setFont("Helvetica", "normal");
    doc.text(scData.centerName, 110, 55);

    doc.setFont("Helvetica", "bold");
    doc.text("Service Center Address :", 20, 70);
    doc.setFont("Helvetica", "normal");
    doc.text(street + "," + city + "," + state + "," + pinCode, 110, 70);

    doc.setFont("Helvetica", "bold");
    doc.text("Slot Date :", 20, 85);
    doc.setFont("Helvetica", "normal");
    doc.text(data.slotDate, 110, 85);

    doc.setFont("Helvetica", "bold");
    doc.text("Product in Warranty :", 20, 100);
    doc.setFont("Helvetica", "normal");
    doc.text(data.inWarrenty ? "Yes" : "No", 110, 100);

    doc.setFont("Helvetica", "bold");
    doc.text("Slot Time :", 20, 115);
    doc.setFont("Helvetica", "normal");
    doc.text(
      Moment(Moment(data.slotStartTime, "HH").format("LT"), ["h:mm A"]).format(
        "HH:mm"
      ) +
        "-" +
        Moment(Moment(data.slotEndTime, "HH").format("LT"), ["h:mm A"]).format(
          "HH:mm"
        ),
      110,
      115
    );

    doc.setFont("Helvetica", "bold");
    doc.text("Product Category :", 20, 130);
    doc.setFont("Helvetica", "normal");
    doc.text(data.productCategory, 110, 130);

    doc.setFont("Helvetica", "bold");
    doc.text("Model Name :", 20, 145);
    doc.setFont("Helvetica", "normal");
    doc.text(data.modelName, 110, 145);

    if (data.price && data.userBookingStatus == "COMPLETED") {
      doc.setFont("Helvetica", "bold");
      doc.text("Price :", 20, 160);
      doc.setFont("Helvetica", "normal");
      doc.text("Rs. " + data.price, 110, 160);

      doc.setFont("Helvetica", "bold");
      doc.text("Description :", 20, 175);
      doc.setFont("Helvetica", "normal");
      doc.text(data.userIssueDescription, 110, 175);

      doc.line(15, 190, 283, 190); // horizontal line
      doc.setLineWidth(0.5);

      doc.setFont("Time-Italic", "normal");
      doc.text("SwiftQ Solutions", 130, 205);
    } else {
      doc.setFont("Helvetica", "bold");
      doc.text("Description :", 20, 160);
      doc.setFont("Helvetica", "normal");
      doc.text(data.userIssueDescription, 110, 160);

      doc.line(15, 175, 283, 175); // horizontal line
      doc.setLineWidth(0.5);

      doc.setFont("Time-Italic", "normal");
      doc.text("SwiftQ Solutions", 130, 190);
    }

    doc.save("bookings.pdf");
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
                <Col span={24}>
                  
                </Col>
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
                <Col span={12}>
                  <Form.Item label="SC Email" className="formLabel">
                    <Input
                      type="email"
                      id="input-email"
                      placeholder="SC Email address"
                      value={data.centerEmailId}
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="User Email">
                    <Input
                      type="email"
                      id="input-email"
                      placeholder="User Email address"
                      value={data.userEmail}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item label="SC Name">
                    <Input
                      type="email"
                      id="input-email"
                      placeholder="SC Name"
                      value={scData.centerName}
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="SC Address">
                    <Input
                      type="email"
                      id="input-email"
                      placeholder="SC Address"
                      value={street + "," + city + "," + state + "," + pinCode}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>

              {data.price ? (
                <>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="Slot-Date">
                        <Input
                          type="text"
                          id="input-slot"
                          placeholder="Slot"
                          value={data.slotDate}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Slot-Time">
                        <Input
                          type="text"
                          id="input-slot"
                          placeholder="Slot"
                          value={
                            Moment(
                              Moment(data.slotStartTime, "HH").format("LT"),
                              ["h:mm A"]
                            ).format("HH:mm") +
                            "-" +
                            Moment(
                              Moment(data.slotEndTime, "HH").format("LT"),
                              ["h:mm A"]
                            ).format("HH:mm")
                          }
                          disabled
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item label="In Warranty">
                        <Input
                          type="text"
                          id="input-subject"
                          placeholder="Subject"
                          value={data.inWarrenty ? "Yes" : "No"}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Price">
                        <Input
                          type="number"
                          placeholder="Price"
                          id="input"
                          disabled={data.userBookingStatus == "COMPLETED"}
                          defaultValue={data.price}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : (
                <Row>
                  <Col span={6}>
                    <Form.Item label="Slot-Date">
                      <Input
                        type="text"
                        id="input-slot"
                        placeholder="Slot"
                        value={data.slotDate}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Slot-Time">
                      <Input
                        type="text"
                        id="input-slot"
                        placeholder="Slot"
                        value={
                          Moment(
                            Moment(data.slotStartTime, "HH").format("LT"),
                            ["h:mm A"]
                          ).format("HH:mm") +
                          "-" +
                          Moment(Moment(data.slotEndTime, "HH").format("LT"), [
                            "h:mm A",
                          ]).format("HH:mm")
                        }
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="In Warranty">
                      <Input
                        type="text"
                        id="input-subject"
                        placeholder="Subject"
                        value={data.inWarrenty ? "Yes" : "No"}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <Row>
                <Col span={12}>
                  <Form.Item label="Model-Name">
                    <Input
                      name="message"
                      type="text"
                      id="input-model"
                      value={data.modelName}
                      placeholder="Model"
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Product-Category">
                    <Input
                      name="message"
                      type="text"
                      id="input-model"
                      value={data.productCategory}
                      placeholder="category"
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Description">
                    <Input.TextArea
                      name="message"
                      type="text"
                      id="input-message"
                      value={data.userIssueDescription}
                      placeholder="Message"
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>

              <hr />
              <div className="row">
                <div className="col-md-12 downloadPdfBtn">
                  <Form.Item>
                    <Button
                      type="secondary"
                      className="btn btn-secondary btnFont"
                      id="input-submit"
                      onClick={() => downloadPdf(data)}
                    >
                      <i
                        class="fa fa-download"
                        aria-hidden="true"
                        style={{ color: "white" }}
                      ></i>{" "}
                      &nbsp; &nbsp; Booking Details
                    </Button>
                  </Form.Item>
                </div>
              </div>
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

// export default Completed;

const mapStateToProps = state => ({
  ...state,
  userData:state.user.users
});
const mapDispatchToProps = dispatch => ({
  fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Completed);