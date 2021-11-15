"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Bestsellers",
      [
        {
          title: "장면들",
          author: "손석희",
          publisher: "창비",
          description:
            "손석희가 드디어 독자를 만난다. JTBC 「뉴스룸」 앵커석에서 내려온 지 1년 반 만에 저널리즘 에세이로 찾아왔다. 이 책에는 그 변화의 시간을 되짚으며 손석희만이 남길 수 있는 기록이 담겨 있다.",
          coverimg:
            "https://image.aladin.co.kr/product/28294/42/cover/8936478907_1.jpg",
          isbn13: "9788936478902",
        },
        {
          title: "인간으로 사는 일은 하나의 문제입니다",
          author: "김영민",
          publisher: "어크로스",
          description:
            "《아침에는 죽음을 생각하는 것이 좋다》, 《우리가 간신히 희망할 수 있는 것》 등의 저서에서 일상의 진부함을 넘어선 참신하고 자유로운 사유를 보여준 김영민 교수, 그가 이번 신간에서는 인간과 정치를 관통하는 날카롭고 묵직한 질문을 던진다.",
          coverimg:
            "https://image.aladin.co.kr/product/28289/65/cover/k942835997_1.jpg",
          isbn13: "9791167740175",
        },
        {
          title: "둠 : 재앙의 정치학",
          author: "니얼 퍼거슨",
          publisher: "21세기북스",
          description:
            "21세기 최고의 경제사학자 니얼 퍼거슨이 인류에게 종말론을 연상시킨 과거의 전염병이나 전쟁을 소재로 한 문학작품이나 회화 등을 통해 재난과 재앙이 인류에게 갖는 의미를 보여주는 한편, 근대 이후 과학의 발달에도 인류의 바람과 달리 재난을 완벽히 예방하기는 불가능함을 언급한다.",
          coverimg:
            "https://image.aladin.co.kr/product/28294/68/cover/8950997975_1.jpg",
          isbn13: "9788950997977",
        },
        {
          title: "소크라테스, 민주주의를 캐묻다",
          author: "강유원",
          publisher: "라티오",
          description:
            "‘헌법상의 민주공화국’ 시대를 살고 있지만 아직도 우리는 민주정의 실체와 민주주의의 의미를 잘 알지 못한다. 이에 최초의 민주정 시대를 살았던 소크라테스의 사상을 통해 민주주의의 고전적인 의미를 성찰해 보고자 한다.",
          coverimg:
            "https://image.aladin.co.kr/product/28290/18/cover/8995928840_1.jpg",
          isbn13: "9791195928842",
        },
        {
          title: "공산주의라는 이념",
          author: "알랭 바디우",
          publisher: "그린비",
          description:
            "프리즘총서 39권. 콘퍼런스 발표자들이 낭독한 내용을 최소한으로 편집하여 당시의 열기를 그대로 담아내고자 했다.",
          coverimg:
            "https://image.aladin.co.kr/product/28251/81/cover/8976826647_1.jpg",
          isbn13: "9788976826640",
        },
        {
          title: "요즘 애들",
          author: "앤 헬렌 피터슨",
          publisher: "알에이치코리아(RHK)",
          description:
            "부모처럼 살기 싫지만 부모만큼 되기도 어려운 세대, 밀레니얼. 그들은 ‘이번 생은 망했다’면서도 탈진 직전까지 일에 몰두하고, 필패하도록 설계된 체제에서 ‘졌지만 잘 싸웠다’며 자조한다.",
          coverimg:
            "https://image.aladin.co.kr/product/28163/42/cover/8925579316_1.jpg",
          isbn13: "9788925579313",
        },
        {
          title: "나인 (양장)",
          author: "천선란",
          publisher: "창비",
          description:
            "평범한 고등학생 ‘나인’이 어느 날 식물들의 목소리를 듣기 시작하면서 펼쳐지는 이야기다. 숲의 속삭임을 따라 우연히 2년 전 실종 사건의 전말을 알게 된 나인은 친구 미래, 현재, 승택과 함께 숨겨진 진실을 파헤치기 시작한다.",
          coverimg:
            "https://image.aladin.co.kr/product/28218/87/cover/8936438603_1.jpg",
          isbn13: "9788936438609",
        },
        {
          title: "피라네시",
          author: "수재나 클라크",
          publisher: "흐름출판",
          description:
            "휴고상, 세계 환상 문학상 등을 수상한 《조나단 스트레인지와 노렐》의 저자 수재나 클라크가 16년 만에 선보이는 장편소설로, 환상적인 공간에서 홀로 살아가고 있는 ‘피라네시’라는 인물의 이야기다. 그는 왜 기억을 잃어버렸고, 왜 홀로 이 공간에 남겨진 걸까.\n",
          coverimg:
            "https://image.aladin.co.kr/product/28157/2/cover/8965964741_1.jpg",
          isbn13: "9788965964742",
        },
        {
          title: "인문 여행자, 도시를 걷다",
          author: "김경한",
          publisher: "쌤앤파커스",
          description:
            "“여행은 사유에 양념을 풍성하게 뿌려주는 기막힌 발명품”과 같다. 내가 가보지 않았던 장소, 낯선 곳과 마주하면 그곳의 이야기들이 또 다른 세계로 나를 데려가는 것이다.",
          coverimg:
            "https://image.aladin.co.kr/product/28162/62/cover/k162835867_1.jpg",
          isbn13: "9791165344153",
        },
        {
          title: "단어의 진상",
          author: "최성일",
          publisher: "성안북스",
          description:
            "불완전하고 아이러니한 인생의 비밀을 수수께끼 같은 시로 묻고, 통쾌하면서도 깊은 위로와 통찰을 주는 에세이로 답하는 독특한 구성의 책. 시는 상상력을 자극하며 유쾌하게 묻고 있으며,  에세이 는 너그럽고 우아하며, 가슴 벅차게 시리다가 포근하게 감싸준다.",
          coverimg:
            "https://image.aladin.co.kr/product/28163/36/cover/897067408x_2.jpg",
          isbn13: "9788970674087",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bestsellers", null, {});
  },
};
