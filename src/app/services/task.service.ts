import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap, timeout } from "rxjs";
import { Task } from "../models/task";

@Injectable({providedIn: 'root'})
export class TaskService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    tasks$ = this.tasksSubject.asObservable();
    
    private base = environment.apiUrl;
    
    constructor(private http: HttpClient) {}
    
    loadTasks(): void {
        this.http.get<Task[]>(`${this.base}/tasks`, {timeout: 1000}).subscribe((tasks) => {
            this.tasksSubject.next(tasks);
        });
    }
    
    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.base}/tasks`, {timeout: 1000});
    }
    
    addTask(newTask: Task): Observable<Task[]> {
        console.log('Inside task service addTask:', newTask);
        return this.http.post<Task[]>(`${this.base}/add-task`, newTask).pipe(
            timeout(1000),
            tap(updatedList => this.tasksSubject.next(updatedList))
        );
    }

    deleteTask(id: String) {
        console.log('Inside delete method. Deleting task with ID:', id);
        return this.http.delete<Task[]>(`${this.base}/delete-task/${id}`).pipe(
        timeout(1000),
        tap(updatedList => this.tasksSubject.next(updatedList))
      );
    }
}