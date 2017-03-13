'use strict';

import React, {Component} from 'react' 
import ReactDOM from 'react-dom'


/**
 * 雇员item
 */
export default class empItem extends Component {

    //编辑当前雇员
    handlerEdit(){
        this.props.edit(this.props.index);
    }
    
    //保存当前雇员
    handlerSave(){        
        var value = ReactDOM.findDOMNode(this.refs.input).value;
        //console.log(this.props.index,value);
        if(value) this.props.save(this.props.index,value);
    }

    //删除当前雇员
    handlerDelete(){
        this.props.delete(this.props.index);
    }

    //是否选中
    handlerChecked(){
        //console.log(this.props.isChecked)
        let isChecked = !this.props.isChecked;
        this.props.changeChecked(this.props.index, isChecked);
    }
    
    
    render() {

        return( 
            <li className="item flexRow">

                <input type="checkbox" checked={this.props.isChecked} onChange={this.handlerChecked.bind(this)} />
                
                <span>{this.props.index+1}</span>

                {
                    this.props.v.disabled===true ?  <p>{this.props.v.name}</p> : 
                    <input ref="input" type="text"  defaultValue={this.props.v.name} disabled={this.props.v.disabled}  />
                }

                <button className={this.props.v.disabled==true ? 'btn hide' : 'btn'} 
                    onClick={this.handlerSave.bind(this)} >保存</button>

                <button className={this.props.v.disabled==true ? 'btn' : 'btn hide'}
                    onClick={this.handlerEdit.bind(this)} >编辑</button>

                <button className="btn" onClick={this.handlerDelete.bind(this)} >删除</button>
            </li>
        )
    }

}
