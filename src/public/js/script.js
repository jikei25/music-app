const aplayer = document.querySelector('#aplayer');
if (aplayer) {
  const dataSong = JSON.parse(aplayer.getAttribute('data-song'));
  const dataSinger = JSON.parse(aplayer.getAttribute('data-singer'));
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
  });
  const avatar = document.querySelector('.singer-detail .inner-avatar');
  ap.on('play', function () {
    avatar.style.animationPlayState = 'running';
  });

  ap.on('pause', function () {
    avatar.style.animationPlayState = 'paused';
  });
}

const buttonLike = document.querySelector('[button-like]');
if (buttonLike) {
  buttonLike.addEventListener('click', () => {
    const id = buttonLike.getAttribute('button-like');
    let typeLike = '';

    if (buttonLike.classList.contains('active')) {
      buttonLike.classList.remove('active');
      typeLike = 'unlike';
    } else {
      buttonLike.classList.add('active');
      typeLike = 'like';
    }

    const dataLike = {
      id: id,
      typeLike: typeLike,
    };

    fetch('/songs/like', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLike),
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(data => {
        buttonLike.querySelector('span').innerHTML = data.like;
      });
  });
}

// Tính năng yêu thích
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if(listButtonFavorite.length > 0) {
  listButtonFavorite.forEach(buttonFavorite => {
    buttonFavorite.addEventListener("click", () => {
      const id = buttonFavorite.getAttribute("button-favorite");
  
      buttonFavorite.classList.toggle("active");
  
      fetch("/songs/favorite", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "success") {
            console.log("Đã thêm bài hát vào danh sách yêu thích");
          }
        })
    })
  })
}
// Hết Tính yêu thích