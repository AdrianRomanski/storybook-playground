import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  /**
   * The shape of the task object
   */
  @Input() task: any;

  @Output()
  pinTask = new EventEmitter<Event>();

  @Output()
  archiveTask = new EventEmitter<Event>();

  onPin(id: any) {
    this.pinTask.emit(id);
  }

  onArchive(id: any) {
    this.archiveTask.emit(id);
  }
}
