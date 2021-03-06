import React from 'react';
import axios from 'axios' ;
import './NearTerm.css';
import {Detail} from '../../api/api';


let img1 = require("../../static/images/QRCode.jpg");

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        Detail1: {}
    };

    componentWillMount() {
        let id = this.props.location.state.ID;
        Detail(id).then((response) => {
            let data = response.DataResult;
            this.setState({
                Detail1: JSON.parse(JSON.stringify(data))
            })
        }).catch((error) => {
            console.log(error);
        })
    }


    render() {
        let Detail1 = this.state.Detail1;
        console.log(Detail1);
        if (JSON.stringify(Detail1) === "{}") {
            return ""
        }
        return (<div className="nearTerm">
                {/*标题*/}
                <div className="nearTermLogo">
                    <div className="nearTermTitle">
                        <h4 className="nearTermTitleH4">{Detail1["TitleCN"]}</h4>
                        <p className="timeLineP">
                            <span>报名截止：{ Detail1.LastModificationTime.split("T")[0]}|</span>
                            <span>已报名：{Detail1.IsTop ? "否" : "是"} |</span>
                            <span>参观日期:{Detail1.CreationTime.split("T")[0]} |</span>
                            <span>地点：联想总部东区创新展示中心1层</span>
                        </p>
                    </div>
                    <ul className="newList-ul">
                        <li className="newList-li">
                            <h4>活动内容</h4>
                            <p>{Detail1.ContentCN}</p>
                        </li>
                        <li className="newList-li">
                            <h4>活动安排</h4>
                            <p> {Detail1.ContentCN}</p>
                        </li>

                    </ul>
                    <div className="box">
                        <span className="line"> </span>
                        <span className="text">活动规范</span>
                        <span className="line"> </span>
                    </div>
                    <p className="ActivityStream">Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
                        expetendis in mei. Mei an pericula euripidis, hinc partem ei est.Alienum phaedrum torquatos nec
                        eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem
                        ei est.</p>
                    <div className="QRCode">
                        <img src={img1} alt=""/>
                        <p>
                            扫描二维码，关注XXX公众号，快来报名参观吧~
                            欢迎━(*｀∀´*)ノ亻!
                        </p>


                    </div>
                </div>

            </div>
        )
    }
}