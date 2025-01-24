//book store system

//book structure

const currentDate = new Date();

class Book {
  //static incremental id
  constructor(id, title, author, gener, isAvailable) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.gener = gener;
    this.isAvailable = isAvailable;
    this.bookings = [];
  }

  updateAvailability() {
    this.isAvailable = this.bookings.every((booking) => booking.isAvailable());
  }
}

class BookStore {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    this.books = this.books.filter((b) => b.id !== book.id);
  }

  searchBookByTitle(title) {
    //constains a part of the title
    return this.books.filter((book) => book.title.includes(title));
  }

  searchBookByAuthor(author) {
    console.log('authors searching', author);
    return this.books.filter((book) => book.author === author);
  }

  searchBookByGener(gener) {
    return this.books.filter((book) => book.gener === gener);
  }

  searchBookByAvailability(isAvailable) {
    return this.books.filter((book) => book.isAvailable === isAvailable);
  }

  commonSearch(searchQuery){
    const searchResult = this.books.filter((book) => {
      return book.title.includes(searchQuery) || book.author.includes(searchQuery) || book.gener.includes(searchQuery);
    });

    //delete duplicate books by id
    return searchResult.filter((book, index, self) => self.findIndex((b) => b.id === book.id) === index);
  }
}

class Booking {
  constructor(user, startDate, endDate) {
    this.user = user;
    this.startDate = startDate;
    this.endDate = endDate;
  }


  isAvailable(){
    //check availability if the currentDate is between startDate and endDate return false
    return !(currentDate >= this.startDate && currentDate <= this.endDate);
  }
}


const book1 = new Book(1, "The Alchemist", "Paulo Coelho", "Adventure", true);
// const book2 = new Book(2, "The Da Vinci Code", "Dan Brown", "Mystery", true);
// const book3 = new Book(3, "The Great Gatsby", "F. Scott Fitzgerald", "Fiction", true);
// const book4 = new Book(4, "The Catcher in the Rye", "J.D. Salinger", "Fiction", true);


// const bookStore = new BookStore();
// bookStore.addBook(book1);
// bookStore.addBook(book2);
// bookStore.addBook(book3);
// bookStore.addBook(book4);


//booking test
const booking1 = new Booking( "user1", new Date(2021, 1, 1), new Date(2021, 1, 10));

const booking2 = new Booking( "user2", new Date(2024, 1, 11), new Date(2024, 1, 12));
console.log(booking1.isAvailable());
console.log(booking2.isAvailable());

