/*
  File: src/dtos/ReviewDTO.js
*/
export default class ReviewDTO {
    constructor({ id, courseId, userId, rating, comment, reviewTime }) {
        this.id = id;
        this.courseId = courseId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
        this.reviewTime = reviewTime;
    }
}