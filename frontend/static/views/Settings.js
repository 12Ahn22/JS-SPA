import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Settings');
  }

  async getHtml() {
    return `
      <h1>Welcome back, Settings</h1>
      <p> Dash Board!</p>
    `;
  }
}
