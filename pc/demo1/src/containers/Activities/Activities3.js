import React from 'react';
import {Form, message, Input, Select, Button, AutoComplete, Radio, Checkbox, Table, Popconfirm} from 'antd';
import {GetOccupation} from "../../api/api"
import {connect} from "react-redux";
import actions from "../../store/actions";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const AutoCompleteOption = AutoComplete.Option;


const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: true,
    };
    totalPeo1 = (e) => {
      let values = e.target.value;
          this.setState({
              [e.target.getAttribute("dataIndex")]: values
          });
      let text={[e.target.getAttribute("tt")]: values};
      };

    render() {
        const {editing} = this.state;
        const {
            editable,
            dataIndex,
            record,
            ...restProps,
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                <EditableContext.Consumer>
                    {(form) => {
                        return (<FormItem style={{margin: 0}}>
                            {form.getFieldDecorator(dataIndex, {
                                rules: [{
                                    required: true,
                                }],
                                initialValue: record[dataIndex],
                            })(
                                <Input onBlur={this.totalPeo1}  tt={dataIndex}/>
                            )}
                        </FormItem>);
                    }}
                </EditableContext.Consumer>
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [{
                key: 1,
                Nationality: '',
                NameOfOrganization: '',
                TitlePosition: '',
                NoOfVisitors: '',
            }],
        };
    }

    handleDelete = () => {
        const dataSource = [...this.state.dataSource];
        if (this.state.dataSource.length === 0) return;
        this.state.dataSource.length = this.state.dataSource.length - 1;
        this.forceUpdate()

    }

    handleAdd = () => {
        const {key, dataSource} = this.state;
        const newData = {
            key: Math.random(),
            Nationality: "",
            NameOfOrganization: "",
            TitlePosition: "",
            NoOfVisitors: ""
        };
        this.setState({
            dataSource: [...dataSource, newData],
        });
    }


    render() {
        console.log(this.props);
        const {dataSource, newData} = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = [{
            title: 'Nationality',
            dataIndex: 'Nationality',
            width: '15%',
            render:(text,record)=>{
                let nationality=record.Nationality;
                return (
                    getFieldDecorator()
                )
            }
        }, {
            title: 'Name of Organization',
            dataIndex: 'NameOfOrganization',
            width: '15%',
            editable: true,
        }, {
            title: 'Title / Position',
            dataIndex: 'TitlePosition',
            width: '15%',
            editable: true
        }, {
            title: '*No. of Visitors',
            dataIndex: 'NoOfVisitors',
            width: '15%',
            editable: true,
        }];
        return (
            <div>
                <div style={{position: "relative"}}>
                    <Table
                        components={components}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                    <div style={{
                        fontWeight: "bold",
                        fontSize: "xx-large",
                        position: "absolute",
                        bottom: 0,
                        right: "90px",
                        cursor: "pointer"
                    }}>
                        <span onClick={this.handleAdd}>+</span>
                        <span onClick={this.handleDelete}
                              style={{fontWeight: "bold", fontSize: "xx-large"}}> - </span>
                    </div>
                </div>
            </div>
        );
    }
}
class RegistrationForm extends React.Component {
    state = {
        disabled: true,
        data: [],
        value: 1,
        date: [],
        radioA: '',
        radioB: '',
        radioC: '',
        radioD: '',
    }
    /*上一步按钮*/
    handleBack = (e) => {
        e.preventDefault();
        this.props.history.push("/Activities2");
        this.props.Activities2.e = 0

    };
    /*下一步按钮*/
    handleNext = (e) => {
        const {radioA, radioB, radioC, radioD} = this.state;
        if (radioA === true && radioB === true && radioC === true && radioD === true) {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.props.addValue3(values);
                    localStorage.setItem("addValue3", values);
                    this.props.history.push("/Activities4");
                    window.scrollTo(300, 350);
                }
            });
        } else {
            message.warning('you do not agree to all,please re-select !!');
        }
    };

    /*获取后台数据*/
    componentWillMount() {

        GetOccupation().then((response) => {
            let data = response.DataResult;
            this.setState({
                data: data
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    /*radio单选框*/
    onChange = (e) => {
        if (e.target.value === 1) {
            this.setState({
                radioA: true
            })
        } else {
            this.setState({
                radioA: false
            })
        }
    }
    onChangeA = (e) => {
        if (e.target.value === 2) {
            this.setState({
                radioB: true
            })
        } else {
            this.setState({
                radioB: false
            })
        }
    }
    onChangeB = (e) => {
        if (e.target.value === 3) {
            this.setState({
                radioC: true
            })
        } else {
            this.setState({
                radioC: false
            })
        }
    }
    onChangeC = (e) => {
        if (e.target.value === 4) {
            this.setState({
                radioD: true
            })
        } else {
            this.setState({
                radioD: false
            })
        }
    }


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
        const CheckboxGroup = Checkbox.Group;
        const plainOptions = "1";
        const radioStyle = {
            height: '30px',
            lineHeight: '30px',

        };


        return (<Form onSubmit={this.handleSubmit}>
                {/*名字*/}
                <FormItem
                    {...formItemLayout}
                    label="name">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input your name!', whitespace: true}],
                    })(
                        <Input style={{width: "300px"}}/>
                    )}
                </FormItem>
                {/*手机*/}
                <FormItem
                    {...formItemLayout}
                    label="Mobile phone"
                >
                    {getFieldDecorator('Mobile phone', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(
                        <Input style={{width: '300px'}}/>
                    )}
                </FormItem>
                {/*邮箱*/}
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input style={{width: '300px'}}/>
                    )}
                </FormItem>
                {/*国籍*/}
                <FormItem
                    {...formItemLayout}
                    label=" Nationality"
                >
                    {getFieldDecorator('Nationality', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option key="jack">中国</Option>
                            <Option key="lucy">韩国</Option>
                            <Option key="tom">日本</Option>
                            <Option key="tom1">美国</Option>
                        </Select>,
                    )}
                </FormItem>
                {/*职业*/}
                <FormItem
                    {...formItemLayout}
                    label=" Occupation"
                >
                    {getFieldDecorator('Occupation', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Select
                            showSearch
                            style={{width: 300}}
                            filterOption={(input, option,) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

                        >
                            {this.state.data.map((item, i) => {
                                return <Option key={i} value={item.Value}>{item.Text}</Option>
                            })}
                        </Select>
                    )}
                </FormItem>
                <h4 className="applyTitle">Visitors' Information</h4>
                {/*部分组件*/}
                <EditableTable {...this.props}/>
                <p className="applyP">
                    * The total number of visitors including yourself match the number of visitors you selected in
                    the previous step
                </p>
                <div className="applyTitle-border"></div>


                {/*单选框*/}
                <div className="applyForm-radio">
                    <dl>
                        <dt>
                            <em>*</em>I agree to the Terms and Conditions of the S/I/M service.
                            <a href="#">Terms and Conditions</a>
                            <RadioGroup onChange={this.onChange}>
                                <Radio style={radioStyle} value={1}>I agree</Radio>

                                <Radio style={radioStyle} value="I don't agree1">I don't agree</Radio>
                            </RadioGroup>
                        </dt>
                        <dt>
                            <em>*</em>I agree to the Terms and Conditions of the S/I/M service.
                            <a href="#">Terms and Conditions</a>
                            <RadioGroup onChange={this.onChangeA}>
                                <Radio style={radioStyle} value={2}>I agree</Radio>
                                <Radio style={radioStyle} value="I don't agree2">I don't agree</Radio>
                            </RadioGroup>
                        </dt>
                        <dt>
                            <em>*</em>I agree to the Terms and Conditions of the S/I/M service.
                            <a href="#">Terms and Conditions</a>
                            <RadioGroup onChange={this.onChangeB}>
                                <Radio style={radioStyle} value={3}>I agree</Radio>
                                <Radio style={radioStyle} value="I don't agree3">I don't agree</Radio>
                            </RadioGroup>
                        </dt>
                        <dt>
                            <em>*</em>I agree to the Terms and Conditions of the S/I/M service.
                            <a href="#">Terms and Conditions</a>
                            <RadioGroup onChange={this.onChangeC}>
                                <Radio style={radioStyle} value={4}>I agree</Radio>
                                <Radio style={radioStyle} value="I don't agree4">I don't agree</Radio>
                            </RadioGroup>

                        </dt>

                    </dl>
                </div>
                {/*上一步，下一步*/}
                <FormItem style={{textAlign: "center"}}>
                    <Button htmlType="submit"
                            style={{textAlign: "center", marginRight: "30px"}} onClick={this.handleBack}>
                        上一步
                    </Button>
                    <Button type="primary" htmlType="submit"
                            style={{textAlign: "center"}} disabled={this.state.flag} onClick={this.handleNext}>
                        下一步
                    </Button>
                </FormItem>
            </Form>


        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class Activities3 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div className="insideDiv">
            <div className="center">
                {/*步骤条*/}
                <ul className="timeLine">
                    <li className="active">
                        <i>1</i>
                        <p>Number of visitors</p>
                    </li>
                    <li className="active">
                        <i>2</i>
                        <p>Number of visitors</p>
                    </li>
                    <li className="active">
                        <i>3</i>
                        <p>Datails</p>
                    </li>
                    <li>
                        <i>4</i>
                        <p>Confirmation</p>
                    </li>
                </ul>
                {/*文字*/}
                <dl className="applyDl">
                    <dt>Please select the number of visitors by age group.</dt>
                    <dd>*Individual reservation can be made for a group of maximum 9 people</dd>
                </dl>

                <h4 className="applyTitle">Customer Information</h4>
                <WrappedRegistrationForm {...this.props}/>

            </div>
        </div>)
    }
}

export default connect(state => ({...state}), actions.Activities3)(Activities3)
connect(state => ({...state}), actions)(RegistrationForm);
