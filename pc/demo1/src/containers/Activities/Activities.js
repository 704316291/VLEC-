import React from 'react';
import './Activities.css';
import {DatePicker, TimePicker} from 'antd';
import * as moment from 'moment'
import Activities2 from "./Activities2"
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,
    AutoComplete} from 'antd';
import {FormattedMessage, FormattedDate, FormattedNumber} from 'react-intl';
import {GetVisitPurpose} from "../../api/api"
import {GetVisitTime} from "../../api/api"
import {GetLMSMainIndustry} from "../../api/api"
import {connect} from "react-redux"
import actions from "../../store/actions"

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends React.Component {
    state = {
        data: [],
        DataResult: [],
        time: "",
        Industry: []
    };
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              values["Visiting time"]=values["Visiting time"].split("-")[0]+":00"+"-"+values["Visiting time"].split("-")[1]+":00"+"可用";
                values.Date = values.Date.format("YYYY-MM-DD");
                this.props.addValue1(values);
                localStorage.setItem("addValue1",values);
                window.scrollTo(300,450);
                this.props.history.push("/Activities2")
            }
        });
    };


    /*获取数据*/
    componentWillMount() {
        /*来访目的*/
        GetVisitPurpose().then((response) => {
            let data = response.DataResult;
            this.setState({
                data: data
            });
        }).catch((error) => {
            console.log(error);
        });
        /*来访时间*/
        GetVisitTime({
            applyDate: this.state.time
        }).then((response) => {
            let data = response.DataResult;
            this.setState({
                DataResult: data
            });
        }).catch((error) => {
            console.log(error);
        });
        /*职业*/
        GetLMSMainIndustry().then((response) => {
            let data = response.DataResult;
            this.setState({
                Industry: data
            });

        }).catch((error) => {
            console.log(error);

        })

    }

    timeChange = (val) => {
        val = val.format("YYYY-MM-DD");
        this.setState({
            time: val
        })
    };

    render() {
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


        return (
            <Form onSubmit={this.handleSubmit} style={{margin: 0}}>
                {/*日期*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-Dateofvisit"
                    />}
                >
                    {getFieldDecorator('Date', {
                        rules: [{
                            required: false, message: 'Please input your Date of visit!',
                        }]
                    })(
                        <DatePicker style={{width: "300px"}} onChange={this.timeChange}/>
                    )}
                </FormItem>
                {/*时间*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-VisitingTime"
                    />}


                >
                    {getFieldDecorator('Visiting time', {
                        rules: [{
                            required: true, message: 'Please input your Visiting time!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.DataResult.map((item, i) => {
                                return <Option key={i} value={item.Value}>{item.Text}</Option>
                            })}
                        </Select>,
                    )}
                </FormItem>
                {/*单位*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-VisitTheUnit"
                    />}
                >
                    {getFieldDecorator('Visit the unit', {
                        rules: [{
                            required: false, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input style={{width: "300px"}}/>
                    )}
                </FormItem>
                {/*来访行业*/}
                <FormItem
                    {...formItemLayout}
                    label="Subordinate to the industry"
                >
                    {getFieldDecorator('Subordinate to the industry', {
                        rules: [{
                            required: false, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.Industry.map((item, i) => {
                                return <Option key={i} value={item.Value}>{item.Text}</Option>
                            })}
                        </Select>,
                    )}
                </FormItem>
                {/*来访目的*/}
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage
                        id="intl-Activities-VisitingPurpose"
                    />}
                >
                    {getFieldDecorator('Visiting purpose', {
                        rules: [{
                            required: false, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.data.map((item, i) => {
                                return <Option key={i} value={item.Value}>{item.Text}</Option>
                            })}
                        </Select>,
                    )}
                </FormItem>
                {/*来访语言*/}
                <FormItem
                    {...formItemLayout}
                    label=" Visiting language"
                >
                    {getFieldDecorator('Visiting language', {
                        rules: [{
                            required: false, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="jack" key="jack">中文</Option>
                            <Option value="lucy" key="lucy">韩语</Option>
                            <Option value="tom" key="tom">日文</Option>
                            <Option value="tom1" key="tom1">英语</Option>
                            <Option value="tom2" key="tom2">法语</Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Note：

(Special requests)
"
                >
                    {getFieldDecorator('Note', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <textarea rows="4" cols="50" placeholder="请输入内容"
                                  style={{width: "535px", height: "110px", border: "1px solid #ccc"}}/>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{span: 12, offset: 5}}
                    style={{textAlign: "right", marginRight: "155px"}}
                >
                    <Button type="primary" htmlType="submit">
                        下一步
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class Activities extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div className="insideDiv">
            <div className="center">
                <ul className="timeLine">
                    <li className="active">
                        <i>1</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-NumberOfVisitors"
                            />
                            </p>
                    </li>
                    <li>
                        <i>2</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-NumberOfVisitors2"
                            /></p>
                    </li>
                    <li>
                        <i>3</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-Datails"
                            /></p>
                    </li>
                    <li>
                        <i>4</i>
                        <p>
                            <FormattedMessage
                                id="intl-Activities-Confirmation"
                            /></p>
                    </li>
                </ul>
                <dl className="applyDl">
                    <dt>
                        <FormattedMessage
                            id="intl-Activities-group"
                        /></dt>
                    <dd>
                        <FormattedMessage
                            id="intl-Activities-Individual"
                        /></dd>
                </dl>
                <h4 className="applyTitle">
                    <FormattedMessage
                        id="intl-Activities-CustomerInformation"
                    /></h4>
                <WrappedRegistrationForm {...this.props}/>
            </div>
        </div>)
    }
}

export default connect(state => ({...state.Activities,...state.Language}),{...actions.Activities,...actions.Language} )(Activities)


