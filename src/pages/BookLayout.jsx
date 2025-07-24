import React, { useEffect, useState } from "react";
import "../assets/css/book.css";
import Login from "../components/Login";
import BooksList from "../components/BooksList";
import CurrentBooksList from "../components/CurrentBooksList";

function BookLayout(props) {
  const [users] = useState(["김선경", "홍길동"]);
  const [currentUser, setCurrentUser] = useState("");
  const [myName, setMyName] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 도서 목록
  const [books, setBooks] = useState([
    { book: "책제목1", name: "", chk: false },
    { book: "책제목2", name: "", chk: false },
  ]);

  // 대여한 도서 목록
  const [myBooks, setMyBooks] = useState([
    { book: "책제목1_선경", name: "김선경", chk: false },
    { book: "책제목2_선경", name: "김선경", chk: false },
    { book: "책제목1_길동", name: "홍길동", chk: false },
    { book: "책제목2_길동", name: "홍길동", chk: false },
  ]);

  // 로그인
  const evtLogin = () => {
    if (currentUser === "") {
      alert("유저를 선택하세요.");
      return;
    }
    setMyName(currentUser);
  };

  // checkbox chk value 제어
  const toggleBookCheck = (index) => {
    setBooks((prevBooks) =>
      prevBooks.map((book, i) =>
        i === index ? { ...book, chk: !book.chk } : book
      )
    );
  };

  // 추가
  const evtAdd = () => {
    if (inputValue.trim().length === 0) {
      alert("값을 입력해주세요.");
      return;
    }
    setBooks((prev) => [...prev, { book: inputValue, name: "", chk: false }]);
    setInputValue("");
  };

  // 대여
  const evtRental = () => {
    const checkedBooks = books.filter((book) => book.chk);
    if (checkedBooks.length === 0) {
      alert("체크된 책이 없습니다!");
      return;
    }

    // 추가
    setMyBooks([
      ...myBooks,
      ...checkedBooks.map((book) => ({ ...book, name: myName, chk: false })),
    ]);

    // name만 바꾸고 chk 초기화
    const updatedBooks = books.map((book) =>
      book.chk ? { ...book, name: myName, chk: false } : book
    );
    setBooks(updatedBooks);
  };

  // 반납
  const evtReturn = () => {
    const checked = myBooks.filter((book) => book.chk && book.name === myName);
    if (checked.length === 0) {
      alert("반납할 책이 없습니다");
      return;
    }
    setMyBooks(myBooks.filter((prev) => !(prev.chk && prev.name === myName)));
    setBooks((prev) => [
      ...prev.filter((prev) => !checked.some((c) => c.book === prev.book)),
      ...checked.map((prev) => ({ ...prev, chk: false, name: "" })),
    ]);
  };

  // 삭제
  const evtDelete = () => {
    const chkBooks = books.filter((item) => !item.chk);
    setBooks(chkBooks);
  };

  useEffect(() => {
    console.log("myName", myName);
    console.log("books", books);
  }, [books, myName]);

  return (
    <>
      <header id="header">
        <h1 className="title">도서 대여 시스템</h1>
      </header>
      <main id="container">
        <Login
          users={users}
          myName={myName}
          evtLogin={evtLogin}
          setCurrentUser={setCurrentUser}
        />

        {myName !== "" && (
          <CurrentBooksList
            myBooks={myBooks.filter((item) => item.name === myName)} // 내가 선택한 users에 맞게 myBook 뿌리기
            evtReturn={evtReturn}
            setMyBooks={setMyBooks}
          />
        )}

        <BooksList
          books={books}
          evtAdd={evtAdd}
          evtRental={evtRental}
          evtDelete={evtDelete}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setBooks={setBooks}
          toggleBookCheck={toggleBookCheck}
        />
      </main>
    </>
  );
}

export default BookLayout;
