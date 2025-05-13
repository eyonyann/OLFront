/*
  File: src/dtos/UserDTO.js
*/
export default class UserDTO {
    constructor({ id, fullname, username, password, role }) {
      this.id = id;
      this.fullname = fullname;
      this.username = username;
      this.password = password;
      this.role = role;
    }
  }
  