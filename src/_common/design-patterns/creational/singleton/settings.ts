export class Settings {
  static instance: Settings;

  public readonly mode = 'dark';

  private constructor() {}

  /**
   * Khởi tạo 1 lần duy nhất
   */
  static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }
}

const settings = Settings.getInstance();
console.log(settings.mode);
