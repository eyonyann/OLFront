/*
  File: src/dtos/CourseDTO.js
*/
export default class CourseDTO {
    constructor({ id, authorId, title, description, rating, imagePath }) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.imagePath = imagePath;
    }
}