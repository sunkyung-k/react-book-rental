import React from "react";

function BooksList({
  books,
  inputValue,
  setInputValue,
  evtAdd,
  evtRental,
  evtDelete,
  toggleBookCheck,
}) {
  return (
    <>
      <section className="list-box">
        <div className="top">
          <h3>도서 목록</h3>
          <div className="input-box">
            <input
              type="text"
              name="addbook"
              id=""
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="button" className="btn btn-dark" onClick={evtAdd}>
              추가
            </button>
          </div>
          <div className="btn-box wide">
            <button
              type="button"
              className="btn btn-pick"
              onClick={evtRental}
              disabled={!books.some((book) => book.chk)}
            >
              대여
            </button>
            <button
              type="button"
              className="btn btn-delete"
              onClick={evtDelete}
              disabled={!books.some((book) => book.chk)}
            >
              삭제
            </button>
          </div>
        </div>
        <div className="list">
          {books?.map((item, idx) => (
            <div key={idx}>
              <input
                type="checkbox"
                id={`book-${idx}`}
                checked={item.chk}
                disabled={item.name !== ""}
                onChange={() => toggleBookCheck(idx)}
              />
              <label htmlFor={`book-${idx}`}>{item.book}</label>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default BooksList;
