import React, {ChangeEvent, FC, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskType} from "./Task";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux: FC<TaskWithReduxPropsType> = memo(({task, todolistId}) => {

    const dispatch = useDispatch();

    const deleteTask = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }
    const changeTaskTitle = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    };

    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={changeTaskStatus}
            />

            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={deleteTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});
