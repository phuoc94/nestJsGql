export const Book = {
  title: 'Clean Code',
  author: 'Robert Martin',
  published: 2008,
  genres: ['refactoring'],
  bookCount: 7,
};

export const NewBook = {
  title: 'NoSQL Distilled',
  author: 'Martin Fowler',
  published: 2012,
  genres: ['database', 'nosql'],
};

export const NewBookNewAuthor = {
  title: 'Pimeyden tango',
  author: 'Reijo Mäki',
  published: 1997,
  genres: ['crime'],
  bookCount: 1,
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

export const addBookQuery = `
mutation {
    addBook(
      addBookData: {
        title: "${NewBook.title}",
        author: "${NewBook.author}",
        published: ${NewBook.published},
        genres: ["${NewBook.genres[0]}", "${NewBook.genres[1]}"]
      }
    ) {
      title,
      author
    }
  }
`;

export const addBookNewAuthorQuery = `
mutation {
    addBook(
      addBookData: {
        title: "${NewBookNewAuthor.title}",
        author: "${NewBookNewAuthor.author}",
        published: ${NewBookNewAuthor.published},
        genres: ["${NewBookNewAuthor.genres[0]}"]
      }
    ) {
      title,
      author
    }
  }
`;
