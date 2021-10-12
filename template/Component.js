import React, { Component} from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router";
import style from "./TmplStyl.module.scss";

class TmplComponent extends Component {
    constructor(props) {
        super(props);
        this.onClick_Link = this.onClick_Link.bind(this);
    }
    onClick_Link(val) {
    }
    render() {
        return <div className={style.wrapper}>
        </div>
    }
}
const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TmplComponent));