import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/Menu/MenuItem';

import styles from "./styles.scss";
import TextField from "material-ui/es/TextField/TextField";
import Button from "material-ui/es/Button/Button";
import ListItem from "material-ui/es/List/ListItem";
import ListItemIcon from "material-ui/es/List/ListItemIcon";
import ListItemText from "material-ui/es/List/ListItemText";
import ListSubheader from "material-ui/es/List/ListSubheader";
import List from "material-ui/es/List/List";


class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentMessage: null,
            messages: [],
            open: false
        };
    }

    componentDidMount() {
         this.establishWsConnection();
    }

    establishWsConnection = () => {
        const socket = new WebSocket("ws://localhost:8080");
        socket.onclose = this.onWsClose;
        socket.onmessage = this.onWsMessage;
        socket.onerror = this.onWsError;
        this.socket = socket;
    };

    onWsClose = (event) => {
    };

    composeMessage = (event) => {
        return event.data;
    };

    onWsMessage = (event) => {
        const message = this.composeMessage(event);
        this.setState({ messages: this.state.messages.concat([message]) })
    };

    onWsError = (error) => {
    };

    sendWsMessage = (data) => {
        if (this.socket) {
            this.socket.send(data)
        }
    };

    renderMessage = (message, key) => {
        return <ListItem key={key}>
            <ListItemText inset primary={message} />
        </ListItem>
    };

    render() {
        return <div className={styles.base}>
            <Drawer open={this.state.open}>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem
                    onClick={() => {
                        this.setState({ open: !this.state.open })
                    }}
                >
                    Menu Item 2
                </MenuItem>
            </Drawer>
            <div className={styles.message}>
                <TextField
                    label="Message"
                    multiline
                    rows="4"
                    placeholder={'Enter your message'}
                    onChange={(event) => this.setState({ currentMessage: event.currentTarget.value })}
                />
                <Button variant="raised"
                        color="primary"
                        onClick={() => this.sendWsMessage(this.state.currentMessage)}
                >
                    Send
                </Button>
            </div>
            <List
                component="nav"
                subheader={<ListSubheader component="div">Messages</ListSubheader>}
            >
                {this.state.messages.map((msg, index) => this.renderMessage(msg, index))}
            </List>
        </div>
    }
}

export default App;