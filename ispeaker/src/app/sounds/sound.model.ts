import { ListenAndRecordComponent } from './listen-and-record/listen-and-record.component';
import { SoundDetailsComponent } from './sound-details/sound-details.component';

export class ListenAndRecord {
    rubric: string;
    questions: Array<{ word: string, audio: string, recordedAudio: Blob, isRecording: boolean, isPlaying: boolean }> = [];
}
export class PractiseQuestion {
    ques: string;
    transcription: string;
    options: Array<{
        correct: boolean;
        audio: string;
        userAnswer: boolean;
    }>;
}
export class Practise {
    score: number;
    set: string;
    rubric: string;
    questions: Array<PractiseQuestion> = [];
}
export class SoundDetails {
    videoLink: string;
    // tslint:disable-next-line:variable-name
    listen_and_record: ListenAndRecord = new ListenAndRecord();
    practice: Array<Practise> = [];
    currentSet: number;
    review: boolean;
}
export class Sound {
    phoneme: string;
    name: string;
    BrE: SoundDetails = new SoundDetails();
    AmE: SoundDetails = new SoundDetails();
}

export class SoundData {
    sounds: Array<Sound> = [];
}
