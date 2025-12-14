if (!window.aplayerOnce) {
    window.aplayerOnce = true;

    const ap = new APlayer({
        container: document.getElementById('global-player'),
        fixed: true,
        autoplay: false,
        audio: [
            {
                name: 'さくら、もゆ。-title arrange',
                artist: '忍',
                url: '/music/さくら、もゆ。-title arrange.ogg',
                cover: '/music/樱花萌放.webp'
            },
            {
                name: '永遠を願うとき',
                artist: '松本文紀',
                url: '/music/永遠を願うとき.ogg',
                cover: '/music/向日库教会.webp'
            },
            {
                name: '舞い上がる因果交流のひかり',
                artist: '松本文紀',
                url: '/music/舞い上がる因果交流のひかり.ogg',
                cover: '/music/樱之诗.webp'
            }
        ]
    });
}
