import React from 'react';
import Search from './Search';
import PropTypes from 'prop-types';
import Sort from './Sort';

Control.propTypes = {
	onHandleSearch: PropTypes.func,
	onHandleSort: PropTypes.func,
	onSortBy: PropTypes.string,
	onSortValue: PropTypes.number,
};

Control.defaultProps = {
	onHandleSearch: null,
	onHandleSort: null,
	onSortBy: null,
	onSortValue: null,
};

function Control() {
	return (
		<div className="row mt-15">
			<Search />
			<Sort />
		</div>
	);
}

export default Control;
