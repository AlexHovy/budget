class UserDto {
  constructor(user) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}

module.exports = UserDto;
