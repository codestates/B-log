const {User, Rack, Book} = require('../../models');
//const {함수이름} = require('../serverFunctions');

module.exports = {
  get: (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = 1 // isAuthorized(req).id;
    
    //토큰이 없거나 유효하지 않음 401 코드 응답
    if(!userId) {
      res.status(401).send({ "message": "access token expired" });
    }

    //token decoded 성공한 경우
    else {
      //유저 아이디가 가지고 있는 모든 책의 아이디를 조회
      Rack.findAll({
        where: { userId: userId },
      })
      .then(racks => {
        const bookList = [];

        //조회한 배열을 순회한다
        racks.map((rack, index) => {
          //아이디에 해당하는 책 정보를 불러온다
          Book.findByPk(rack.dataValues.bookId)
          .then((bookInfo)=>{
            //필요 없는 데이터를 지우고 응답할 배열에 넣어 줌
            const data = bookInfo.dataValues
            delete data.createdAt;
            delete data.updatedAt;
            bookList.push(data);

            //마지막 요소까지 순회했을 때 도서 정보 배열과 함께 200 코드로 응답
            if(index === racks.length-1) {
              res.status(200).json({ book:bookList });
            }
          })
        });
      })
      .catch(err => {
        res.status(500).send();
      })
    }
  },


  post: async (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = 1 // isAuthorized(req).id;
    
    //토큰이 없거나 유효하지 않음 401 코드 응답
    if(!userId) {
      res.status(401).send({ "message": "access token expired" });
    }

    //token decoded 성공한 경우
    else {
      //요청으로 받은 정보와 일치하는 책이 book 테이블에 있는지 찾는다
      const bookInfo = await Book.findOne({ where: { isbn13: req.body.isbn13 } });

      //book 테이블에 있는 책이면 아이디를 받아서 rack 테이블에 있는지 조회, 없으면 추가
      if(bookInfo) {
        //rack에 일치하는 레코드가 있는지 찾기
        const exist = await Rack.findOne({ 
          bookId: bookInfo.dataValues.id,
          userId: userId
        })
        
        //있으면 403 금지 코드 응답
        if(exist) {
          res.status(403).send({ "message": "already exist" });
        }

        //없으면 rack에 추가
        else {
          Rack.create({ 
            bookId: bookInfo.dataValues.id,
            userId: userId
          })
          .then(response => { 
            res.status(200).send({ "message": "ok" })
          })
          .catch(err=> {
            res.status(500).send();
          })
        }
      }

      //book 테이블에 없으면 먼저 추가한 후 추가한 레코드의 아이디를 받아서 rack 테이블에 추가
      else {
        //book테이블에 추가
        Book.create(req.body)
        .then(newBook => {
          //rack 테이블에 추가
          Rack.create({ 
            bookId: newBook.dataValues.id,
            userId: userId
          })
        })
        .then(response => { 
          res.status(200).send({ "message": "ok" })
        })
        .catch(err=> {
          res.status(500).send();
        })
      }
    }
  },


  delete: async (req, res) => {
    //헤더 토큰 해독해서 로그인한 유저의 id 가져오기
    const userId = 1 // isAuthorized(req).id;
    
    //토큰이 없거나 유효하지 않음 401 코드 응답
    if(!userId) {
      res.status(401).send({ "message": "access token expired" });
    }

    else {
      try {
        const bookId = req.params.id.split(':')[1];
        const deletedBook = Rack.destroy({
          where: { 
            bookId: bookId,
            userId: userId
          }
        })

        //지울 책이 없음 안지워짐
        if(!deletedBook) {
          res.status(500).send()
        }

        //Rack에서 지워진 경우 해당 책의 id가 Rack이나 Shelf에서 계속 참조되고 있는지 확인
        //아니면 그냥 Book 테이블에 새로 referred 칼럼을 만들기 
        //참조될 때마다 ++ 삭제할 때마다 -- 
        //book.referred===0이 되는 순간 db에서 삭제한다
        else {
          
        }
      }
      //path 파라미터가 잘못된 경우
      catch {
        res.status(500).send();
      }
    }
  }
}