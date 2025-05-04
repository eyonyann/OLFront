/*
  File: src/dtos/AssignmentDTO.js
*/
export default class AssignmentDTO {
    constructor({ id, lessonId, title, description, dueDate}) {
        this.id = id;
        this.lessonId = lessonId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
}