import { Component } from '@angular/core';
import { TaskList } from "../task-list/task-list";
import { AddTask } from "../add-task/add-task";

@Component({
  selector: 'app-home',
  imports: [TaskList, AddTask],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
