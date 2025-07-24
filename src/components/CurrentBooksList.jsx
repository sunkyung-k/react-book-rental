import React from "react";

function CurrentBooksList({ myBooks, setMyBooks, evtReturn }) {
  return (
    <>
      <section className="list-box">
        <div className="top">
          <h3>대여한 도서 목록</h3>
          <div className="btn-box">
            <button
              type="button"
              className="btn btn-dark"
              onClick={evtReturn}
              disabled={!myBooks.some((book) => book.chk)}
            >
              반납
            </button>
          </div>
        </div>
        <div className="list">
          {myBooks?.map((item, idx) => (
            <div key={idx}>
              <input
                type="checkbox"
                id={`my-book-${idx}`}
                checked={item.chk}
                onChange={() =>
                  setMyBooks((prev) =>
                    prev.map((b) => (b === item ? { ...b, chk: !b.chk } : b))
                  )
                }
              />
              <label htmlFor={`my-book-${idx}`}>{item.book}</label>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CurrentBooksList;
