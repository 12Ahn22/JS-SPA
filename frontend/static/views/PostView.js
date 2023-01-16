import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Posts');
  }

  async getHtml() {
    console.log(this.params);
    return `
      <h1>Welcome back, Posts</h1>
      <p> Dash Board!</p>
    `;
  }
}
