import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/Menu/MenuItem';

import styles from "./styles.scss";

class App extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            messages : []
        };
    }

    componentDidMount() {
        this.establishWsConnection();
    }

    establishWsConnection = () => {
        const socket = new WebSocket("ws://javascript.ru/ws");
        socket.onclose = this.onWsClose;
        socket.onmessage = this.onWsMessage;
        socket.onerror = this.onWsError;
        this.socket = socket;
    };

    onWsClose = (event) => {};

    onWsMessage = (event) => {
        const message = event.data;
        this.setState({messages: this.state.messages.concat([message])})
    };

    onWsError = (error) => {};

    sendWsMessage = (data) => {
        if (this.socket) {
            this.socket.send(data)
        }
    };

    render() {
        return <div className={styles.base}>
            <Drawer open={this.state.open}>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem
                    onClick={() => {this.setState({open: !this.state.open})}}
                >
                    Menu Item 2
                </MenuItem>
            </Drawer>
        </div>
    }
}

export default App;