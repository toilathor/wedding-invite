import {
  WeddingData,
  BannerData,
  InvitationData,
  IntroData,
  StoryData,
  TimelineData,
  WeddingEventItem,
  AlbumData,
  GuestMessage,
  BankData,
} from "../models/wedding-data.model";

export const WEDDING_DATA: WeddingData = {
  audioUrl: "/assets/music/Hon-Ca-Yeu-Duc-Phuc.mp3",
  audioUrls: [
    "/assets/music/Hon-Ca-Yeu-Duc-Phuc.mp3",
    "/assets/music/wedding-song.mp3",
  ],
  banner: <BannerData>{
    groom: "Quang Thọ",
    bride: "Thúy Hiền",
    title: "Chúng MÌNH cưới",
    day: "28",
    month: "11",
    year: "2026",
    image1: "/assets/images/couple/banner_left.webp",
    image2: "/assets/images/couple/banner_right.webp",
    imageDecorLeft: "/assets/images/templates/sangtrong/7.png",
    imageDecorRight: "/assets/images/templates/sangtrong/img/04.png",
  },

  invitation: <InvitationData>{
    time: "10:30, Thứ Bảy",
    day: "28",
    month: "11",
    year: "2026",
    location: "Mỹ Lược, Mỹ Hòa, Thu Bồn, Đà Nẵng",
    subDescription: "Sự hiện diện của bạn là niềm vinh dự của chúng mình!",
    descriptionHtml:
      "Hành trình yêu thương của chúng mình sẽ càng ý nghĩa hơn khi có sự chứng kiến và chúc phúc từ những người thân yêu.<br>Cảm ơn bạn đã dành thời gian để cùng chúng mình lưu giữ khoảnh khắc đặc biệt này. 💍✨",
    countdownDate: "2026-11-28T03:30:00.000Z", // 10:30 UTC+7 (28/11/2026)
  },

  introduction: <IntroData>{
    title: "Và.. Ngày ấy đã tới",
    nameGroom: "Quang Thọ",
    nameBride: "Thúy Hiền",
    imageGroom: "/assets/images/couple/groom.webp",
    imageBride: "/assets/images/couple/bride.webp",
    contentGroom:
      "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
    contentBride:
      "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    description:
      "Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt - Ngày cưới của chúng mình . Chúng mình muốn gửi đến bạn những lời cảm ơn sâu sắc nhất và để bạn biết rằng chúng mình rất hạnh phúc khi thấy bạn ở đó. Cảm ơn các bạn rất nhiều vì sự hiện diện cùng những lời chúc tốt đẹp mà bạn đã dành cho chúng mình nha!",
  },

  story: <StoryData>{
    title: "Chuyện chúng mình",
    contentHtml:
      "Mỗi câu chuyện tình yêu đều có một khởi đầu riêng. Hành trình của chúng mình được viết nên từ những lần gặp gỡ, những nụ cười, sự đồng hành và những quyết định quan trọng của cuộc đời. Mời bạn cùng nhìn lại những cột mốc đáng nhớ trên chặng đường yêu thương ấy. ❤️",
    image: "/assets/images/couple/story.webp",
  },

  timeline: <TimelineData>{
    mainTitle: "Cột mốc",
    milestone: [
      {
        day: "27",
        month: "02",
        year: "2023",
        title: "Lần đầu gặp nhau",
        content:
          "Một cuộc gặp gỡ tình cờ, mở đầu cho hành trình yêu thương kéo dài đến hôm nay. Không ai ngờ rằng khoảnh khắc ấy lại trở thành điểm khởi đầu cho câu chuyện hạnh phúc của chúng mình.",
        picture: "/assets/images/couple/timeline_1.webp",
        imagePosition: "50% 20%",
      },
      {
        day: "14",
        month: "02",
        year: "2024",
        title: "Cầu hôn",
        content:
          "Một chiếc nhẫn, một lời ngỏ và một câu trả lời đồng ý. Từ khoảnh khắc ấy, chúng mình quyết định cùng nhau bước tiếp trên hành trình trọn đời.",
        picture: "/assets/images/couple/timeline_2.webp",
        imagePosition: "50% 22%",
      },
      {
        day: "22",
        month: "03",
        year: "2025",
        title: "Dạm ngõ",
        content:
          "Ngày hai gia đình chính thức gặp gỡ và cùng chia sẻ niềm vui về chuyện trăm năm. Đây là cột mốc ý nghĩa, đánh dấu sự gắn kết và chúc phúc cho hành trình của chúng mình.",
        picture: "/assets/images/couple/timeline_3.webp",
        imagePosition: "50% 18%",
      },
    ],
  },

  events: <WeddingEventItem[]>[
    {
      title: "Lễ nhà gái",
      dateTime: "2026-11-28T07:00:00",
      displayTime: "07:00",
      displayDate: "28 . 11 . 2026",
      address: "La Tháp, Thu Bồn, Đà Nẵng",
      link: "https://www.google.com/maps?q=15.8337222,108.1531111",
      icon: "/assets/images/templates/sangtrong/eventIcon1.png",
    },
    {
      title: "LỄ NHÀ TRAI",
      dateTime: "2026-11-28T09:00:00",
      displayTime: "09:00",
      displayDate: "28 . 11 . 2026",
      address: "Mỹ Hòa, Thu Bồn, Đà Nẵng",
      link: "https://www.google.com/maps?q=15.8336667,108.1063056",
      icon: "/assets/images/templates/sangtrong/eventIcon2.png",
    },
    {
      title: "Tiệc cưới",
      dateTime: "2026-11-28T10:30:00",
      displayTime: "10:30",
      displayDate: "28 . 11 . 2026",
      address: "Mỹ Hòa, Thu Bồn, Đà Nẵng",
      link: "https://www.google.com/maps?q=15.8343889,108.1074444",
      icon: "/assets/images/templates/sangtrong/eventIcon3.png",
    },
  ],

  album: <AlbumData>{
    title: "Album ảnh cưới",
    albums: [
      "/assets/images/gallery/album_1.webp",
      "/assets/images/gallery/album_2.webp",
      "/assets/images/gallery/album_3.webp",
      "/assets/images/gallery/album_4.webp",
      "/assets/images/gallery/album_5.webp",
      "/assets/images/gallery/album_6.webp",
      "/assets/images/gallery/album_7.webp",
      "/assets/images/gallery/album_8.webp",
      "/assets/images/gallery/album_9.webp",
      "/assets/images/gallery/album_10.webp",
    ],
  },

  messages: <GuestMessage[]>[],

  bank: <BankData>{
    nameGroom: "Lê Quang Thọ",
    bankNameGroom: "Techcombank",
    bankNumberGroom: "19033854950017",
    imageBankGroom: "/assets/images/bank/qr_groom.webp",
    nameBride: "Nguyễn Thúy Hiền",
    bankNameBride: "Vietcombank",
    bankNumberBride: "1014888383",
    imageBankBride: "/assets/images/bank/qr_bride.webp",
    description:
      "Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!",
    coverImage: "/assets/images/couple/bank_cover.webp",
  },
};
