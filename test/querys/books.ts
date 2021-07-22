export const Book = {
  title: 'Clean Code',
  author: 'Robert Martin',
  published: 2008,
  genres: ['refactoring'],
  bookCount: 7,
};

export const bookCountQuery = `
query {
    bookCount
}`;

export const allBooksQuery = `
query {
    allBooks { 
      title 
      author
      published 
      genres
    }
}`;

export const allBooksByAuthorNameQuery = `
query {
    allBooks(author: "${Book.author}") {
      title
    }
  }
`;

export const allBooksByGenreQuery = `
query {
    allBooks(genre: "${Book.genres[0]}") {
      title
      author
    }
  }
`;

export const allBooksByGenreAndAuthorQuery = `
query {
    allBooks(genre: "${Book.genres[0]}", author: "${Book.author}") {
      title
      author
    }
  }
`;
