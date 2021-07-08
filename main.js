const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8-PLAYER'

const playlist = $('.playlist')
const cd = $('.cd')
const cdWidth = cd.offsetWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')

const app = {
    currenIdx : 0,
    isPlaying: false,
    isRandom: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name : 'Đường Tôi Chở Em Về',
            singer : 'BUITRUONGLINH',
            path : './asset/music/duongtoichoemve.mp3',
            image : './asset/img/duongtoichoemve.png'
        },
        {
            name : 'Muộn Rồi Mà Sao Còn',
            singer : 'Sơn Tùng - MTP',
            path : './asset/music/muonroimasaocon.mp3',
            image : './asset/img/muonroimasaocon.png'
        },
        {
            name : 'Nevada',
            singer : 'Vicetone',
            path : './asset/music/nevada.mp3',
            image : './asset/img/nevada.png'
        },
        {
            name : 'Sài Gòn Đau Lòng Quá',
            singer : 'Hứa Kim Tuyền - Hoàng Duyên',
            path : './asset/music/saigondaulongqua.mp3',
            image : './asset/img/saigondaulongqua.png'
        },
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        },
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        ,
        {
            name : 'Sài Gòn Hôm Nay Mưa',
            singer : 'Jsol - Hoàng Duyên',
            path : './asset/music/saigonhomnaymua.mp3',
            image : './asset/img/saigonhomnaymua.png'
        }
        
    ],
    setConfig: function(key,value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, this.config)
    },

    render: function(){
        const htmls = this.songs.map((song,idx) => {
            return `
                <div data-index="${idx}" class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div> 
                `
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperties : function(){
        Object.defineProperty(this, 'currenSong',{
            get: function(){
                return this.songs[this.currenIdx]
            }
        })
    },

    handleEvents: function(){
        const _this = this

        // Xử lý CD quay
        const cdThumbAnimate = cdThumb.animate([
            { transform : 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to thu nhỏ cái CD
        document.onscroll = function(){
           const scrollTop = window.scrollY ||  document.documentElement.scrollTop
           const newCdWidth = cdWidth - scrollTop
           
           cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 // Kéo thanh scroll làm CD mất dần
           cd.style.opacity = newCdWidth / cdWidth // Làm mở CD
        }

        // Xử lý khi click PlayBtn
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
                
                
            }else{ 
                audio.play();               
            }
        }

        // Khi play bài hát
        audio.onplay = function(){
            player.classList.add('playing')
            cdThumbAnimate.play()
            _this.isPlaying = true
        }

        // Khi pause bài hát
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
            progress.value = progressPercent
        }

        // Xử lí khi tua bài hát
        progress.oninput = function(e){
            const seekTime = (audio.duration / 100 * e.target.value)
            audio.currentTime = seekTime
        }

        // Xử lý khi next bài hát
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandom()
                audio.play()
            }else{
                _this.nextSong()
                audio.play()
            }
            _this.scrollToActiveSong()
        }

        // Xử lý khi prev bài hát
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandom()
                audio.play()
            }else{
                _this.prevSong()
                audio.play()
            }
            _this.scrollToActiveSong()
        }

        // Xử lý khi random bài hát
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lý nextSong khi kết thúc bài hát
        audio.onended = function(){
            nextBtn.click()
        }

        // Xử lý khi click vào 1 bài hát
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if( songNode|| e.target.closest('.option')){
                // Xử lý khi click vào song
                if(songNode){
                    _this.currenIdx = songNode.getAttribute('data-index')
                    _this.loadCurrentSong()
                    audio.play()
                }
                // Xử lý khi click vào option
               if(e.target.closest('.option')){
                   console.log(123)
               }
            }
            
        }
    },

    loadCurrentSong: function(){
        heading.textContent = this.currenSong.name
        cdThumb.style.backgroundImage = `url('${this.currenSong.image}')`
        audio.src = this.currenSong.path

        if($('.song.active')){
            $('.song.active').classList.remove('active')
        }
        const songList = $$('.song')
        songList.forEach((song) => {
            if(song.getAttribute('data-index') == this.currenIdx){
                song.classList.add('active')
            }
        })
    },

    scrollToActiveSong : function(){
        setTimeout(() => {
           if(this.currenIdx <= 3){
                $('.song.active').scrollIntoView(
                    {
                        behavior: 'smooth',
                        block: 'center',
                    }
                )
           }else{
                $('.song.active').scrollIntoView(
                    {
                        behavior: 'smooth',
                        block: 'center',
                    }
                )
           }
        },500)
    },

    nextSong: function(){
        this.currenIdx++
        if(this.currenIdx >= this.songs.length ){
            this.currenIdx = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currenIdx--
        if(this.currenIdx < 0){
            this.currenIdx = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandom: function(){
        let newCurrentIdx
        do {
            newCurrentIdx = Math.floor(Math.random() * this.songs.length)  
        }while(newCurrentIdx === this.currenIdx)
        this.currenIdx = newCurrentIdx
        this.loadCurrentSong()
    },

    start: function(){
        // Định nghĩa các thuộc tính Obj
        this.defineProperties();
        // Lắng nghe các sự kiện (DOM EVENT)
        this.handleEvents();
        // Render lại playlist
        this.render();
        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
    }  
    
}

app.start();

