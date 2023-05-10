import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
import './CreateTicket.scss'
import {
 
    Form,
    Input,
    Row,
    Select, Typography,  Col, Button,
    
  } from 'antd';
import { CreateTicketData, getServiceCenter , getUserDetails, getServiceCenterByEmail} from '../../service/api';

  const { Option } = Select;
const {TextArea} =Input;
const {Text} = Typography;
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

const CreateTicket = () => {
  const [userDetail, setUserDetail] = useState([]);
  const [serviceCenter, setServiceCenter] = useState([])
  const [centerEmail, setCenterEmail] = useState()
   const [serviceCenterwithEmail, setServiceCenterwithEmail] = useState([])
  const formRef = React.useRef(null)
  const navigate  = useNavigate();
  useEffect(()=>{
    userDetails();
    serviceCentter();
  },[])
  useEffect(()=>{
    formRef?.current?.setFieldsValue({
      userEmail: userDetail.userEmailId
    
    })
  }, [userDetail])
  const centerByEmailId = centerEmail;
  useEffect(() => {
    if(centerByEmailId){
      getServiceCenterEmail()
    }
   
  }, [centerByEmailId])
  console.log("centerEmialId" , centerByEmailId);

  const getServiceCenterEmail = async () => {
    console.log("centerEmialId" , centerByEmailId);
    const response = await getServiceCenterByEmail(centerByEmailId)
    console.log("Availabel products from service center", response.data.productCategory);
    setServiceCenterwithEmail(response.data.productCategory)
    
  }
    const serviceCentter = async()=>{
      const resp = await getServiceCenter();
      setServiceCenter(resp.data)
      console.log("service center", resp.data)
    }
  

  var user = JSON.parse(localStorage.getItem("loginResponse"));
  console.log("local staorage", user);
   const userDetails = async () => {
    const response = await getUserDetails(user.userEmailId);
    console.log("Hello mongo response", response.data);
    setUserDetail(response.data);
    
  };
  // const products =[
  //   'Mobile', 'Tab', 'Desktop', 'laptop']
    const warranty = ['Yes', 'No']
    const issue  = ['ENQUIRY', 'PROBLEM']

    const {Text} = Typography;
    const [form] = Form.useForm();
  const serviceCenterByEmail = (value) => {
    console.log("serviceCenter" , serviceCenter);
    console.log(value, "service center value")
    setCenterEmail(value);
}
  const onFinish = async (data) => {
     localStorage.setItem("ticketData", JSON.stringify(data));
      console.log('Received values of form: ', data);
    await CreateTicketData(data);
    navigate('/tickets-overview');
    
     
    };
  
    return (
    <div className='createRicket'>
    <Row className='header_row'><Text className='header_text'>
        CREATE TICKET</Text></Row>
        <div>
        <Form

      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
         scrollToFirstError className='form_div'  ref={formRef}
    >
<Row className='Fields_Row'>
  <Col span={12}>
        <Form.Item className='Field_input '
        name="userEmail"
        label="Requestor"  colon={false}
     
      >
       <Input disabled />
      </Form.Item></Col>
 
      <Col span={12}>
      <Form.Item className='Field_input'
        name="centerEmail"
        label="Assignee" colon={false}
        rules={[
          {
            required: true,
            message: 'Please input your Assignee!',
            whitespace: true,
          },
        ]}
      >
          <Select placeholder="select your Assignee" onChange={serviceCenterByEmail}>
        {serviceCenter.map((item) => (
          <Option value={item._id} >{item.centerName}-{item.scBranch}</Option>
        ))}
        </Select>
      </Form.Item></Col>
 </Row>
      <Row className='Fields_Row'>

      <Col span={12}> <Form.Item className='Field_input' colon={false}
        name="issueType"
        label="Issue Type"
        rules={[
          {
            required: true,
            message: 'Please select Issue Type',
          },
        ]}
      >
        <Select placeholder="select your Issue Type">
        {issue.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
        </Select>
      </Form.Item></Col>
<Col span={12}>
      <Form.Item className='Field_input' colon={false}
        name="productCategory"
        label="Product Category"
        rules={[
          {
            required: true,
            message: 'Please select Priority!',
          },
        ]}
      >
        <Select placeholder="select your Priority">
        {serviceCenterwithEmail.map((province) => (
          <Option key={province}>{province}</Option>
        ))}
         
        </Select>
      </Form.Item></Col>
      </Row>
      <Row className='Fields_Row'>
  <Col span={12}>
        <Form.Item className='Field_input' colon={false}
        name="modelName"
        label="Product Name"
        rules={[
          {
            required: true,
            message: 'Please input your Product Name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item></Col>
 
      <Col span={12}> <Form.Item className='Field_input' colon={false}
        name="inWarrenty"
        label="Warranty"
        rules={[
          {
            required: true,
            message: 'Please select Warrany',
          },
        ]}
      >
        <Select placeholder="select your Warranty">
        <Option value="true">Yes</Option>
        <Option value="false">No</Option>
        </Select>
      </Form.Item></Col>
 </Row><Col span={24}>
      <Form.Item label="Issue Description" colon={false} className='Field_input field_Text' name="ticketDesceription"      rules={[
          {
            required: true,
            message: 'Please input your Issue Description!',
            whitespace: true,
          },
        ]}>
          <TextArea rows={5} />
        </Form.Item></Col>
        <Row><Button className='button' htmlType='submit'>Create Ticket</Button></Row>
    </Form>
{/* <Row className='slot_Row'><Text className='slot_text'> Want to book a slot?</Text><Text className='click_here'> Click here</Text></Row> */}
        </div>

    </div>
  )
}

export default CreateTicket