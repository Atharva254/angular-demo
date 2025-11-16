import { Component, Signal, signal, HostBinding, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
  host: {'[class.standalone-page]':'isStandalonePage'}
})
export class AddTask {
  private router = inject(Router);
  
  isStandalonePage = signal(false);
   
  task: Task = {
    id: '',
    name: '',
    description: '',
  };

  showPopup = signal(false);
  popupMessage = signal('');  

  constructor(private taskService: TaskService) {
    this.taskService = taskService;
    
    // Check initial route
    this.isStandalonePage.set(this.router.url === '/add');
    
    // Subscribe to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isStandalonePage.set(this.router.url === '/add');
      });
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