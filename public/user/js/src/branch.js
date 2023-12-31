export class Branch {
    constructor(startX, startY, endX, endY, lineWidth, color) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.color = color;
      this.lineWidth = lineWidth;
  
      this.frame = 10;
      this.cntFrame = 0;
      this.gapX = (this.endX - this.startX) / this.frame;
      this.gapY = (this.endY - this.startY) / this.frame;
  
      this.currentX = this.startX;
      this.currentY = this.startY;
  
      this.setColor();
    }
  
    draw(ctx) {
      if (this.cntFrame === this.frame) return true;
  
      ctx.beginPath();
  
      this.currentX += this.gapX;
      this.currentY += this.gapY;
  
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.currentX, this.currentY);
  
      if (this.lineWidth < 3) {
        ctx.lineWidth = 0.5;
      } else if (this.lineWidth < 7) {
        ctx.lineWidth = this.lineWidth * 0.7;
      } else if (this.lineWidth < 10) {
        ctx.lineWidth = this.lineWidth * 0.9;
      } else {
        ctx.lineWidth = this.lineWidth;
      }
  
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
  
      ctx.stroke();
      ctx.closePath();
  
      this.cntFrame++;
  
      return false;
    }
  
    setColor() {
      if (this.color !== '#000000') {
        if (this.lineWidth >= 10) {
          this.color = '#FFFFFF';
        } else {
          let num = Math.floor((this.lineWidth / 10) * 15).toString(16);
          this.color = this.color.replace(/0/gi, num);
        }
      }
    }
  }