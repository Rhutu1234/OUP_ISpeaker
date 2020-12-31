export class ConversationMenu {
    title: string;
    subHeading: Array<{ title: string, attempted: boolean, completed: boolean }>;
}

export class ConversationUserData {
    watchAndStudy: {
        study: any;
    };
    listen: {
        isPlaying: boolean;
        recordedAudio: any;
        isRecording: boolean;
    };
    practise: any;
    reviews: Array<{ checked: boolean; text: string; }>;
}
