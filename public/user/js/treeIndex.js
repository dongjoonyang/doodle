import { Tree } from './src/tree.js';

class treeIndex {
  constructor() {
    this.canvas = document.querySelector('#tree');

    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 1 : 1; /* 1 ? 2 : 1 */

    window.addEventListener('resize', this.resize.bind(this), false);
    window.addEventListener('click', this.click.bind(this), false);

    this.resize();
    //this.setBtn();
  }

    //   setBtn() {
    //     this.nightBtn = document.querySelector('.night');
    //     this.dayBtn = document.querySelector('.day');

    //     this.day = true;

    //     this.nightBtn.addEventListener(
    //       'click',
    //       this.nightBtnHandler.bind(this),
    //       false
    //     );
    //     this.dayBtn.addEventListener('click', this.dayBtnHandler.bind(this), false);
    //   }

  // nightBtnHandler() {
  //   this.resize();
  //   this.dayBtn.classList.add('show');
  //   this.nightBtn.classList.remove('show');
  //   document.body.classList.add('black');
  //   this.day = false;
  // }

  // dayBtnHandler() {
  //   this.resize();
  //   this.dayBtn.classList.remove('show');
  //   this.nightBtn.classList.add('show');
  //   document.body.classList.remove('black');
  //   this.day = true;
  // }

  resize() {
    const section01 =  document.querySelector(".section01");
    this.stageWidth = section01.clientWidth;
    this.stageHeight = section01.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // this.stageWidth = document.body.clientWidth;
    // this.stageHeight = document.body.clientHeight;

    // this.canvas.width = this.stageWidth * this.pixelRatio;
    // this.canvas.height = this.stageHeight * this.pixelRatio;
    // this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  }

  click(event) {
    const { clientX } = event;
    if (event.target.className !== 'material-icons')
      new Tree(this.ctx, clientX, this.stageHeight, this.day);
  }
}

window.onload = () => {
  new treeIndex();
};