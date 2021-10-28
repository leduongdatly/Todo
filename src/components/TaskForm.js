import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

function TaskForm(props) {
	var [task, setTask] = useState({
		id: '',
		name: '',
		status: true,
	});

	useEffect(() => {
		if (props.itemEditting && props.itemEditting.id !== null) {
			setTask(prev => ({
				...prev,
				id: props.itemEditting.id,
				name: props.itemEditting.name,
				status: props.itemEditting.status,
			}));
		} else {
			onClear();
		}
	}, [props.itemEditting]);

	useEffect(() => {
		if (props.itemEditting) {
			setTask(prevState => ({
				...prevState,
				id: props.itemEditting.id,
				name: props.itemEditting.name,
				status: props.itemEditting.status,
			}));
		} else if (!props.itemEditting) {
			setTask(prevState => ({
				...prevState,
				id: '',
				name: '',
				status: true,
			}));
		}
	}, [props.itemEditting]);

	const onChange = e => {
		const target = e.target;
		const name = target.name;
		var value = target.value;
		if (name === 'status') {
			value = target.value === 'true' ? true : false;
		}
		setTask(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const onSave = e => {
		e.preventDefault();
		props.onSaveTask(task);
		onClear();
		onCloseForm();
	};

	const onClear = () => {
		setTask({
			id: '',
			name: '',
			status: true,
		});
	};

	const onCloseForm = () => {
		props.onCloseForm();
	};

	if (!props.isDisplayForm) return null;
	return (
		<div className="panel panel-warning">
			<div className="panel-heading">
				<h3 className="panel-title">
					{task.id === '' ? 'Thêm công việc' : 'Cập nhật công việc'}
					<span className="fa fa-times-circle text-right" onClick={onCloseForm}></span>
				</h3>
			</div>
			<div className="panel-body">
				<form onSubmit={onSave}>
					<div className="form-group">
						<label>Tên :</label>
						<input type="text" className="form-control" name="name" value={task.name} onChange={onChange} />
					</div>
					<label>Trạng Thái :</label>
					<select
						className="form-control"
						required="required"
						name="status"
						value={task.status}
						onChange={onChange}
					>
						<option value={true}>Đang thực hiện</option>
						<option value={false}>Đợi thực hiện</option>
					</select>
					<br />
					<div className="text-center">
						<button type="submit" className="btn btn-warning">
							Lưu
						</button>
						&nbsp;
						<button type="button" className="btn btn-danger" onClick={() => onClear()}>
							Hủy Bỏ
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		isDisplayForm: state.isDisplayForm,
		itemEditting: state.itemEditting,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSaveTask: task => {
			dispatch(actions.saveTask(task));
		},
		onCloseForm: () => {
			dispatch(actions.closeForm());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
