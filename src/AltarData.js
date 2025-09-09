export class AltarData {
  constructor(total = 0, current = 0, pixQrCodeImage = '') {
    this.total = total;
    this.current = current;
    this.pixQrCodeImage = pixQrCodeImage;
  }

  /**
   * Creates an AltarData instance from a JSON object
   * @param {Object} jsonData - The JSON data object
   * @returns {AltarData} - New AltarData instance
   */
  static fromJson(jsonData) {
    return new AltarData(
      jsonData.total || 0,
      jsonData.current || 0,
      jsonData.pixQrCodeImage || ''
    );
  }

  /**
   * Calculates the percentage of the current amount relative to the total
   * @returns {number} - Percentage (0-100)
   */
  getPercentage() {
    if (this.total === 0) return 0;
    return Number(((this.current / this.total) * 100).toFixed(2));
  }

  /**
   * Calculates the remaining amount needed to reach the total
   * @returns {number} - Remaining amount
   */
  getRemaining() {
    return Math.max(0, this.total - this.current);
  }

  /**
   * Checks if the goal has been reached
   * @returns {boolean} - True if current >= total
   */
  isGoalReached() {
    return this.current >= this.total;
  }

  /**
   * Formats the current amount for display
   * @returns {string} - Formatted current amount
   */
  getFormattedCurrent() {
    return this.current.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * Formats the total amount for display
   * @returns {string} - Formatted total amount
   */
  getFormattedTotal() {
    return this.total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * Formats the remaining amount for display
   * @returns {string} - Formatted remaining amount
   */
  getFormattedRemaining() {
    return this.getRemaining().toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * Converts the instance back to a plain object
   * @returns {Object} - Plain object representation
   */
  toJson() {
    return {
      total: this.total,
      current: this.current,
      pixQrCodeImage: this.pixQrCodeImage
    };
  }
}
