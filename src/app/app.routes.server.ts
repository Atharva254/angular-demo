import { Routes } from '@angular/router';
import { AddTask } from './add-task/add-task';
import { TaskList } from './task-list/task-list';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: 'add', 
    component: AddTask
  },
  {
    path: 'list',
    component: TaskList
  },
  {
    path: '',
    component: Home
  }
];