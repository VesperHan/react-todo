'use strict';

import React, {Component} from 'react' 


export default class EmpOption extends Component {

    //全选
    handlerCheckedAll(e){
        this.props.changeChecked(null, e.target.checked, true);    // true表示全部操作。
    }

    //删除选中项
    handlerDeleteChecked(){
        this.props.clearChecked();
    }

    render() {
        return (
            <div className="opts">

                <label><input type="checkbox" 
                    checked={this.props.isCheckedAll} 
                    onChange={this.handlerCheckedAll.bind(this)}  /> 全选</label>

                <span>已选{this.props.checkedCount} / {this.props.count}</span>

                <button className="btn" onClick={this.handlerDeleteChecked.bind(this)} >清除</button>
            </div>
        )
    }

}

