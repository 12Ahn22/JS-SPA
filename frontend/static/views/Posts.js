import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Posts');
  }

  async getHtml() {
    return `
      <h1>Welcome back, Posts</h1>
      <p> Dash Board!</p>
    `;
  }
}
