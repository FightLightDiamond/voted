class Button {}
class IOSButton extends Button {}
class AndroidButton extends Button {}

/**
 * Gom nhóm khởi tạo
 */
export class ButtonFactory {
  create(os: string): Button {
    if (os == 'ios') return new IOSButton();
    return new AndroidButton();
  }
}
