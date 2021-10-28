import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import TaskItem from './TaskItem';

function TaskList(props) {
	var { tasks } = props;

	const [filter, setFilter] = useState({
		filterName: '',
		filterStatus: -1,
	});

	const render = () => {
		// filter
		if (props.filterTable) {
			if (props.filterTable.name) {
				tasks = tasks.filter(task => {
					return task.name.toLowerCase().indexOf(props.filterTable.name) !== -1;
				});
			}
			tasks = tasks.filter(task => {
				if (props.filterTable.status === -1) {
					return task;
				} else {
					return task.status === (props.filterTable.status === 0 ? false : true);
				}
			});
		}

		// search
		if (props.keyword) {
			tasks = tasks.filter(task => {
				return task.name.toLowerCase().indexOf(props.keyword) !== -1;
			});
		}

		// sort
		if (props.sort.by === 'name') {
			tasks.sort((a, b) => {
				if (a.name > b.name) return props.sort.value;
				else if (a.name < b.name) return -props.sort.value;
				else return 0;
			});
		} else {
			tasks.sort((a, b) => {
				if (a.status > b.status) return -props.sort.value;
				else if (a.status < b.status) return props.sort.value;
				else return 0;
			});
		}
	};
	render();

	const elmItem = tasks.map((task, index) => {
		return <TaskItem key={task.id} index={index} task={task} />;
	});

	const onChange = e => {
		var target = e.target;
		var name = target.name;
		var value = target.value;
		const filterValue = {
			name: name === 'filterName' ? value : filter.filterName,
			status: name === 'filterStatus' ? value : filter.filterStatus,
		};
		props.onFilterTable(filterValue);
		setFilter(prev => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<table className="table table-bordered table-hover mt-15">
			<thead>
				<tr>
					<th className="text-center">STT</th>
					<th className="text-center">Tên</th>
					<th className="text-center">Trạng Thái</th>
					<th className="text-center">Hành Động</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td></td>
					<td>
						<input
							type="text"
							className="form-control"
							name="filterName"
							value={filter.filterName}
							onChange={onChange}
						/>
					</td>
					<td>
						<select
							className="form-control"
							name="filterStatus"
							value={filter.filterStatus}
							onChange={onChange}
						>
							<option value={-1}>Tất Cả</option>
							<option value={0}>Đợi thực hiện</option>
							<option value={1}>Đang thực hiện</option>
						</select>
					</td>
					<td></td>
				</tr>
				{/* task item */}
				{elmItem}
			</tbody>
		</table>
	);
}

const mapStateToProps = state => {
	return {
		tasks: state.tasks,
		filterTable: state.filterTable,
		keyword: state.search,
		sort: state.sort,
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onFilterTable: filter => {
			dispatch(actions.filterTask(filter));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
