import React, { useEffect, useState } from "react";
import "../assets/css/book.css";
import Login from "../components/Login";
import BooksList from "../components/BooksList";
import CurrentBooksList from "../components/CurrentBooksList";

function BookLayout(props) {
  const [users] = useState(["김선경", "홍길동"]);
  const [currentUser, setCurrentUser] = useState(""); // 유저 선택
  const [myName, setMyName] = useState(""); // 로그인 유저
  const [inputValue, setInputValue] = useState(""); // 책 이릅력값

  // 전체 목록
  const [books, setBooks] = useState([
    { book: "책제목1", name: "", chk: false },
    { book: "책제목2", name: "", chk: false },
  ]);

  // 대여 목록
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

  // 도서 선택 toggle
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
    const newBook = { book: inputValue, name: "", chk: false };
    setBooks((prev) => [...prev, newBook]);
    setInputValue("");
  };

  // 대여
  const evtRental = () => {
    const checkedBooks = books.filter((book) => book.chk);
    if (checkedBooks.length === 0) {
      alert("체크된 책이 없습니다!");
      return;
    }

    // 선택된 책들 myBooks에 대여
    const rentedList = checkedBooks.map((book) => ({
      ...book,
      name: myName,
      chk: false, // 대여 후엔 체크 해제
    }));
    setMyBooks([...myBooks, ...rentedList]);

    // name만 바꾸고 chk 초기화
    const updatedBooksList = books.map((book) =>
      book.chk ? { ...book, name: myName, chk: false } : book
    );
    setBooks(updatedBooksList);
  };

  // 반납
  const evtReturn = () => {
    const returnList = myBooks.filter(
      (book) => book.chk && book.name === myName
    );

    if (returnList.length === 0) {
      alert("반납할 책이 없습니다");
      return;
    }

    // myBooks에서 반납한 책 삭제
    const updatedMyBooksList = myBooks.filter(
      (book) => !(book.chk && book.name === myName)
    );
    setMyBooks(updatedMyBooksList);

    // books에서 반납했던 책 복구
    const updatedBooksList = books
      .filter((book) => !returnList.some((item) => item.book === book.book))
      .concat(returnList.map((book) => ({ ...book, name: "", chk: false })));
    setBooks(updatedBooksList);
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
          <div>
            <CurrentBooksList
              myBooks={myBooks.filter((item) => item.name === myName)} // 내가 선택한 users에 맞게 myBook 뿌리기
              evtReturn={evtReturn}
              setMyBooks={setMyBooks}
            />

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
          </div>
        )}
      </main>
    </>
  );
}

export default BookLayout;
