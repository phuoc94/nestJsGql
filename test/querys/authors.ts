export const Author = {
  name: 'Robert Martin',
  born: 1952,
  bookCount: 2,
  authorCount: 5,
};

export const authorCountQuery = `
query {
    authorCount
  }
`;

export const allAuthorsWbookCountQuery = `
query {
    allAuthors {
      name
      bookCount
    }
  }
`;
