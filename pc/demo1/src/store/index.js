import React,{Component} from "react"
import{createStore,applyMiddleware} from "redux";
import reducer from "../store/reducers/index";



let store=createStore(reducer);
export  default store