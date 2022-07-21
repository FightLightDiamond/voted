import logger from './logger';

/**
 * Calories Tracker
 */
export class CaloriesTracker {
  maxCalories = 0;
  currentCalories = 0;

  /**
   * @param maxCalories
   */
  constructor(maxCalories) {
    this.maxCalories = maxCalories;
    this.currentCalories = 0;
  }

  /**
   * addCalories
   * @param calories
   */
  addCalories(calories: number) {
    this.currentCalories += calories;
  }

  /**
   * trackCalories
   */
  trackCalories() {
    if (this.currentCalories > this.maxCalories) {
      this.logCalorieSurplus();
    }
  }

  /**
   * logCalorieSurplus
   */
  logCalorieSurplus() {
    /**
     * Nghiệp vụ có thể sử dụng cho nhiều bên khác, tách ra file khác
     */
    logger('Max calories exceeded');
  }

  /**
   * @param calories
   */
  execute(calories: number) {
    this.addCalories(calories);
    this.trackCalories();
  }
}

const c = new CaloriesTracker(1000);
c.execute(500);
c.execute(500);
c.execute(200);
