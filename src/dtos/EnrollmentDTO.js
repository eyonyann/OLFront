/*
  File: src/dtos/EnrollmentDTO.js
*/
export default class EnrollmentDTO {
    constructor({ id, userId, courseId, enrollmentTime }) {
        this.id = id;
        this.userId = userId;
        this.courseId = courseId;
        this.enrollmentTime = enrollmentTime;
    }
}