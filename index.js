//alert('Welcome to Espes public library!');


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


  addBooking(booking) {
    this.bookings.push(booking);
    this.updateAvailability();
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
    return this.books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
  }

  searchBookByAuthor(author) {
    console.log('searching author', author);
    return this.books.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  searchBookByGener(gener) {
    return this.books.filter((book) => book.gener.toLowerCase().includes(gener.toLowerCase()));
  }

  searchBookByAvailability(isAvailable) {
    return this.books.filter((book) => book.isAvailable === isAvailable);
  }

  commonSearch(searchQuery){
    const searchResult = this.books.filter((book) => {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.gener.toLowerCase().includes(searchQuery.toLowerCase());
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
//booking test
const booking1 = new Booking( "Pepe Suarez", new Date(2021, 1, 1), new Date(2021, 1, 10));
const booking2 = new Booking( "Luis Camacho", new Date(2024, 1, 11), new Date(2027, 1, 12));
const booking3 = new Booking( "Antonio Panchi", new Date(2021, 1, 1), new Date(2021, 1, 10));
const booking4 = new Booking( "Jose ", new Date(2021, 1, 1), new Date(2021, 1, 10));

console.log('booking 1', booking1.isAvailable());
console.log('booking 2', booking2.isAvailable());
console.log('booking 3', booking3.isAvailable());
console.log('booking 4', booking4.isAvailable());




const book1 = new Book(1, "The Alchemist", "Paulo Coelho", "Adventure", true);
const book2 = new Book(2, "The Da Vinci Code", "Dan Brown", "Mystery", true);
const book3 = new Book(3, "The Great Gatsby", "F. Scott Fitzgerald", "Fiction", true);
const book4 = new Book(4, "The Catcher in the Rye", "J.D. Salinger", "Fiction", true);

const bookStore = new BookStore();
bookStore.addBook(book1);
bookStore.addBook(book2);
bookStore.addBook(book3);
bookStore.addBook(book4);

//ad one booking per book

book1.addBooking(booking1);
book2.addBooking(booking2);
book3.addBooking(booking3);
book4.addBooking(booking4);

console.log('book store', bookStore);




//get root elements form html file

let booksContainer = document.getElementById('books-container');
let searchField = document.getElementById('search');

/**
 *         <div class="book">
            <div>

                <h2>"Book title"</h2>
                <p>Author: <span>Author name</span></p>
                <p>Gener: <span>Gener name</span></p>
                <p>Availability: <span>Available</span></p>
            </div>
            <button class="button-book">Book now</button>
        </div>
 */

const displayCurrentBooks = (booksSet) => {

    console.log('book set', booksSet);





    let bookContainerContent = '';

    booksSet.forEach((book) => {
        bookContainerContent += `
        <div class="book">
            <div>

                <h2>${book.title}</h2>
                <p>Author: <span>${book.author}</span></p>
                <p>Gener: <span>${book.gener}</span></p>
                <p>Availability: <span>${book.isAvailable ? 'Available' : 'Not available'}</span></p>
            </div>
            <button class="button-book">Book now</button>
        </div>
        `;
    });

    booksContainer.innerHTML = bookContainerContent;
}

searchField.addEventListener('keyup', (event) => {
    console.log('change detected', event.target.value);

    console.log(
        'search by author',
        bookStore.commonSearch(event.target.value)
    )

    let searchResult = bookStore.commonSearch(event.target.value);

    if (searchResult.length === 0) {
        booksContainer.innerHTML = 'No books found';
    }else {
        displayCurrentBooks(searchResult);

    }

    //displayCurrentBooks(bookStore.searchBookByAuthor(event.target.value));
});

displayCurrentBooks(bookStore.books);

