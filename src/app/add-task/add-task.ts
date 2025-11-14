import { Component, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  task: Task = {
    id: '',
    name: '',
    description: '',
  };

  showPopup = signal(false);
  popupMessage = signal('');  

  constructor(private taskService: TaskService) {
    this.taskService = taskService;
  }

  onSubmit() {
    this.task.id = uuidv4();
    console.log('Adding task:', this.task);
    this.taskService.addTask(this.task).subscribe(
      {
        next: value => {
          console.log('Called')
          this.popupMessage.set('Task ' + this.task.name + ' added successfully!');
          this.showPopup.set(true);
          setTimeout(() => this.showPopup.set(false), 2000);
        },
        error: err => {
          console.error('Error adding task:', err)
          this.popupMessage.set('Error adding task!');
          this.showPopup.set(true);
          setTimeout(() => this.showPopup.set(false), 2000);
        }
      });

    this.task = { id: '', name: '', description: '' };
  }
}
function uuidv4(): string {
  return crypto.randomUUID();
}