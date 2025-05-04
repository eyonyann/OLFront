/* File: src/dtos/AnswerDTO.js */
export default class AnswerDTO {
    constructor(data = {}) {
        this.id = data.id || null;
        this.assignmentId = data.assignmentId || null;
        this.userId = data.userId || null;
        this.content = data.content || '';
        this.time = data.time || new Date().toISOString();
    }

    toJSON() {
        return {
            id: this.id,
            assignmentId: this.assignmentId,
            userId: this.userId,
            content: this.content,
            time: this.time
        };
    }
}