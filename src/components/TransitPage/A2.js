import React from 'react';
import { FormattedMessage } from 'react-intl';

import './style/A2.css';

class A2 extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			activated: false
		};
	}

	componentWillMount() {
		let { href } = this.props;

		if (href !== null && typeof(href) !== 'undefined' && href !== '')
		{
			let currUrl = window.location.href;
			let pos = currUrl.lastIndexOf(href);
			if (pos >= 0)
			{
				let temp = currUrl.substring(pos);
				if (temp.toLowerCase() === href.toLowerCase())
				{
					this.setState({activated: true});
				}
			}
		}
	}

	render() {
		let { activated } = this.state;
		var { href, text, className, activeClassName, target, style } = this.props;

		let classes = "A2 " + className;
		if (activated) {
			classes += (" A2-Selected " + activeClassName);
		}

		if (target == null || typeof(target) == "undefined") {
			target = "_self";
		}

		if (activated) {
			href = "javascript:void(0)";
		}

		return (
			<a href={href} className={classes} style={style} target={target}>
				<FormattedMessage id={text}/>
			</a>
		);
	}
}

export default A2;