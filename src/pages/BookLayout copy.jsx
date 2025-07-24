import React, { useEffect, useState } from "react";
import "../assets/css/book.css";
import Login from "../components/Login";
import BooksList from "../components/BooksList";
import CurrentBooksList from "../components/CurrentBooksList";

function BookLayout(props) {
  const [users, setUsers] = useState(["김선경", "홍길동"]);
  const [currentUser, setCurrentUser] = useState("");
  const [myName, setMyName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([
    { book: "책제목1", name: "", chk: false },
    { book: "책제목2", name: "", chk: false },
  ]);
  const [myBooks, setMyBooks] = useState([
    { book: "책제목1_선경", name: "김선경", chk: false },
    { book: "책제목2_선경", name: "김선경", chk: false },
    { book: "책제목1_길동", name: "홍길동", chk: false },
    { book: "책제목2_길동", name: "홍길동", chk: false },
  ]);
  const [viewMyBooks, setViewMyBooks] = useState([]);
  const [disabledList, setDisabledList] = useState([]);

  const evtLogin = () => {
    setMyName(currentUser);
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

    console.log(books);
  };

  // 반납
  const evtReturn = () => {
    const checked = viewMyBooks.filter(
      (book) => book.chk && book.name === myName
    );
    if (checked.length === 0) {
      alert("반납할 책이 없습니다");
      return;
    }

    // myBooks에서 반납한 책 제거
    const updatedMyBooks = myBooks.filter(
      (book) => !(book.chk && book.name === myName)
    );
    setMyBooks(updatedMyBooks);

    // viewMyBooks에서도 제거
    const updatedViewBooks = viewMyBooks.filter((book) => !book.chk);
    setViewMyBooks(updatedViewBooks);

    // books 상태 복구 (기존 book 목록 중 해당 제목 있으면 chk: false, name: "" 처리)
    // const updatedBooks = books.map((book) =>
    //   checked.find((c) => c.book === book.book) ? { ...book, chk: false, name: "" } : book
    // );
    // setBooks(updatedBooks);

    setBooks((prev) => [
      ...prev.filter((b) => !checked.some((c) => c.book === b.book)),
      ...checked.map((b) => ({ ...b, chk: false, name: "" })),
    ]);

    console.log("반납 완료!");
  };

  // 대여
  const evtRental = () => {
    const checkedBooks = books.filter((book) => book.chk);
    if (checkedBooks.length === 0) {
      alert("체크된 책이 없습니다!");
      return;
    }

    const newMyBooks = checkedBooks.map((book) => ({
      ...book,
      name: myName,
      chk: false,
    }));
    setMyBooks((prev) => [...prev, ...newMyBooks]);

    const updatedBooks = books.map((book) =>
      book.chk ? { ...book, name: "", chk: true } : book
    );
    setBooks(updatedBooks);

    const disabledTitles = books
      .filter((book) => book.chk === true)
      .map((book) => book.book);
    setDisabledList(disabledTitles);
  };

  // 삭제
  const evtDelete = () => {
    console.log("삭제");
  };

  useEffect(() => {
    if (myName) {
      const filterMyName = myBooks.filter((item) => item.name === myName);
      setViewMyBooks(filterMyName);
    }
  }, [myName, myBooks]);

  useEffect(() => {
    console.log("=================");
    console.log("disabledList", disabledList);
    console.log("books", books);
    console.log("viewMyBooks", viewMyBooks);
    console.log("myBooks", myBooks);
  }, [books, myBooks, viewMyBooks]);

  return (
    <>
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
              myBooks={viewMyBooks}
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
              disabledList={disabledList}
            />
          </div>
        )}
      </main>
    </>
  );
}

export default BookLayout;
