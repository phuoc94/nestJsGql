export const Author = {
  name: 'Robert Martin',
  born: 1952,
  bookCount: 2,
  authorCount: 5,
};

export const NewAuthor = {
  name: 'Reijo Mäki',
  born: 1958,
};

export const RandomAuthor = {
  name: 'random',
  born: 1958,
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
      born
    }
  }
`;

export const editAuthorQuery = `
mutation {
    editAuthor(editAuthorData: {
      name: "${NewAuthor.name}", setBornTo: ${NewAuthor.born}
    }) {
      name
      born
    }
  }
`;

export const editAuthorNotInDBQuery = `
mutation {
    editAuthor(editAuthorData: {
      name: "${RandomAuthor.name}", setBornTo: ${RandomAuthor.born}
    }) {
      name
      born
    }
  }
`;
