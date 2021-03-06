import React from 'react';
import './News.css';
import {Pagination} from 'antd';
import "./NearTerm";
import './NearTerm.css';
import {GetNewList, GetTypeData, GetVisitPurpose,Detail} from "../../api/api";

export default class News extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    state = {
        NewList: [],
        current: 1,
    };

    handleBack = (ID) => {
        console.log(ID);
       this.props.history.push("/NearTerm",{
          ID,
        });
    };
    onChange = (page) => {
        const  params={
            "PublishType": 0,
            "Status": 0,
            "PageIndex": {page},
            "PageSize": 10,
        };
        GetNewList(params).then((response) => {
            let data = response.DataResult;
            console.log(data.DataList);
            this.setState({
                NewList: data.DataList,
                current: page,
            });
        })
    };
    componentWillMount() {
        const  params={
                "PublishType": 0,
                "Status": 0,
                "PageIndex": 1,
                "PageSize": 10,
            };
        GetNewList(params).then((response) => {
            let data = response.DataResult;
            console.log(data.DataList);
            this.setState({
                NewList: data.DataList,
            });
        }).catch((error) => {
            console.log(error);
        });

    }



    render() {

        return (<div className="insideDiv">
                <div className="center">
                    <div className="titleH4">
                        <h4>NEWS</h4>
                        <p>What is happened？</p>
                    </div>
                    {/*图文介绍*/}

                    <div className="newList-dl">
                        {this.state.NewList.map((item)=>{
                            return<dl key={item.ID}>
                                <dt>
                                    <img src={item.ImagePath}/>
                                </dt>
                                <dd>
                                    <h4>{item.TitleCN}</h4>
                                    <p>{item.DescCN} </p>
                                    <a className="btn btn-hollow" onClick={()=>{
                                        this.handleBack(item.ID)
                                    }}>查看详情</a>
                                </dd>
                            </dl>
                        })}
                    </div>
                    {/*分页*/}
                    <div className="paging">
                    <Pagination
                        current={this.state.current}
                        defaultPageSize={10}
                        onChange={this.onChange}
                        total={50}/>
                    </div>
                </div>
            </div>


        )
    }
}