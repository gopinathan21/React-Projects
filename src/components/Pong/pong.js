import React, { useEffect } from "react";
import "./Pong.css";

const Pong = () => {
  const boxWidth = 400;
  const boxHeight = 400;
  const leftPaddleWidth = 50;
  let leftPaddleX = 0;

  const onMouse = (event) => {
    const box = document.getElementById("box");
    const boxRect = box.getBoundingClientRect();
  
    const mouseX = event.clientX - boxRect.left; // Adjust for box's position
    leftPaddleX = mouseX - leftPaddleWidth / 2; // Center the paddle under the cursor
  
    if (leftPaddleX < 0) {
      leftPaddleX = 0;
    }
  
    if (leftPaddleX + leftPaddleWidth > boxWidth) {
      leftPaddleX = boxWidth - leftPaddleWidth;
    }
  
    const leftPaddle = document.getElementById("leftPaddle");
    leftPaddle.style.left = leftPaddleX + "px";
  };
  

  useEffect(() => {
    const box = document.getElementById("box");

    class Ball {
      constructor(parent, startSpeedY, startSpeedX) {
        this.element = document.createElement("div");
        this.element.className = "ball";
        parent.appendChild(this.element);
        this.x = 200;
        this.y = 200;
        this.speedX = startSpeedX;
        this.speedY = startSpeedY;
        this.size = 20;
        this.animate = this.animate.bind(this);
        this.animationFrameID = null;
      }

      animate() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.speedX += 0.001;
        this.speedY += 0.001;

        if (this.x + this.size > boxWidth || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y < 0) {
          this.speedY = -this.speedY;
        }
        if (this.y + this.size > boxHeight) {
          balls.forEach((ball) => ball.cancelAnimation());
          this.cancelAnimation();
          alert("You lose");
          return;
        }

        const ballXP = this.x ;
        const ballYP = this.y + this.size;

        const paddleTopCollision = ballYP > boxHeight - leftPaddleWidth;
        const paddleSideCollision =
          ballXP >= leftPaddleX && ballXP <= leftPaddleX + leftPaddleWidth;

        if (paddleTopCollision && paddleSideCollision) {
          this.speedY = -this.speedY;
        }

        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
        this.animationFrameID = requestAnimationFrame(this.animate.bind(this));
      }

      cancelAnimation() {
        cancelAnimationFrame(this.animationFrameID);
      }
    }

    const balls = [new Ball(box, -1, 2), new Ball(box, -2, 1), new Ball(box, 2, -2)];
    balls.forEach((ball) => ball.animate());
  }, []);

  return (
    <div className="pong">
      <div id="box" onMouseMove={onMouse}>
        <div id="leftPaddle"></div>
      </div>
    </div>
  );
};

export default Pong;
