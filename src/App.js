import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';
import './App.css';
import Control from './components/Control';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App(props) {
	var { isDisplayForm } = props;

	const onToggleForm = () => {
		if (props.itemEditting && props.itemEditting.id !== '') {
			props.onOpenForm();
		} else {
			props.onToggleForm();
		}
		props.onClearTask({
			id: '',
			name: '',
			status: false,
		});
	};

	return (
		<div className="container">
			<div className="text-center">
				<h1>Quản Lý Công Việc</h1>
				<hr />
			</div>
			<div className="row">
				<div className={isDisplayForm === false ? '' : 'col-xs-4 col-sm-4 col-md-4 col-lg-4'}>
					{/* form */}
					<TaskForm />
				</div>
				{/* col-xs-8 col-sm-8 col-md-8 col-lg-8 */}
				<div
					className={
						isDisplayForm === false
							? 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
							: 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
					}
				>
					<button type="button" className="btn btn-primary" onClick={onToggleForm}>
						<span className="fa fa-plus mr-5"></span>
						Thêm Công Việc
					</button>
					{/* Control */}
					<Control />
					<div className="row mt-15">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<TaskList />
						</div>
					</div>
				</div>
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
		onToggleForm: () => {
			dispatch(actions.toggleFOrm());
		},
		onClearTask: task => {
			dispatch(actions.editTask(task));
		},
		onOpenForm: () => {
			dispatch(actions.openForm());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
