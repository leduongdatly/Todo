import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

function Search(props) {
	const [keyword, setKeyword] = useState('');

	const handleSearch = e => {
		const target = e.target;
		const value = target.value;
		setKeyword(value);
	};

	const onSearch = () => {
		props.onSearch(keyword);
	};

	return (
		<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
			<div className="input-group">
				<input
					name="keyword"
					value={keyword}
					onChange={handleSearch}
					type="text"
					className="form-control"
					placeholder="Nhập từ khóa..."
				/>
				<span className="input-group-btn">
					<button className="btn btn-primary" type="button" onClick={onSearch}>
						<span className="fa fa-search mr-5" />
						Tìm
					</button>
				</span>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onSearch: keyword => {
			dispatch(actions.searchTask(keyword));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
