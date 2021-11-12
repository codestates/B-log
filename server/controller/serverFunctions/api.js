const axios = require("axios");
require("dotenv").config();

module.exports = {
  getSearchList: (keyword, maxResults, callback) => {
    axios({
      method: "get",
      url: "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
      params: {
        ttbkey: process.env.ALADIN_API_KEY,
        Query: keyword,
        QueryType: "Keyword",
        MaxResults: maxResults,
        start: 1,
        SearchTarget: "Book",
        output: "js",
        Version: 20131101,
        Cover: "Big",
      },
    })
      .then((response) => {
        const searchList = response.data.item.map((book) => {
          return {
            title: book.title.split(" - ")[0],
            author: book.author.split(" (지은이)")[0],
            publisher: book.publisher,
            description: book.description,
            coverimg: book.cover,
            isbn13: book.isbn13,
          };
        });
        if (searchList) {
          callback(searchList);
        } else {
          callback([]);
        }
      })
      .catch((err) => {
        callback(null);
      });
  },
  getSearchedItem: (isbn, callback) => {
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
        const item = {
          title: book.title.split(" - ")[0],
          author: book.author.split(" (지은이)")[0],
          publisher: book.publisher,
          description: book.description,
          coverimg: book.cover,
          isbn13: book.isbn13,
          pages: book.subInfo.itemPage,
        };
        callback(item);
      })
      .catch((err) => {
        callback(null);
      });
  },
  getBestsellerList: (callback) => {
    axios({
      method: "get",
      url: "https://www.aladin.co.kr/ttb/api/ItemList.aspx",
      params: {
        ttbkey: process.env.ALADIN_API_KEY,
        QueryType: "BlogBest",
        SearchTarget: "Book",
        output: "js",
        Version: 20131101,
        Cover: "Big",
        MaxResults: 10,
      },
    })
      .then((response) => {
        //응답받은 객체의 배열에서 필요한 데이터만 남기기
        const bestsellerList = response.data.item.map((book) => {
          return {
            title: book.title.split(" - ")[0],
            author: book.author.split(" (지은이)")[0],
            publisher: book.publisher,
            description: book.description,
            coverimg: book.cover,
            isbn13: book.isbn13,
          };
        });
        callback(bestsellerList);
      })
      .catch((err) => {
        callback(null);
      });
  },
};
