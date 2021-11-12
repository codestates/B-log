const axios = require("axios");
const { api } = require("./serverFunctions");

module.exports = {
  //페이지 수 받아오는 메소드 get요청
  item: (req, res) => {
    try {
      //path 파라미터 받아오기 문제 생기면 catch 블럭으로
      const isbn = req.params.isbn.split(":")[1];
      api.getSearchedItem(isbn, (item) => {
        if (item) {
          res.status(200).send(item);
        } else {
          res.status(500).send();
        }
      });
    } catch {
      res.status(500).send();
    }
  },

  //검색 결과 받아오는 메소드. get요청 /books/item/:keyword
  list: (req, res) => {
    try {
      //path 파라미터로 받은 키워드 가져오기. 문제가 생기면 catch 블럭으로
      const keyword = req.params.keyword.split(":")[1];
      api.getSearchList(keyword, 20, (searchList) => {
        if (searchList) {
          res.status(200).json({ books: searchList });
        } else {
          res.status(404).send({ message: "Resource not found" });
        }
      });
    } catch {
      res.status(500).send();
    }
  },

  bestseller: (req, res) => {
    api.getBestsellerList((bestsellerList) => {
      console.log(bestsellerList);
      if (bestsellerList) {
        res.status(200).json({ books: bestsellerList });
      } else {
        res.status(500).send();
      }
    });
  },
};
