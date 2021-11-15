let v = {
  name: "ademola",
  age: 30,
};

let id = Math.random() * 8;

const isbn = 978311331543;

let newArray = [
  {
    _id: "60ba6e38d9efd91ed0149ca3",
    title: "Spring Microservices in Action",
    author: "John Carnel",
    isbn: 978311331543,
    price: 321,
    language: "English",
    __v: 0,
  },
  {
    _id: "60ba6e98d9efd91ed0149ca5",
    title: "Java Persistence with Hibernate",
    author: "Christian Bauer and Gavin King",
    isbn: 38927892,
    price: 893,
    language: "English",
    __v: 0,
  },
  {
    _id: "60bb1b9851a1630954401772",
    title: "Grails in Action",
    author: "Glen Smith and Peter Ledbrook",
    isbn: 5783913820,
    price: 333,
    language: "English",
    __v: 0,
  },
  {
    _id: "60bb1bd651a1630954401773",
    title: "Spring Boot in Action",
    author: "Craig Walls ",
    isbn: 480823489,
    price: 190,
    language: "English",
    __v: 0,
  },
  {
    _id: "60bb2f2c109b27225c40a4fc",
    title: "Spring Microservices in Action",
    author: "faea",
    url: "https://crudappdemoapi.herokuapp.com/",
    isbn: 9783,
    price: 409580,
    language: "English",
    __v: 0,
  },
];


let newV = { ...v, age: "aad" };

console.log(newV);

const amounts = [1, 2, 3, 5, 6];

const total = amounts.reduce((a, b) => {
  console.log(a, b);
  return a + b;
});
console.log(total);

// Inorder to make them work, all todos are required to work hand-in-hna
