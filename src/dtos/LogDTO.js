/*
  File: src/dtos/LogDTO.js
*/
export default class LogDTO {
    constructor({ id, userId, title, logTime}) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.logTime = logTime;
    }
}