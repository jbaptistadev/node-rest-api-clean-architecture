export class CreateBoardDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly tags: string[],
    public readonly posterImage: string,
    public readonly userId: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateBoardDto?] {
    const { name, description, tags, posterImage, userId } = props;

    if (!name) {
      return ['name is required', {} as CreateBoardDto];
    }

    if (!description) {
      return ['description is required', {} as CreateBoardDto];
    }

    // if (!tags || tags.length === 0) {
    //   return ['tags is required', {} as CreateBoardDto];
    // }

    if (!posterImage) {
      return ['posterImage is required', {} as CreateBoardDto];
    }

    if (!userId) {
      return ['userId is required', {} as CreateBoardDto];
    }

    return [
      undefined,
      new CreateBoardDto(name, description, tags, posterImage, userId),
    ];
  }
}
