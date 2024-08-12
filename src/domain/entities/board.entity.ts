export class BoardEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly tags: string[],
    public readonly posterImage: string,
    public readonly userId: string
  ) {}

  public static fromObject({
    id,
    name,
    description,
    tags,
    posterImage,
    userId,
  }: any): BoardEntity {
    if (!name) {
      throw new Error('name is required');
    }

    if (!description) {
      throw new Error('description is required');
    }

    // if (!tags || tags.length === 0) {
    //   throw new Error('tags is required');
    // }

    // if (!posterImage) {
    //   throw new Error('posterImage is required');
    // }

    if (!userId) {
      throw new Error('userId is required');
    }

    return new BoardEntity(id, name, description, tags, posterImage, userId);
  }
}
