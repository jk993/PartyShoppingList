import React from "react";
// import { Link } from "react-router";

import * as Action from "../Main/Action.jsx";
import Store from "../Main/Store.js";

import ListLink from "./ListLink.jsx";

export default class ListDrawer extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			userid: props.userid,
            list: Store.getList()
        };
        this.getList = this.getList.bind(this);
        this.createList = this.createList.bind(this);
        Action.getList(props.userid);
    }

    componentWillMount() {
        Store.on("change", this.getList);
    }

    componentWillUnmount() {
        Store.removeListner("change", this.getList);
    }

    getList() {
        var list = Store.getList();
        this.setState({
			userid: this.props.userid,
            list: list
        });
    }

    createList() {
        var text = document.getElementById("new_list").value;
        if(text != "") {
            Action.createList(this.props.userid, text);
            document.getElementById("new_list").value = "";
        }
    }


    render () {
        const { userid, list } = this.state;
        return(
            <div class="mdl-layout__drawer">
                <span class="mdl-layout-title">{userid}</span>

                <div class="mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="text" id="new_list" />
                    <label class="mdl-textfield__label" for="new_item">New List</label>
                </div>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.createList.bind(this)} ><i class="material-icons">add</i></button>

                <nav class="mdl-navigation">
                    {list.map((list_name, index) => {
                        return <ListLink key={list_name} userid={userid} list_name={list_name} />
                    })}
                </nav>
            </div>
        );
    }
}

