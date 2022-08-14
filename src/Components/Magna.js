import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
require("./Magna.css");
export function Magna() {
  const [books, setBooks] = useState([]);
  const [curBook, setCurBook] = useState(null);
  const [lastChapter, setLastChapter] = useState(3);

  const [chapter, setChapter] = useState(null);
  const [curChapter, setCurChapter] = useState(1);
  const [curPage, setCurPage] = useState(0);

  const [totalPage, setTotalPage] = useState(0);

  const [targetId, setTargetId] = useState(null);
  // const activeStyle = {border:"2px solid rgb(169, 140, 14)",background:"rgb(9, 125, 9)"}
  const activeStyle = {
    border: "2px solid rgb(169, 140, 14)",
    background: "black",
  };
  const imgRef = useRef();

  useEffect(() => {
    fetch("http://18.177.140.79:8080/books/")
      .then((response) => response.json())
      .then((data) => {
        console.log("data");
        setBooks(data);
        setLastChapter(3);
      })
      .catch((err) => console.log(err));
  }, []);

  function getBookDetails(bookid) {
    fetch(`http://18.177.140.79:8080/books/${bookid}/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCurBook(bookid - 1);
      })
      .catch((err) => console.log(err));
  }
  function getChapters() {
    fetch(`http://18.177.140.79:8080/chapters/${curChapter}/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setChapter(data.pages);
        setCurPage(0);
        setTotalPage(data.pages.length);
      })
      .catch((err) => console.log(err));
  }
  function setPrevPage() {
    // console.log("prev page")
    if (curPage !== 0) {
      setCurPage((prevState) => prevState - 1);
    }
  }
  function setNextPage() {
    // console.log(lastChapter)
    // console.log("next page")
    if (curPage !== totalPage - 1) {
      setCurPage((prevState) => prevState + 1);
    } else {
      if (curChapter !== lastChapter) {
        setCurChapter((prevState) => prevState + 1);
      }
    }
  }

  useEffect(() => {
    setCurChapter(1);
    setCurBook(0);
  }, [books]);
  useEffect(() => {
    setTargetId(`btn${books[curBook]?.chapter_ids[0]}`);
    setLastChapter(
      books[curBook]?.chapter_ids[books[curBook]?.chapter_ids.length - 1]
    );
  }, [curBook]);
  useEffect(() => {
    getChapters(curChapter);
    setTargetId(`btn${curChapter}`)
  }, [curChapter]);

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-12">
          <div>
            {books.length>0? (
              ""
            ) : (
              <Fragment>
                <div className="modal"></div>
                <svg>
                  <circle cx="57" cy="57" r="52" className="circle" />
                  <circle cx="57" cy="57" r="52" className="loader" />
                </svg>
              </Fragment>
            )}
            {books
              ? books.map(({ id, title }, index) => (
                  <button
                    key={title}
                    className="main-btn yellow-text"
                    onClick={() => {
                      getBookDetails(id);
                      setCurBook(index);
                    }}
                    style={curBook === index ? activeStyle : {}}
                  >
                    {title}
                  </button>
                ))
              : ""}
          </div>
          <div>
            {books
              ? books[curBook]?.chapter_ids.map((details, index) => (
                  <button
                    key={details}
                    id={`btn${details}`}
                    className="sub-btn yellow-text"
                    style={
                      targetId === "btnundefined" && index === 0
                        ? activeStyle
                        : targetId === `btn${details}`
                        ? activeStyle
                        : {}
                    }
                    onClick={(e) => {
                      setTargetId(e.target.id);
                      setCurChapter(details);
                    }}
                  >
                    {index + 1}
                  </button>
                ))
              : ""}
          </div>
          <div>
            {chapter ? (
              <Fragment>
                <div className="box">
                  {imgRef ? (
                    <Fragment>
                      <div
                        style={
                          imgRef.current
                            ? {
                                height: imgRef.current.clientHeight,
                                width: imgRef.current.clientWidth / 2,
                              }
                            : {
                                height: window.screen.height,
                                width: window.screen.width / 2,
                              }
                        }
                        className="subbox width-100"
                        onClick={setNextPage}
                      ></div>
                      <div
                        style={
                          imgRef.current
                            ? {
                                height: imgRef.current.clientHeight,
                                width: imgRef.current.clientWidth / 2,
                              }
                            : {
                                height: window.screen.height,
                                width: window.screen.width / 2,
                              }
                        }
                        className="subbox width-100"
                        onClick={setPrevPage}
                      ></div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
                <img
                  ref={imgRef}
                  src={chapter[curPage].image.file}
                  height={chapter[curPage].image.height}
                  className="img-fluid"
                />
              </Fragment>
            ) : (
              ""
            )}
            {chapter ? (
              <div className="count">
                <span className="yellow-text">{curPage + 1}</span> / {totalPage}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
