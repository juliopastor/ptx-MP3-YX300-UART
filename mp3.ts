/**
 * Bloques de control del reproductor MP3 basado en el YX300 con comunicación por UART
 */


/**
 * Bloques personalizados
 */
//% weight=100 color=#0fbc11 icon=""
namespace MP3 {

    /**
    * Inicializa el reproductor MP3 con tx=P0, rx=P1 y 9600 baudios
    */
    //% block="Inicializa MP3"
    export function initMp3(): void {
        let command: number[] = [0x7E, 0xFF, 0x06, 0x09, 0x00, 0x00, 0x02, 0xEF];
        let bufr = pins.createBuffer(command.length);

        for (let index = 0; index < command.length; index++) {
            bufr[index] = command[index];
        }
        serial.writeBuffer(bufr);
        return;
    }

    /**
     * Inicializa el reproductor MP3 incluyendo puerto serie tx:%tx y rx:%rx y a 9600 baudios
     * @param tx eg: SerialPin.P0 
     * @param rx eg: SerialPin.P1
     *
     */
    //% blockId=mp3_init
    //% block="Inicializa MP3 con tx=$tx y rx=$rx y 9600 baudios"
    export function init2Mp3(tx: SerialPin, rx: SerialPin): void {
        let command: number[] = [0x7E, 0xFF, 0x06, 0x09, 0x00, 0x00, 0x02, 0xEF];
        let bufr = pins.createBuffer(command.length);
        serial.redirect(
            tx,
            rx,
            BaudRate.BaudRate9600
        )
        for (let index = 0; index < command.length; index++) {
            bufr[index] = command[index];
        }
        serial.writeBuffer(bufr);
        return;
    }

    /**
    * Reproduce una canción concreta de un directorio concreto
     * @param song eg: 1
     * @param dir eg: 1
    */
    //% block="Reproduce la canción $song del directorio $dir"
    //% song.min=1 song.max= 255 song.defl=1
    //% song.min=1 song.max= 255 song.defl=1
    export function paySongDir(song: number, dir: number): void {
        let command: number[] = [0x7E, 0xFF, 0x06, 0x0F, 0x00, 0x00, 0x00, 0xEF];
        let bufr = pins.createBuffer(command.length);
        command[5] = dir;
        command[6] = song;
        for (let index = 0; index < command.length; index++) {
            bufr[index] = command[index];
        }
        serial.writeBuffer(bufr);
        return;
    }

    /**
       * Selecciona el volumen
        * @param volume eg: 30
       */
    //% block="Selecciona el volumen a $volume"
    //% volume.min=1 v.volume= 255 x.volume=1
    export function setVolume(volume: number): void {
        let command: number[] = [0x7E, 0xFF, 0x06, 0x06, 0x00, 0x00, 0x00, 0xEF];
        let bufr = pins.createBuffer(command.length);
        command[6] = volume;
        for (let index = 0; index < command.length; index++) {
            bufr[index] = command[index];
        }
        serial.writeBuffer(bufr);
        return;
    }

    /**
    * Sube el volumen
    */
    //% block="Sube el volumen"
    export function upVolume(): void {
        let command: number[] = [0x7E, 0xFF, 0x06, 0x04, 0x00, 0x00, 0x00, 0xEF];
        let bufr = pins.createBuffer(command.length);
        for (let index = 0; index < command.length; index++) {
            bufr[index] = command[index];
        }
        serial.writeBuffer(bufr);
        return;
    }

    /**
         * Sube el volumen
         */
    //% block="Sube el volumen"
    export function downVolume(): void {
        let command: number[] = [0x7E, 0xFF, 0x06, 0x05, 0x00, 0x00, 0x00, 0xEF];
        let bufr = pins.createBuffer(command.length);
        for (let index = 0; index < command.length; index++) {
            bufr[index] = command[index];
        }
        serial.writeBuffer(bufr);
        return;
    }

    /**
    * Crea un buffer para tranmitir núúmero en binario por el puerto serie
    * @param value describa el valor aquí, eg: 5
    */
    //% block
    //% advanced=true
    export function creaBuffer(value: number[]): Buffer {
        let bufr = pins.createBuffer(value.length);

        for (let index = 0; index < value.length; index++) {
            bufr[index] = value[index];
        }
        return bufr;
        // Add code here
    }
}
