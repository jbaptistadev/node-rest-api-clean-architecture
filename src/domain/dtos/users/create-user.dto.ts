export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password } = props;

    if (!name) {
      return ['name is required', {} as CreateUserDto];
    }

    if (!email) {
      return ['email is required', {} as CreateUserDto];
    }

    if (!password) {
      return ['password is required', {} as CreateUserDto];
    }

    return [undefined, new CreateUserDto(name, email, password)];
  }
}
