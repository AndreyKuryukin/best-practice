import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers';

ReactDOM.render(<MuiThemeProvider>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('react-root'));