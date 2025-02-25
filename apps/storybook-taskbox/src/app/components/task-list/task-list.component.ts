
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { NgForOf, NgIf } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  template: `
    <div class="list-items">
          <app-task
            *ngFor="let task of tasksInOrder"
            [task]="task"
            (archiveTask)="archiveTask.emit($event)"
            (pinTask)="pinTask.emit($event)"
          >
           </app-task>
           <div
             *ngIf="tasksInOrder.length === 0 && !loading"
             class="wrapper-message"
           >
             <span class="icon-check"></span>
             <p class="title-message">You have no tasks</p>
             <p class="subtitle-message">Sit back and relax</p>
           </div>
           <div *ngIf="loading">
             <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="loading-item">
               <span class="glow-checkbox"></span>
               <span class="glow-text">
           <span>Loading</span> <span>cool</span> <span>state</span>
         </span>
            </div>
           </div>
         </div>
  `,
  styleUrl: '../../../styles.scss',
  imports: [TaskComponent, NgForOf, NgIf],
})
export class TaskListComponent {
  tasksInOrder: Task[] = [];

 @Input()
 set tasks(arr: Task[]) {
      const initialTasks = [
          ...arr.filter(t => t.state === 'TASK_PINNED'),
          ...arr.filter(t => t.state !== 'TASK_PINNED'),
        ];
      const filteredTasks = initialTasks.filter(
           t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
       );
       this.tasksInOrder = filteredTasks.filter(
           t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
       );
     }

  /** Checks if it's in loading state */
  @Input() loading = false;

  @Output()
  pinTask = new EventEmitter<Event>();

  @Output()
  archiveTask = new EventEmitter<Event>();
}
