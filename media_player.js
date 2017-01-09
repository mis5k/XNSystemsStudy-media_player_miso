var Music = (function () {
    function Music(name) {
        this.volume = 10;
        this.maxVolume = 40;
        this.minVolume = 0;
        this.mute = false;
        this.name = name;
    }
    Music.prototype.play = function () {
        console.log("음악이 실행되었습니다.");
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
}());
var Video = (function () {
    function Video(name) {
        this.volume = 20;
        this.maxVolume = 50;
        this.minVolume = 0;
        this.mute = false;
        this.name = name;
    }
    Video.prototype.play = function () {
        console.log("동영상이 실행되었습니다.");
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
            console.log("무음처리 합니다.");
        }
        else {
            console.log("무음 해제 합니다.");
        }
    };
    return Video;
}());
var Image1 = (function () {
    function Image1(name) {
        this.zoomCnt = 5;
        this.maxZoomCnt = 10;
        this.minZoomCnt = 0;
    }
    Image1.prototype.play = function () {
        console.log("이미지가 실행되었습니다.");
    };
    Image1.prototype.setZoom = function (zoom) {
        if (zoom && (this.zoomCnt < this.maxZoomCnt)) {
            this.zoomCnt++;
            console.log("확대합니다(zoomCnt : " + this.zoomCnt + ")");
        }
        else if (!zoom && (this.zoomCnt > this.minZoomCnt)) {
            this.zoomCnt--;
            console.log("축소합니다(zoomCnt : " + this.zoomCnt + ")");
        }
    };
    return Image1;
}());
var File1 = (function () {
    function File1(name, format, size) {
        this.name = name;
        this.format = format;
        this.size = size;
        this.date = new Date();
    }
    return File1;
}());
function openFile(file) {
    if (file.format == 'mp3' || file.format == 'wmv') {
        return new Music(file.name);
    }
    else if (file.format == 'mp4' || file.format == 'mkv') {
        return new Video(file.name);
    }
    else if (file.format == 'jpg' || file.format == 'png') {
        return new Image1(file.name);
    }
}
var a = new File1("a", "mp3", 100);
var b = new File1("b", "mkv", 300);
var c = new File1("c", "png", 200);
var opendfile = openFile(a);
opendfile.play();
opendfile.setVolume(20);
opendfile = openFile(b);
opendfile.play();
opendfile.setMute(true);
opendfile = openFile(c);
opendfile.play();
opendfile.setZoom(true);
/*
플러그인 구조로 된 것을 클래스로 만들어 볼 수도 있습니다.
다양한 형식의 미디어 파일을 재생하는 재생기.
미디어 <- 음악 <- mp3
미디어 <- 음악 <- wmv
미디어 <- 동영상 <- mp4
미디어 <- 동영상 <- mkv
미디어 <- 이미지 <- jpeg
미디어 <- 이미지 <- png
...
공통으로 play(), name같은 속성이 있고,
유형별로 seek(), volume 등의 속성이 있겠네요.
실제 동작은 로그로 대체하면 됩니다.
*/ 
