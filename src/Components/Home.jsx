import React, { useReducer, useRef, useState } from "react";

function Home() {
  const booklist = [
    { id: 1, name: "Physics" },
    { id: 2, name: "Chemistry" },
    { id: 3, name: "Biology" },
  ];

  const Modal = ({ modalText }) => {
    return <p>{modalText}</p>;
  };
  const reducer = (state, action) => {
    if (action.type === "ADD") {
      const allBooks = [...state.books, action.payload];
      return {
        ...state,
        books: allBooks,
        ismodalOpen: true,
        modalText: "item added",
      };
    }
    if (action.type === "REMOVE") {
      const update = [...state.books].filter((item) => {
        return item.id != action.payload;
      });
      return {
        ...state,
        books: update,
        ismodalOpen: true,
        modalText: "item is removed",
      };
    }
    return state;
  };

  const [bookstate, dispatch] = useReducer(reducer, {
    books: booklist,
    ismodalOpen: false,
    book: "",
    modalText: "",
  });
  const [book, setBook] = useState("");

  const handleSumbit = (event) => {
    event.preventDefault();
    const newbook = { id: new Date().getTime().toString(), name: book };
    dispatch({ type: "ADD", payload: newbook });
  };

  const handleClick = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  return (
    <main>
      <div className="bg-gray-950 text-white text-2xl font-bold">Book list</div>
      <form onSubmit={handleSumbit}>
        <div>
          <input
            value={book}
            onChange={(e) => {
              setBook(e.target.value);
            }}
            className="border border-spacing-4"
            type="text"
            placeholder="booksname"
          />
          <button type="submit">ADD</button>
        </div>
      </form>

      {bookstate.ismodalOpen && <Modal modalText={bookstate.modalText} />}
      {bookstate.books.map((book) => {
        const { id, name } = book;
        return (
          <li className="p-2" key={id}>
            {name}{" "}
            <button
              onClick={() => {
                handleClick(id);
              }}
              className="bg-red-500"
            >
              remove
            </button>{" "}
          </li>
        );
      })}
    </main>
  );
}

export default Home;
