import { User } from '../../src/entity/user';

export default class UserTestBuilder {

  private user: User = new User();

  public static newUser() {
    return new UserTestBuilder();
  }

  public withId(id: number): UserTestBuilder {
    this.user.id = id;
    return this;
  }

  public withName(name: string): UserTestBuilder {
    this.user.name = name;
    return this;
  }

  public withEmail(email: string): UserTestBuilder {
    this.user.email = email;
    return this;
  }

  public withDefaultValues(id: number, name: string, email: string): UserTestBuilder {
    return this.withId(id).withName(name).withEmail(email);
  }

  public build(): User {
    return this.user;
  }

  public static createListOfDefaultUsers(size: number) {
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(UserTestBuilder.newUser().withDefaultValues(i, "abc"+i, "abc"+i+"@gmail.com").build());
    }
    return result;
  }

  public static createUser() {
    return UserTestBuilder.newUser().withDefaultValues(1, "xyz", "xyz@gmail.com").build();
  }

}