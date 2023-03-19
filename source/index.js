$(function () {
  $("a[href*=#]").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top },
      400,
      "linear"
    );
  });

  // 메인 사진 바꾸기
  // mainVisual
  var images = [
    "https://img.hyundaicard.com/docfiles/resources/pc/images/detail/bg_top_tpi.png",
    "https://www.hyundaicard.com/docfiles/resources/pc/images/detail/bg_voucher_tpi.png",
    "https://newsroom.hcs.com/common/file/getAbPathImage.do?atchFileId=4514",
    "https://newsroom.hcs.com/common/file/getAbPathImage.do?atchFileId=4515",
    "https://newsroom.hcs.com/common/file/getAbPathImage.do?atchFileId=4516",
  ];

  var currentIndex = 0;
  var maxIndex = images.length - 1;
  var interval = 5000; // 8초

  setInterval(function () {
    currentIndex++;
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }
    var imageUrl = images[currentIndex];
    $(".mainVisual").fadeOut(500, function () {
      $(this).css({ "background-image": "url(" + imageUrl + ")" });
      $(this).fadeIn(500);
    });
  }, interval);

  // 프로그레스바
  $(window).scroll(function () {
    var wins = $(this).scrollTop();
    var hei = $("body").outerHeight(); //전체 페이지 높이
    var hei2 = $(window).outerHeight(); //윈도우의 높이
    var height = hei - hei2;
    var bar = (wins / height) * 100;
    $("#progress").val(bar);
  });

  // 스크롤 observer

  const boxes = document.querySelectorAll(".show");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  boxes.forEach((box) => {
    observer.observe(box);
  });

  $(window).scroll(function () {
    var height = $(document).scrollTop();

    // 맨 위에 도달하면 모든 visible 클래스 제거
    if (height === 0) {
      $(".visible").removeClass("visible");
    }
  });

  // 응모하기 버튼 슬라이드업
  $(window).scroll(function () {
    var height = $(document).scrollTop();
    var screenHeight = $(window).outerHeight();
    var wheel = screenHeight + height;
    var elFooter = $("footer").offset().top;
    var start = $("#startSection").offset().top + 100;
    console.log(start);
    console.log(`${wheel} : wheel`);

    if (wheel >= elFooter) {
      $(".applyBtns").animate(
        {
          bottom: "0px",
        },
        500
      );
    }
  });

  // 키프레임, 카드체인지

  var supportedFlag = $.keyframe.isSupported();
  var cardF = `url(
    "https://card.hyundaicard.com/img_2023/event/new_vpn50/Stain_f.png"
  )`;
  var cardB = `url(
    "https://card.hyundaicard.com/img_2023/event/new_vpn50/Stain_b.png"
  )`;

  function keyframeAct() {
    $.keyframe.define({
      name: "spin",
      "0%": {
        transform: "rotateY(0deg) rotate(25deg)",
        "background-image": cardB,
        "background-position": "center",
        "background-repeat": "noRepeat",
        "background-size": "cover",
      },
      "24%": {
        transform: "rotateY(89deg) rotate(25deg)",
        "background-image": cardB,
        "background-position": "center",
        "background-repeat": "noRepeat",
        "background-size": "cover",
      },
      "25%": {
        transform: "rotateY(89deg) rotate(25deg)",
        "background-image": cardF,
        "background-position": "center",
        "background-repeat": "noRepeat",
        "background-size": "cover",
      },
      "50%": {
        transform: "rotateY(0deg) rotate(25deg)",
        "background-image": cardF,
        "background-position": "center",
        "background-repeat": "noRepeat",
        "background-size": "cover",
      },
      "74%": {
        transform: "rotateY(89deg) rotate(25deg)",
        "background-image": cardF,
        "background-position": "center",
        "background-repeat": "noRepeat",
        "background-size": "cover",
      },
      "75%": {
        transform: "rotateY(89deg) rotate(25deg)",
        "background-image": cardB,
        "background-position": "center",
        "background-repeat": "noRepeat",
        "background-size": "cover",
      },
      "100%": {
        transform: "rotateY(1deg) rotate(25deg)",
        "background-image": cardB,
        "background-position": "center",
        "background-repeat": "noRepeat",
        "background-size": "cover",
      },
    });
  }

  function spin() {
    $(".card").playKeyframe({
      name: "spin",
      duration: "4s",
      timingFunction: "linear",
      delay: "0s",
      iterationCount: "infinite",
      direction: "normal",
      fillMode: "forwards",
      complete: function () {},
    });
  }

  $(".tab-btn li img").click(function (e) {
    var etarget = e.target.src;
    var etargetB = etarget.replace("f.png", "b.png");

    cardB = `url("${etarget}");`;
    cardF = `url("${etargetB}");`;
    console.log(cardF);
    console.log(cardB);

    // return cardB, cardF;
    keyframeAct();
    $(".card").resumeKeyframe();
    spin();
  });

  // 끝
});
