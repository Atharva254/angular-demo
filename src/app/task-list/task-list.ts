import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  tasks$!: Observable<Task[]>;
  
  protected readonly title = signal('task-list');
  
  constructor(private taskService: TaskService) {}
  
  //Delete button click event
  onClick(id: String) {
    console.log('Inside onClick')
    this.taskService.deleteTask(id).subscribe();
  }
  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
    this.taskService.loadTasks();
  }
}
