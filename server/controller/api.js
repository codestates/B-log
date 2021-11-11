const axios = require("axios");
require("dotenv").config();

module.exports = {
  //페이지 수 받아오는 메소드 get요청 /api/:id
  pages: (req, res) => {
    try {
      //path 파라미터 받아오기 문제 생기면 catch 블럭으로
      const isbn = req.params.id.split(":")[1];

      //알라딘 api로 요청
      axios({
        method: "get",
        url: "https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx",
        params: {
          ttbkey: process.env.ALADIN_API_KEY,
          itemIdType: "ISBN13",
          ItemId: isbn,
          output: "js",
          Version: 20131101,
          Cover: "Big",
        },
      })
        .then((response) => {
          const book = response.data.item[0];
          const data = {
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            description: book.description,
            coverimg: book.cover,
            isbn13: book.isbn13,
            pages: book.subInfo.itemPage,
          };
          //페이지 정보를 포함한 도서 객체를 올바르게 반환. 200 코드로 응답
          res.status(200).json(data);
        })

        //axios 요청 에러 처리
        .catch((err) => {
          //외부 api를 불러오는 과정에서 오류가 생긴 경우. 500코드로 응답
          res.status(500).send();
        });
    } catch {
      //try문 에러 처리
      //요청이 잘못되어 split 메소드를 불러올 수 없을 때 실행됨. 400 잘못된 요청.
      res.status(400).send();
    }
  },

  //검색 결과 받아오는 메소드. get요청 api/books/:keyword
  books: (req, res) => {
    try {
      //path 파라미터로 받은 키워드 가져오기. 문제가 생기면 catch 블럭으로
      const keyword = req.params.keyword.split(":")[1];

      //알라딘 api로 요청
      axios({
        method: "get",
        url: "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
        params: {
          ttbkey: process.env.ALADIN_API_KEY,
          Query: keyword,
          QueryType: "Keyword",
          MaxResults: 20, //최대 결과 개수
          start: 1,
          SearchTarget: "Book",
          output: "js",
          Version: 20131101,
          Cover: "Big",
        },
      })
        .then((response) => {
          //응답받은 객체의 item 배열에서 필요한 값만 남기기
          const searchList = response.data.item.map((book) => {
            return {
              title: book.title,
              author: book.author,
              publisher: book.publisher,
              description: book.description,
              coverimg: book.cover,
              isbn13: book.isbn13,
            };
          });
          //검색 결과 배열을 올바르게 받은 경우 200 코드로 응답
          res.status(200).json({ books: searchList });
        })

        //axios 요청 에러 처리
        .catch((err) => {
          //외부 api를 불러오는 과정에서 오류가 생긴 경우 500 코드로 응답
          res.status(500).send();
        });
    } catch {
      //try문 에러 처리
      //요청 파라미터 형식이 잘못되어 split 메소드를 불러올 수 없을 때 실행됨. 400 잘못된 요청.
      res.status(400).send();
    }
  },

  //베스트셀러 도서 목록 받아오는 메소드. get 요청 /api/bestseller
  bestseller: (req, res) => {
    //알라딘 api로 요청
    axios({
      method: "get",
      url: "https://www.aladin.co.kr/ttb/api/ItemList.aspx",
      params: {
        ttbkey: process.env.ALADIN_API_KEY,
        QueryType: "Bestseller",
        SearchTarget: "Book",
        output: "js",
        Version: 20131101,
        Cover: "Big",
      },
    })
      .then((response) => {
        //응답받은 객체의 배열에서 필요한 데이터만 남기기
        const bestsellerList = response.data.item.map((book) => {
          return {
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            description: book.description,
            coverimg: book.cover,
            isbn13: book.isbn13,
          };
        });
        //목록을 올바르게 받아서 전달하는 경우 200 코드로 응답
        res.status(200).json(bestsellerList);
      })

      //axios 요청 에러 처리
      .catch((err) => {
        //외부 api를 불러오는 과정에서 오류가 생긴 경우 500 코드로 응답
        res.status(500).send();
      });
  },
};
