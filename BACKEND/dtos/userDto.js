class UserDto {
    constructor({ email, name, age, city, zipCode ,password}) {
      this.email = email;
      this.name = name;
      this.age = age;
      this.city = city;
      this.zipCode = zipCode;
      this.password=password;
    }
  }
  
  export default UserDto;
  