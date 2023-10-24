/**
 * =======================================
 * section01 벛꽃 
 * =======================================
 */
(function () {
    const canvas = document.querySelector('#blossom');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const TOTAL = 70
    const petalArray = []

    const petalImg = new Image()
    petalImg.src = '/images/petal.png'
    petalImg.onload = () => {
    for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal())
    }
    render()
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petalArray.forEach(petal => {
            petal.animate();
        });

        window.requestAnimationFrame(render);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })

    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height * 2 - canvas.height
            this.w = 30 + Math.random() * 15
            this.h = 20 + Math.random() * 10
            this.opacity = this.w / 45
            this.xSpeed = 2 + Math.random()
            this.ySpeed = 1 + Math.random() * 0.5
            this.flip = Math.random()
            this.flipSpeed = Math.random() * 0.03
        }

        draw() {
            if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -petalImg.width
            this.y = Math.random() * canvas.height * 2 - canvas.height
            this.xSpeed = 2 + Math.random()
            this.ySpeed = 1 + Math.random() * 0.5
            this.flip = Math.random()
            }
            ctx.globalAlpha = this.opacity
            ctx.drawImage(
            petalImg,
            this.x,
            this.y,
            this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 3)),
            this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 2)),
            )
        }

        animate() {
            this.x += this.xSpeed
            this.y += this.ySpeed
            this.draw()
            this.flip += this.flipSpeed
        }
    }
})();

/**
 * =======================================
 * section01 움직이는 글자 
 * =======================================
 */
(function () {
    const pTag1 = document.querySelector('.first-parallel')
    const pTag2 = document.querySelector('.second-parallel')
    
    const textArr1 = 'Yummy Tasty Delicious Useful Coding Yummy Yummmmy Yummmmmmmmmy yum'.split(' ')
    const textArr2 = 'Chicken Hamburger Pizza Salad Sushi Bibimbab Gimbab JJajangmyeon'.split(' ')

    let count1 = 0
    let count2 = 0

    initTexts(pTag1, textArr1)
    initTexts(pTag2, textArr2)

    function initTexts(element, textArray) {
    textArray.push(...textArray)
        for (let i = 0; i < textArray.length; i++) {
            element.innerText += `${textArray[i]}\u00A0\u00A0\u00A0\u00A0`
        }
    }

    function marqueeText(count, element, direction) {
        if (count > element.scrollWidth / 2) {
            element.style.transform = `translate3d(0, 0, 0)`
            count = 0
        }
        element.style.transform = `translate3d(${direction * count}px, 0, 0)`

        return count
    }

    function animate() {
        count1++
        count2++

        count1 = marqueeText(count1, pTag1, -1)
        count2 = marqueeText(count2, pTag2, 1)

        window.requestAnimationFrame(animate)
    }

    function scrollHandler() {
        count1 += 15
        count2 += 15
    }

    window.addEventListener('scroll', scrollHandler)
    animate()
})();

/**
 * =======================================
 * section01 팔레트
 * =======================================
 */
(function () {
  const content1 = document.querySelector('.content1')
  const content2 = document.querySelector('.content2')
  const content3 = document.querySelector('.content3')
  const path1 = document.querySelector('.path2')
  const path2 = document.querySelector('.path3')
  const path3 = document.querySelector('.path4')
  const path1Length = path1.getTotalLength()
  const path2Length = path2.getTotalLength()
  const path3Length = path3.getTotalLength()
  path1.style.strokeDasharray  = path1Length + ' ' + path1Length
  path1.style.strokeDashoffset = calcDashoffset(window.innerHeight * 0.8, content1, path1Length)

  path2.style.strokeDasharray  = path2Length + ' ' + path2Length
  path2.style.strokeDashoffset = path2Length

  path3.style.strokeDasharray  = path3Length + ' ' + path3Length
  path3.style.strokeDashoffset = path3Length

  function calcDashoffset(scrollY, element, length) {
    const ratio = (scrollY - element.offsetTop) / element.offsetHeight
    const value = length - (length * ratio)
    return value < 0 ? 0 : value > length ? length : value
  }

  function scrollHandler() {
    const scrollY = window.scrollY + (window.innerHeight * 0.8)
    path1.style.strokeDashoffset = calcDashoffset(scrollY, content1, path1Length)
    path2.style.strokeDashoffset = calcDashoffset(scrollY, content2, path2Length)
    path3.style.strokeDashoffset = calcDashoffset(scrollY, content3, path3Length)
  }

  window.addEventListener('scroll', scrollHandler)
})();