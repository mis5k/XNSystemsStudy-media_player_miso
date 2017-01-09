interface Media {
    name: string;
    play():void;
}

interface Volume {
   volume:number;
   mute?:boolean;
   readonly maxVolume:number;
   readonly minVolume:number;
   setVolume(volume:number):void;
   setMute?(mute:boolean):void;
}

interface Control {  
    forward():void;
    rewind():void;
    pause():void;
}

class Music implements Media, Volume {
    name:string;
    volume:number = 10;
    maxVolume = 40;
    minVolume = 0;
    mute:boolean = false;
    constructor(name:string) {
        this.name = name;
    }
    play() {
        console.log("음악이 실행되었습니다.");
    }
    setVolume(volume:number) {
        if(volume > this.maxVolume) {
            this.volume = this.maxVolume;  
        } else if(volume < this.minVolume){
            this.volume = this.minVolume;
        } else {
            this.volume = volume; 
        }
        console.log("음악 볼륨 설정 : " + volume);
    }
}

class Video implements Media, Volume {
    name:string;
    volume:number = 20;
    maxVolume = 50;
    minVolume = 0;
    mute:boolean = false;
    constructor(name:string) {
        this.name = name;
    } 
    play() {
        console.log("동영상이 실행되었습니다.");
    }
    setVolume(volume:number) {
        if(volume > this.maxVolume) {
            this.volume = this.maxVolume;  
        } else if(volume < this.minVolume){
            this.volume = this.minVolume;
        } else {
            this.volume = volume; 
        }
        console.log("동영상 볼륨 설정 : " + volume);
    }
    setMute(mute:boolean):void {
        this.mute = mute;
        if(mute) {
            console.log("무음처리 합니다.");
        } else {
            console.log("무음 해제 합니다.");   
        }
    }
}

class Image1 implements Media {
    name:string;
    zoomCnt:number = 5;
    readonly maxZoomCnt = 10;
    readonly minZoomCnt = 0;
    constructor(name:string) {
    } 
    play() {
        console.log("이미지가 실행되었습니다.");
    }
    setZoom(zoom:boolean):void {
        if(zoom && (this.zoomCnt < this.maxZoomCnt)) {  
            this.zoomCnt++;
            console.log("확대합니다(zoomCnt : " + this.zoomCnt + ")");
        } else if(!zoom && (this.zoomCnt > this.minZoomCnt)) {
            this.zoomCnt--;
            console.log("축소합니다(zoomCnt : " + this.zoomCnt + ")");
        }
    }
}

class File1 {
   name: string;
   format:string;
   size:number;
   date:Date;
   constructor(name:string, format:string, size:number) {
       this.name = name;
       this.format = format;
       this.size = size;
       this.date = new Date();
   } 
}

function openFile(file:File1):any {
    if(file.format == 'mp3' || file.format == 'wmv') {
        return new Music(file.name);
    } else if(file.format == 'mp4' || file.format == 'mkv') {
        return new Video(file.name);
    } else if(file.format == 'jpg' || file.format == 'png') {
        return new Image1(file.name);
    }
}


let a = new File1("a", "mp3", 100);
let b = new File1("b", "mkv", 300);
let c = new File1("c", "png", 200);



let opendfile = openFile(a);
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