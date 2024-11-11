const aplayer = document.querySelector("#aplayer");

if (aplayer) {
  const song = JSON.parse(aplayer.getAttribute("data-song"));
  const singer = JSON.parse(aplayer.getAttribute("data-singer"));

  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: song.title,
        artist: singer.fullName,
        url: song.audio,
        cover: song.avatar,
      },
    ],
    autoplay: true,
  });
}
