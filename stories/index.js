import React from 'react';

import { storiesOf } from '@storybook/react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import PullToRefresh from ".."  

storiesOf("Pull-To-Refresh", module)
	.add('start', ()=>(
		<MuiThemeProvider>
			<div style={{border:"1px solid red", position:"absolute", 
				overflowY:"hidden",left:100, height:100, width:400,
				background:"transparent"}}>
				<PullToRefresh 
					label="loading more"
					onMore={e=>e}
					onRefresh={e=>e}>
					<ul style={{border:"1px solid green",margin:0, background:"white"}}>
						<li>a</li>
						<li>a</li>
						<li>a</li>
						<li>a</li>
						<li>a</li>
						<li>a</li>
						<li>a</li>
						<li>a</li>
					</ul>
				</PullToRefresh>
			</div>
		</MuiThemeProvider>
	))