/*
  File: src/dtos/UpdateUserDTO.js
*/
export default class UpdateUserDTO {
    constructor({ id, fullname, username, password, newPassword }) {
      this.id = id;
      this.fullname = fullname;
      this.username = username;
      this.password = password;
      this.newPassword = newPassword;
    }
  }
  