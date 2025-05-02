/*
  File: src/dtos/UserDTO.js
*/
export default class UserDTO {
    constructor({ id, fullname, username, password }) {
      this.id = id;
      this.fullname = fullname;
      this.username = username;
      this.password = password; // текущий пароль для подтверждения
    }
  }
  