'use strict';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LocalDb from 'localDb'

import EmpList from './components/empList.js'

import './less/demo1.less'  // 引入样式文件


class App extends Component { //定义组件，继承父类

    constructor() { //定义App类的构造函数
        super(); //调用父类的构造函数
        this.db = new LocalDb('ReactDemo');
        this.state = { //定义组件状态
            emps: this.db.get('emps') || []
        };
    }

    //添加雇员显示条
    handleAddEmpItem(){
        //设置Dom
        let newEmpItem = {
            name: '',
            disabled: false
        };
        this.state.emps.push(newEmpItem);
        this.setState({emps: this.state.emps});  //改变状态
        this.db.set('emps', this.state.emps);
    }
    
    //编辑雇员
    editEmployee(index){
        this.state.emps[index]['disabled'] = false;
        this.setState({emps: this.state.emps});  //改变状态
        this.db.set('emps', this.state.emps);
    }

    //保存雇员
    saveEmployee(index,value){
        this.state.emps[index]['name'] = value;
        this.state.emps[index]['disabled'] = true;
        this.setState({emps: this.state.emps});  //改变状态
        this.db.set('emps', this.state.emps);
    }

    //删除雇员，传递给empList的方法
    deleteEmployee(index){
        this.state.emps.splice(index, 1);
        this.setState({emps: this.state.emps});  //改变状态
        this.db.set('emps', this.state.emps);
    }


    //组件渲染方法
    render() {

        //console.log('index',this.state.emps)
        
        return (
            <div className="box">
                <button className="btn" onClick={this.handleAddEmpItem.bind(this)}>添加</button>
                <EmpList 
                    emps={this.state.emps} 
                    save={this.saveEmployee.bind(this)}
                    edit={this.editEmployee.bind(this)}
                    delete={this.deleteEmployee.bind(this)} 
                />
            </div>
        );
    }


}

//渲染
ReactDOM.render(<App/>, document.getElementById('app'));





