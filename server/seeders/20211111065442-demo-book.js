"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "던전밥 월드 가이드 모험자 바이블 - S코믹스",
          author: "쿠이 료코 (지은이), 김민재 (옮긴이)",
          publisher: "㈜소미미디어",
          description:
            "라이오스와 마르실, 광란의 마법사나 엘프들, 거의 모든 캐릭터의 새로운 그림을 실었다. 총 50페이지 가량의 오리지널 만화와 작중에서 다루지 못했던 등장인물들의 잡다구리 이야기, 연령, 신장, BMI는 물론, 등장인물들의 상세 데이터를 통째로 게재하였다.",
          coverimg:
            "https://image.aladin.co.kr/product/28290/17/cover/k722835098_1.jpg",
          isbn13: "9791138403832",
          pages: 100,
          referred: 1,
        },
        {
          title: "방금 떠나온 세계",
          author: "김초엽 (지은이)",
          publisher: "한겨레출판",
          description:
            "‘나’와 ‘세계’를 사랑하고 이해하려는 마음으로 쓴 경이롭고 아름다운 7편의 소설을 담았다. 이번 소설집에서 작가는 섬세한 문장과 꿋꿋한 서사, 그리고 타자에 대한 깊은 사유에 더해 세심한 관찰자로서 낯선 우주 저편의 이야기를 김초엽만의 세계 안에 온전히 담아낸다.",
          coverimg:
            "https://image.aladin.co.kr/product/28170/22/cover/k032835560_1.jpg",
          isbn13: "9791160406504",
          pages: 100,
          referred: 3,
        },
        {
          title: "그냥 하지 말라 - 당신의 모든 것이 메시지다",
          author: "송길영 (지은이)",
          publisher: "북스톤",
          description:
            "우리는 흔히 ‘미래를 알 수 없다’고 생각하지만, 그렇지 않다. 과거와 지금을 보고, 그 안에 담긴 사람들의 욕망을 이해할 수 있으면 미래의 변화를 상당 부분 알 수 있다. 자타공인 대한민국 최고의 데이터 분석가 송길영은 20여 년간 분석해온 빅데이터를 바탕으로 사람들의 일상이 어떻게 달라졌고, 생각이 어떻게 변화했는지 추적한다.",
          coverimg:
            "https://image.aladin.co.kr/product/28007/17/cover/s772835676_1.jpg",
          isbn13: "9791191211467",
          pages: 100,
          referred: 1,
        },
        {
          title: "미워하는 미워하는 미워하는 마음 없이",
          author: "유지혜 (지은이)",
          publisher: "김영사",
          description:
            "MZ 세대 문학 아이콘으로 자리 잡은 유지혜 작가가 새벽 풍경이 내려다보이는 ‘자기만의 방’에서 지난 시간을 곱씹고 또 곱씹으며 내가 가장 사랑하는 것들은 무엇인지, 나아가 진정한 ‘사랑’의 의미는 무엇인지에 대한 답을 찾는 여정을 담았다.",
          coverimg:
            "https://image.aladin.co.kr/product/28294/76/cover/8934980222_1.jpg",
          isbn13: "9788934980223",
          pages: 100,
          referred: 1,
        },
        {
          title:
            "가가미 다카히로가 알려주는 손 그리는 법 - 압도적으로 마음을 사로잡는 작화법",
          author: "가가미 다카히로 (지은이), 박현정 (옮긴이)",
          publisher: "이아소",
          description:
            "'유희왕', '루팡 3세', '원피스 극장판', '데스노트', '절대가련 칠드런' 등의 작품을 통해 전 세계적으로 이름을 알린 애니메이션 작화감독 가가미 다카히로. 이 책은 애니메이션 마니아 사이에서 ‘작화의 신’이라 불리는 천재 작가가 처음으로 펴낸 손 그리기 기법서다.",
          coverimg:
            "https://image.aladin.co.kr/product/28271/60/cover/k152835999_1.jpg",
          isbn13: "9791187113515",
          pages: 100,
          referred: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
