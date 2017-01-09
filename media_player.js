var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Media = (function () {
    function Media(name) {
        this.name = name;
    }
    Media.prototype.play = function () {
        console.log("실행되었습니다.");
    };
    ;
    Media.prototype.stop = function () {
        console.log("중단되었습니다.");
    };
    ;
    return Media;
}());
var Music = (function (_super) {
    __extends(Music, _super);
    function Music(name) {
        var _this = _super.call(this, name) || this;
        _this.volume = 10;
        _this.maxVolume = 40;
        _this.minVolume = 0;
        _this.mute = false;
        return _this;
    }
    Music.prototype.play = function () {
        console.log("음악이 실행되었습니다.");
    };
    Music.prototype.stop = function () {
        console.log("음악 실행을 중단합니다.");
    };
    Music.prototype.setVolume = function (volume) {
        if (volume > this.maxVolume) {
            this.volume = this.maxVolume;
        }
        else if (volume < this.minVolume) {
            this.volume = this.minVolume;
        }
        else {
            this.volume = volume;
        }
        console.log("음악 볼륨 설정 : " + volume);
    };
    return Music;
}(Media));
var Video = (function (_super) {
    __extends(Video, _super);
    function Video(name) {
        var _this = _super.call(this, name) || this;
        _this.volume = 20;
        _this.maxVolume = 50;
        _this.minVolume = 0;
        _this.mute = false;
        return _this;
    }
    Video.prototype.play = function () {
        console.log("동영상이 실행되었습니다.");
    };
    Video.prototype.stop = function () {
        console.log("동영상을 중단합니다.");
    };
    Video.prototype.setVolume = function (volume) {
        if (volume > this.maxVolume) {
            this.volume = this.maxVolume;
        }
        else if (volume < this.minVolume) {
            this.volume = this.minVolume;
        }
        else {
            this.volume = volume;
        }
        console.log("동영상 볼륨 설정 : " + volume);
    };
    Video.prototype.setMute = function (mute) {
        this.mute = mute;
        if (mute) {
            console.log("동영상을 무음처리 합니다.");
        }
        else {
            console.log("동영상을 무음 해제 합니다.");
        }
    };
    Video.prototype.setPixel = function (pixel) {
        this.pixel = pixel;
        console.log("동영상의 픽셀을 설정합니다");
    };
    Video.prototype.setSubtitles = function (subtitles) {
        this.subtitles = subtitles;
        if (subtitles) {
            console.log("동영상의 자막이 보입니다.");
        }
        else {
            console.log("동영상의 자막을 숨깁니다.");
        }
    };
    return Video;
}(Media));
var Image1 = (function (_super) {
    __extends(Image1, _super);
    function Image1(name) {
        var _this = _super.call(this, name) || this;
        _this.zoomCnt = 5;
        _this.maxZoomCnt = 10;
        _this.minZoomCnt = 0;
        return _this;
    }
    Image1.prototype.play = function () {
        console.log("이미지가 실행되었습니다.");
    };
    Image1.prototype.stop = function () {
    };
    Image1.prototype.setZoom = function (zoom) {
        if (zoom && (this.zoomCnt < this.maxZoomCnt)) {
            this.zoomCnt++;
            console.log("이미지를 확대합니다(zoomCnt : " + this.zoomCnt + ")");
        }
        else if (!zoom && (this.zoomCnt > this.minZoomCnt)) {
            this.zoomCnt--;
            console.log("이미지를 축소합니다(zoomCnt : " + this.zoomCnt + ")");
        }
    };
    return Image1;
}(Media));
var File1 = (function () {
    function File1(name, format, size) {
        this.name = name;
        this.format = format;
        this.size = size;
        this.date = new Date();
    }
    return File1;
}());
/*
function openFile(file) {
   if (file.format == 'mp3' || file.format == 'wmv') {
        return new Music(file.name);
   } else if (file.format == 'mp4' || file.format == 'mkv') {
        return new Video(file.name);
   } else if (file.format == 'jpg' || file.format == 'png') {
        return new Image1(file.name);
   }
}
*/
var global = {
    file: null,
    player: null,
    isMusic: false,
    isVideo: false,
    isImage: false,
    init: function () {
        this.file = null;
        this.player = null;
        this.isMusic = false;
        this.isVideo = false;
        this.isImage = false;
    },
    openFile: function (file) {
        this.init();
        this.file = file;
        this.checkFormat(file.format);
        if (this.isMusic) {
            this.player = new Music(file.name);
        }
        else if (this.isVideo) {
            this.player = new Video(file.name);
        }
        else if (this.isImage) {
            this.player = new Image1(file.name);
        }
    },
    checkFormat: function (format) {
        if (format == 'mp3' || format == 'wmv') {
            this.isMusic = true;
        }
        else if (format == 'mp4' || format == 'mkv') {
            this.isVideo = true;
        }
        else if (format == 'jpg' || format == 'png') {
            this.isImage = true;
        }
    }
};
var a = new File1("a", "mp3", 100);
var b = new File1("b", "mkv", 300);
var c = new File1("c", "png", 200);
//let list:File1[] = [a, b, b];
/*
let opendfile = openFile(a);
opendfile.play();
opendfile.setVolume(20);
opendfile = openFile(b);
opendfile.play();
opendfile.setMute(true);
opendfile = openFile(c);
opendfile.play();
opendfile.setZoom(true);
*/
global.openFile(a);
global.player.play();
global.player.setVolume(20);
global.openFile(b);
global.player.play();
global.player.setMute(true);
global.player = global.openFile(c);
global.player.play();
global.player.setZoom(true);
