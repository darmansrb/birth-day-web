// Web Audio API Synthesizer for retro neobrutal sound effects & tune

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentTuneTimeout: number | null = null;
  private isPlayingTune: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingTune) {
      this.stopTune();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio fallback silent
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const start = this.ctx.currentTime + i * 0.08;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {
      // Audio fallback silent
    }
  }

  public playBlowCandle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Noise buffer for blow wind sound
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      const now = this.ctx.currentTime;
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(200, now + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.5);
    } catch {
      // Audio fallback
    }
  }

  public playHappyBirthdayTune(onEnded?: () => void) {
    if (this.isMuted) return;
    this.stopTune();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlayingTune = true;

    // Happy Birthday notes (frequency in Hz and duration in beats)
    // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
    const notes: { note: number; duration: number }[] = [
      { note: 261.63, duration: 0.3 }, // Hap-
      { note: 261.63, duration: 0.3 }, // py
      { note: 293.66, duration: 0.6 }, // Birth-
      { note: 261.63, duration: 0.6 }, // day
      { note: 349.23, duration: 0.6 }, // to
      { note: 329.63, duration: 1.0 }, // you

      { note: 261.63, duration: 0.3 }, // Hap-
      { note: 261.63, duration: 0.3 }, // py
      { note: 293.66, duration: 0.6 }, // Birth-
      { note: 261.63, duration: 0.6 }, // day
      { note: 392.00, duration: 0.6 }, // to
      { note: 349.23, duration: 1.0 }, // you

      { note: 261.63, duration: 0.3 }, // Hap-
      { note: 261.63, duration: 0.3 }, // py
      { note: 523.25, duration: 0.6 }, // Birth-
      { note: 440.00, duration: 0.6 }, // day
      { note: 349.23, duration: 0.6 }, // dear
      { note: 329.63, duration: 0.6 }, // E-
      { note: 293.66, duration: 0.8 }, // tin!

      { note: 466.16, duration: 0.3 }, // Hap-
      { note: 466.16, duration: 0.3 }, // py
      { note: 440.00, duration: 0.6 }, // Birth-
      { note: 349.23, duration: 0.6 }, // day
      { note: 392.00, duration: 0.6 }, // to
      { note: 349.23, duration: 1.2 }  // you!
    ];

    let startTime = this.ctx.currentTime + 0.1;
    const tempo = 0.45; // seconds per beat multiplier

    notes.forEach((item) => {
      if (!this.ctx || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square'; // chiptune / retro neobrutal sound
      osc.frequency.setValueAtTime(item.note, startTime);

      const dur = item.duration * tempo;
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur - 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur);

      startTime += dur;
    });

    const totalDuration = (startTime - this.ctx.currentTime) * 1000;
    this.currentTuneTimeout = window.setTimeout(() => {
      this.isPlayingTune = false;
      if (onEnded) onEnded();
    }, totalDuration);
  }

  public stopTune() {
    this.isPlayingTune = false;
    if (this.currentTuneTimeout) {
      clearTimeout(this.currentTuneTimeout);
      this.currentTuneTimeout = null;
    }
  }

  public getIsPlayingTune() {
    return this.isPlayingTune;
  }
}

export const sound = new SoundManager();
