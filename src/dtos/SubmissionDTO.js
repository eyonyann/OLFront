/*
  File: src/dtos/SubmissionDTO.js
*/
export default class SubmissionDTO {
    constructor(data = {}) {
        this.id = data.id || null;
        this.assignmentId = data.assignmentId || null;
        this.userId = data.userId || null;
        this.content = data.content || '';
        this.LocalDateTime = data.LocalDateTime || null;
        this.grade = data.grade || null;
    }
}