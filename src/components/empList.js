'use strict';

import React, {Component} from 'react' 
import ReactDOM from 'react-dom'

import EmpItem from './empItem.js'

/**
 * 雇员列表
 */
export default class EmpList extends Component {

    render() {
        if(this.props.emps.length == 0) {
           
            return (
                <div className="tips">你目前还没有职员！</div>
            )

        }else{

            return (
                <ul className="list">
                {
                    this.props.emps.map((item,index) => {

                        return <EmpItem 
                            key={index} 
                            v={item}
                            isChecked={item.isChecked}
                            index={index} 
                            {...this.props}
                        />

                    })
                }
                </ul>
            )

        }
    }

}

