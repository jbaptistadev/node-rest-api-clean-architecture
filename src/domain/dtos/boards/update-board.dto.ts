export class UpdateBoardDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly tags: string[],
    public readonly posterImage: string,
    public readonly userId: string
  ) {}

  static create(props: { [key: string]: any }): [string?, UpdateBoardDto?] {
    const { name, description, tags, posterImage, userId, id } = props;

    // if (!name) {
    //   return ['name is required', {} as UpdateBoardDto];
    // }

    // if (!description) {
    //   return ['description is required', {} as UpdateBoardDto];
    // }

    // if (!tags || tags.length === 0) {
    //   return ['tags is required', {} as CreateBoardDto];
    // }

    // if (!posterImage) {
    //   return ['posterImage is required', {} as UpdateBoardDto];
    // }

    if (!userId) {
      return ['userId is required', {} as UpdateBoardDto];
    }

    return [
      undefined,
      new UpdateBoardDto(id, name, description, tags, posterImage, userId),
    ];
  }
}
