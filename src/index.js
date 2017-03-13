'use strict';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LocalDb from 'localDb'

import EmpList from './components/empList.js'
import EmpOption from './components/empOption.js'

import './less/demo1.less'  // 引入样式文件


class App extends Component { //定义组件，继承父类

    constructor() { //定义App类的构造函数
        super(); //调用父类的构造函数
        this.db = new LocalDb('ReactDemo');
        this.state = { //定义组件状态
            emps: this.db.get('emps') || [],
            isCheckedAll: false
        };
    }

    //添加雇员显示条
    handleAddEmpItem(){
        //设置Dom
        let newEmpItem = {
            name: '',
            disabled: false,
            isChecked: false
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

    //删除选中项
    //filter()方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
    //对数组中的每个元素都执行一次指定的函数（callback），并且创建一个新的数组，该数组元素是所有回调函数执行时返回值为true的原数组元素
    //filter()不会对空数组进行检测
    //filter()不会改变原始数组
    clearCheckedEmployee(){
        let emps = this.state.emps.filter(item => !item.isChecked);   //过滤掉数组中item.isChecked为true的item
        // var emps = arr.filter(function(item) {
        //     return !item.isChecked;
        // });
        this.setState({
            emps: emps,
            isCheckedAll: false
        });
        this.db.set('emps', emps);
    }

    //选中状态  初始化isAll为false
    changeChecked(index,isChecked,isAll=false){
        if(isAll){
           this.setState({
                emps: this.state.emps.map((item) => {
                    item.isChecked = isChecked;
                    return item;
                }),
                isCheckedAll: isChecked
            }); 
        }else{
            this.state.emps[index].isChecked= isChecked;
            this.checkedAll();
        }

        this.db.set('emps', this.state.emps);
    }

    /*全选  
    every()与some()方法都是JS中数组的迭代方法
    every()是对数组中的每一项运行给定函数，如果该函数对每一项返回true,则返回true
    some()是对数组中每一项运行指定函数，如果该函数对任一项返回true，则返回true
    */
    checkedAll(){
        let isCheckedAll = false;

        if (this.state.emps.every(item => item.isChecked)) {
            isCheckedAll = true;
        }
        // if (arr.forEach(function(item) {return item.isChecked;} )) {
        //     isCheckedAll = true;
        // }
        this.setState({
            emps: this.state.emps,
            isCheckedAll: isCheckedAll
        });
    }


    //组件渲染方法
    render() {

        let options = {
            isCheckedAll: this.state.isCheckedAll,
            count: this.state.emps.length || 0,
            checkedCount: (this.state.emps && this.state.emps.filter((item) => item.isChecked)).length || 0
        };

        return (
            <div className="box">
                <button className="btn" onClick={this.handleAddEmpItem.bind(this)}>添加</button>
                <EmpList 
                    emps={this.state.emps} 
                    save={this.saveEmployee.bind(this)}
                    edit={this.editEmployee.bind(this)}
                    delete={this.deleteEmployee.bind(this)} 
                    changeChecked={this.changeChecked.bind(this)}
                />
                <EmpOption
                    changeChecked={this.changeChecked.bind(this)}
                    clearChecked={this.clearCheckedEmployee.bind(this)}
                    {...options}
                />
            </div>
        );
    }


}

//渲染
ReactDOM.render(<App/>, document.getElementById('app'));





