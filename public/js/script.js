const aplayer = document.querySelector("#aplayer");

if (aplayer) {
  const song = JSON.parse(aplayer.getAttribute("data-song"));
  const singer = JSON.parse(aplayer.getAttribute("data-singer"));
  const songId = song._id;

  console.log(song);

  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: song.title,
        artist: singer.fullName,
        url: song.audio,
        cover: song.avatar,
        lrc: song.lyrics,
      },
    ],
    autoplay: true,
  });

  //Tính năng làm dừng xoay, xoay đĩa khi chạy hoặc dừng nhạc

  const innerAvatar = document.querySelector(".inner-avatar");

  innerAvatar.classList.add("paused");

  ap.on("play", () => {
    innerAvatar.classList.remove("paused");
  });

  ap.on("pause", () => {
    innerAvatar.classList.add("paused");
  });

  //Tăng lượt xem khi kết thúc bài hát
  ap.on("ended", async () => {
    try {
      const innerListen = document.querySelector(".inner-listen");
      if (innerListen) {
        const listenNum = innerListen.querySelector("span");
        const response = await axios.patch(`/songs/listen/${songId}`);
        const data = response.data;

        if (data.code === "success") {
          listenNum.innerHTML = data.listen;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//Tính năng like bài hát
const buttonLike = document.querySelector("[button-like]");

if (buttonLike) {
  buttonLike.addEventListener("click", async () => {
    const songId = buttonLike.getAttribute("button-like");
    const likeNumber = buttonLike.querySelector("span");

    let status = "";

    if (buttonLike.classList.contains("active")) {
      buttonLike.classList.remove("active");
      status = "dislike";
    } else {
      buttonLike.classList.add("active");
      status = "like";
    }

    const dataLike = {
      id: songId,
      status: status,
    };

    const response = await axios.patch("/songs/like", dataLike);
    const data = response.data;

    if (data.code === "success") {
      likeNumber.innerHTML = data.like;
    }
  });
}

//Tính năng yêu thích bài hát
const buttonFavorite = document.querySelectorAll("[button-favorite]");

if (buttonFavorite.length > 0) {
  for (const button of buttonFavorite) {
    button.addEventListener("click", async () => {
      const songId = button.getAttribute("button-favorite");

      button.classList.toggle("active");

      const dataFavorite = { id: songId };

      const response = await axios.patch("/songs/favorite", dataFavorite);
      const data = response.data;
    });
  }
}

//Tính năng hiển gợi ý trong lúc tìm kiếm
const buttonSearch = document.querySelector(".box-search");

if (buttonSearch) {
  const searchInput = buttonSearch.querySelector("input");

  if (searchInput) {
    searchInput.addEventListener("keyup", async () => {
      const currentSearch = searchInput.value;

      const response = await axios.get(
        `/songs/search/suggest?keyword=${currentSearch}`
      );

      if (response.status === 200) {
        const data = response.data;
        const innerSuggest = buttonSearch.querySelector(".inner-suggest");
        const innerList = buttonSearch.querySelector(".inner-list");
        const songs = data.songs;

        if (songs.length > 0 && searchInput.value.length > 0) {
          let songInfos = songs.map((item) => {
            return `
            <a class="inner-item" href="/songs/detail/${item.slug}"><div class="inner-image"><img src="${item.avatar}"></div><div class="inner-info"><div class="inner-title">${item.title}</div><div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${item.singerFullName}</div></div></a>`;
          });

          songInfos = songInfos.join("");

          innerSuggest.classList.add("show");
          innerList.innerHTML = songInfos;
        } else {
          if (innerSuggest.classList.contains("show")) {
            innerSuggest.classList.remove("show");
          }
          innerList.innerHTML = "";
        }
      }
    });
  }
}
