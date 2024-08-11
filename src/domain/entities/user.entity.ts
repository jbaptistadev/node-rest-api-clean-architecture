export class UserEntity {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  public static fromObject({ name, email, password }: any): UserEntity {
    if (!name) {
      throw new Error('name is required');
    }

    if (!email) {
      throw new Error('email is required');
    }

    if (!password) {
      throw new Error('password is required');
    }

    return new UserEntity(name, email, password);
  }
}
