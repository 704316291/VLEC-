import React from 'react';
import {Form, Input, Cascader, Select, Button, AutoComplete, DatePicker,message} from 'antd';
import actions from "../../store/actions"
import {connect} from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
    constructor(props, context) {
        super(props, context);

    };
    state = {
        totalPeople:0,
    }
    /*上一步*/
    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push("/Activities")

    };
    totalPeo=()=>{
        const {form}=this.props;
        let values=form.getFieldsValue();
        let totalA, totalB,totalC, totalD;
        console.log(values);
        if(values["Under12years"] ===undefined ){
            totalA=0
        }else{
            totalA=Number(values["Under12years"] )
        }
        if(values["13to18years"] ===undefined ){
            totalB=0
        }else{
            totalB=Number(values["13to18years"] )
        }
        if(values["CollegeStudents"] ===undefined ){
            totalC=0
        }else{
            totalC=Number(values["CollegeStudents"])
        }
        if(values["Adults"] ===undefined ){
            totalD=0
        }else{
            totalD=Number(values["Adults"])
        }
        let totalPeople=(totalA+totalB+totalC+totalD);
        this.setState({
            totalPeople:totalPeople
        })
    };

    /*下一步*/
    handleSubmit = (e) => {
        e.preventDefault();
        const {form}=this.props;
        let values=form.getFieldsValue();
        let totalPeople=(Number(values["Under12years"] )+Number(values["13to18years"])+Number(values["CollegeStudents"])+Number(values["Adults"]));
        if(totalPeople>30) {
            message.warning('人数总和不能超过三十，请重新输入！');
        }else{
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.props.addValue2(values);
                    localStorage.setItem("addValue2",values);
                    window.scrollTo(300,350);
                    this.props.history.push("/Activities3");
                    console.log('Received values of form: ', values);
                }
            });
        }
        };

    textField  = () => {
        console.log(this.props);
        let {oneInput, twoInput, threeInput, fourInput} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return <Form onSubmit={this.handleSubmit}>
            <FormItem
                {...formItemLayout}
                label="Under 12 years"
                help="Elementary school students and younger children must be accompanied by adults.
                            (1 adult is required per 2 children.)"
            >
                {getFieldDecorator("Under12years", {
                    rules: [{
                        patten: /^\d{0,3}$ /, message: 'Please input your number!',
                        required: true,
                    }],
                })(
                    <Input style={{width: "300px"}} onBlur={this.totalPeo} type="number" min="0" placeholder="Please input the number"
                           onChange={(e) => {
                               oneInput(e.target.value)
                           }}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="zhi 13 to 18 years"

            >
                {getFieldDecorator('13to18years', {
                    rules: [
                        {patten: /^\+?[1|2]\d*$/, message: 'Please input your number!', required: true,},
                        {validator: "this.validateToNextPassword"}
                    ],
                })(
                    <Input  placeholder="Please input the number" min="0" onBlur={this.totalPeo}  style={{width: "300px"}} type="number"
                           onChange={(e) => {
                               twoInput(e.target.value)
                           }}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="College Students">
                {getFieldDecorator('CollegeStudents', {
                    rules: [{
                        required: true, message: 'Please input your number!'
                    }, {
                        whitespace: true,
                    }, {
                        validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input placeholder="Please input the number" min="0"  onBlur={this.totalPeo} style={{width: "300px"}} type="number"
                           onChange={(e) => {
                               threeInput(e.target.value)
                           }}/>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label=" Adults"
            >
                {getFieldDecorator('Adults', {
                    rules: [{
                        required: true, message: 'Please input your number!'
                    }, {
                        validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input placeholder="Please input the number" onBlur={this.totalPeo}  style={{width: "300px"}} min="0" type="number"
                           onChange={(e) => {
                               fourInput(e.target.value)
                           }}/>
                )}
            </FormItem>
            <div>
                < p style={{ fontSize:"14px", paddingLeft:"240px",marginBottom:"10px"}}> Aotal number of visitors   <span style={{color:"red",padding:"0 10px"}}>{this.state.totalPeople}</span>  People.</p>
            </div>
            <FormItem style={{textAlign: "center"}}>
                <Button
                        style={{textAlign: "left", marginRight: "30px"}} onClick={this.handleBack}>
                    上一步
                </Button>
                <Button type="primary" htmlType="submit"
                        style={{textAlign: "right"}} >
                    下一步
                </Button>
            </FormItem>
        </Form>
    };


    render() {
        return (
            <div>
                {this.textField()}
            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class Activities2 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        console.log(this.props);
        return (<div className="insideDiv">
                <div className="center">
                    <ul className="timeLine">
                        <li className="active">
                            <i>1</i>
                            <p>Number of visitors</p>
                        </li>
                        <li className="active">
                            <i>2</i>
                            <p>Number of visitors</p>
                        </li>
                        <li>
                            <i>3</i>
                            <p>Datails</p>
                        </li>
                        <li>
                            <i>4</i>
                            <p>Confirmation</p>
                        </li>
                    </ul>
                    <dl className="applyDl">
                        <dt>Please select the number of visitors by age group.</dt>
                        <dd>*Individual reservation can be made for a group of maximum 9 people</dd>
                    </dl>
                    <h4 className="applyTitle">Customer Information</h4>
                    <WrappedRegistrationForm {...this.props}/>
                </div>
            </div>

        )
    }
}

export default connect(state => ({...state.Activities2}), actions.Activities2)(Form.create()(Activities2))

