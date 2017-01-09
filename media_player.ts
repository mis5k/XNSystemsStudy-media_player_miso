class Media {
    name: string;
    constructor(name:string) {
        this.name = name;
    }
    play():void {
        console.log("실행되었습니다.");
    };
    stop():void{
        console.log("중단되었습니다.");
    };
}

interface Volume {
   volume:number;
   mute?:boolean;
   readonly maxVolume:number;
   readonly minVolume:number;
   setVolume(volume:number):void;
   setMute?(mute:boolean):void;
}

/*
interface Control {  
    forward():void;
    rewind():void;
    pause():void;
}
*/

interface screen {
    pixel:number;
    subtitles:boolean;
    setPixel(pixel:number):void;
    setSubtitles(subtitles:boolean):void;
}

class Music extends Media implements Volume {
    name:string;
    volume:number = 10;
    maxVolume = 40;
    minVolume = 0;
    mute:boolean = false;
    constructor(name:string) {
        super(name);
    }
    play() {
        console.log("음악이 실행되었습니다.");
    }
    stop() {
        console.log("음악 실행을 중단합니다."); 
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

class Video extends Media implements Volume, screen {
    name:string;
    volume:number = 20;
    maxVolume = 50;
    minVolume = 0;
    mute:boolean = false;
    pixel:number;
    subtitles:boolean;
    constructor(name:string) {
        super(name);
    } 
    play() {
        console.log("동영상이 실행되었습니다.");
    }
    stop() {
        console.log("동영상을 중단합니다.");
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
    setMute(mute:boolean) {
        this.mute = mute;
        if(mute) {
            console.log("동영상을 무음처리 합니다.");
        } else {
            console.log("동영상을 무음 해제 합니다.");   
        }
    }
    setPixel(pixel:number) {
        this.pixel = pixel;
        console.log("동영상의 픽셀을 설정합니다");  
    }
    setSubtitles(subtitles){
        this.subtitles = subtitles
        if(subtitles) {
            console.log("동영상의 자막이 보입니다.");
        } else {
            console.log("동영상의 자막을 숨깁니다.");
        }
    }
}

class Image1 extends Media {
    name:string;
    zoomCnt:number = 5;
    readonly maxZoomCnt = 10;
    readonly minZoomCnt = 0;
    constructor(name:string) {
        super(name);
    } 
    play() {
        console.log("이미지가 실행되었습니다.");
    }
    stop() {
    }
    setZoom(zoom:boolean) {
        if(zoom && (this.zoomCnt < this.maxZoomCnt)) {  
            this.zoomCnt++;
            console.log("이미지를 확대합니다(zoomCnt : " + this.zoomCnt + ")");
        } else if(!zoom && (this.zoomCnt > this.minZoomCnt)) {
            this.zoomCnt--;
            console.log("이미지를 축소합니다(zoomCnt : " + this.zoomCnt + ")");
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

let global = {
    file:null,
    player:null,
    isMusic:false,
    isVideo:false,
    isImage:false,
    init: function():void {
        this.file = null;
        this.player = null;
        this.isMusic = false; 
        this.isVideo = false;
        this.isImage = false;
    },
    openFile: function(file:File1):void {
        this.init();
        this.file = file;
        this.checkFormat(file.format);

        if(this.isMusic) {
            this.player = new Music(file.name);
        } else if(this.isVideo) {
            this.player = new Video(file.name);
        } else if(this.isImage) {
            this.player = new Image1(file.name);
        }
    },
    checkFormat: function(format:string):void {
        if(format == 'mp3' || format == 'wmv') {
            this.isMusic = true;
        } else if(format == 'mp4' || format == 'mkv') {
            this.isVideo = true;
        } else if(format == 'jpg' || format == 'png') {
            this.isImage = true;
        } 
    }
}


let a:File1 = new File1("a", "mp3", 100);
let b:File1 = new File1("b", "mkv", 300);
let c:File1 = new File1("c", "png", 200);
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

//global.player = global.openFile(c);
//global.player.play();
//global.player.setZoom(true);
