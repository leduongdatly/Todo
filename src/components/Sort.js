import { connect } from 'react-redux';
import * as actions from '../actions/index';

function Sort(props) {
	const onClick = (sortBy, sortValue) => {
		props.onSort({
			by: sortBy,
			value: sortValue,
		});
	};

	return (
		<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
			<div className="dropdown">
				<button
					className="btn btn-primary dropdown-toggle"
					type="button"
					id="dropdownMenu1"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="true"
				>
					Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
					<li onClick={() => onClick('name', 1)}>
						<a
							href="/#"
							role="button"
							className={props.sort.by === 'name' && props.sort.value === 1 ? 'sort-selected' : ''}
						>
							<span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
						</a>
					</li>
					<li onClick={() => onClick('name', -1)}>
						<a
							href="/#"
							role="button"
							className={props.sort.by === 'name' && props.sort.value === -1 ? 'sort-selected' : ''}
						>
							<span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
						</a>
					</li>
					<li role="separator" className="divider" />
					<li onClick={() => onClick('status', 1)}>
						<a
							href="/#"
							role="button"
							className={props.sort.by === 'status' && props.sort.value === 1 ? 'sort-selected' : ''}
						>
							Trạng Thái Kích Hoạt
						</a>
					</li>
					<li onClick={() => onClick('status', -1)}>
						<a
							href="/#"
							role="button"
							className={props.sort.by === 'status' && props.sort.value === -1 ? 'sort-selected' : ''}
						>
							Trạng Thái Ẩn
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		sort: state.sort,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSort: sort => {
			dispatch(actions.sortTask(sort));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
