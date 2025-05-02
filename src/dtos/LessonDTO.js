/*
  File: src/dtos/LessonDTO.js
*/
export default class LessonDTO {
    constructor({ id, courseId, title, content, videoURL, lessonOrder }) {
        this.id = id;
        this.courseId = courseId;
        this.title = title;
        this.content = content;
        this.videoURL = videoURL;
        this.lessonOrder = lessonOrder;
    }
}