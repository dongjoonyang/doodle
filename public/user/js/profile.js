/**
 * =======================================
 * section01 비오는 날
 * =======================================
 */
(function () {
    const canvas = document.querySelector('#rain')
    const ctx = canvas.getContext('2d')
    
    const THUNDER_RATE = 0.0007
    let TOTAL
    let rains = []
    let drops = []
    let thunder
    let mouse = { x: 0, y: 0, isActive: false }
    
    // 빗방울 클래스
    class Rain {
      constructor(x, y, velocity) {
        this.x = x
        this.y = y
        this.velocity = velocity
        this.alpha = 2
      }
    
      draw() {
        const { x, y, velocity, alpha } = this
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + (velocity.x) * alpha, y + (velocity.y) * alpha)
        ctx.strokeStyle = '#8899a6'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    
      splash() {
        for (let i = 0; i < 3; i++) {
          drops.push(new Drop(this.x, this.velocity))
        }
      }
    
      animate() {
        if (this.y > innerHeight) {
          this.splash()
          this.x = -(innerWidth * 0.2) + Math.random() * (innerWidth * 1.4)
          this.y = -20
        }
        this.velocity.x = mouse.isActive ? -1 + Math.random() * 2 + (-innerWidth / 2 + mouse.x) / 150 : -1 + Math.random() * 2
        this.x += this.velocity.x
        this.y += this.velocity.y
    
        this.draw()
      }
    }
    
    // 스플래시 클래스
    class Drop {
      constructor(x, velocity) {
        this.x = x
        this.y = innerHeight
        this.velocity = {
          x: velocity.x + -2 + Math.random() * 4,
          y: -velocity.y + 5 + Math.random() * 5
        }
        this.gravity = 1.5
      }
    
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2, false)
        ctx.fillStyle = '#8899a6'
        ctx.fill()
      }
    
      animate() {
        this.velocity.y += this.gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
    
        this.draw()
      }
    }
    
    // 천둥
    class Thunder {
      constructor() {
        this.opacity = 0
      }
    
      draw() {
        const grid = ctx.createLinearGradient(0, 0, 0, innerHeight)
        grid.addColorStop(0, `rgba(66, 84, 99, ${this.opacity})`)
        grid.addColorStop(1, `rgba(18, 23, 27, ${this.opacity})`)
        ctx.fillStyle = grid
        ctx.fillRect(0, 0, innerWidth, innerHeight)
      }
    
      animate() {
        if (this.opacity === 0) return
        this.opacity -= 0.005
        this.draw()
      }
    }
    
    // 초기화 작업
    function init() {
      canvas.width = innerWidth
      canvas.height = innerHeight
    
      TOTAL = Math.floor(innerWidth * innerHeight / 15000)
      rains = []
      drops = []
      thunder = new Thunder()
    
      for (let i = 0; i < TOTAL; i++) {
        const x = Math.random() * innerWidth
        const y = Math.random() * innerHeight
        const velocity = {
          y: 13 + Math.random() * 5
        }
        rains.push(new Rain(x, y, velocity))
      }
    }
    
    // 렌더 함수
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (Math.random() < THUNDER_RATE) thunder.opacity = 1
      thunder.animate()
      rains.forEach(rain => rain.animate())
      drops.forEach((drop, index) => {
        drop.animate()
        if (drop.y > innerHeight) drops.splice(index, 1)
      })
    
      window.requestAnimationFrame(render)
    }
    
    // resize 이벤트
    window.addEventListener('resize', () => init())
    
    // mouse 이벤트
    canvas.addEventListener('mouseenter', () => mouse.isActive = true)
    canvas.addEventListener('mouseleave', () => mouse.isActive = false)
    canvas.addEventListener('mousemove', e => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })
    
    // 날씨 api로 정보 데이터 가져오기
    function getWeatherData() {
      const lat = 36.649864
      const lon = 127.430646
      const appKey = '98b2f0fa13bba9cb7371f9f667dfb818'
      const data = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}`)
      return data
    }
    
    // 비오는 날만 캔버스에 그려주기
    getWeatherData().then(result => {
      const currentWeather = result.data.weather[0].main
      console.log(currentWeather)
      const rainingStatus = ['Rain', 'Thunderstorm', 'Drizzle', 'Clear', 'Clouds']
      if (rainingStatus.includes(currentWeather)) {
        init()
        render()
      }
    })
})();

/**
 * =======================================
 * section01 마우스 커스텀
 * =======================================
 */
(function () {
  const cursorParent = document.getElementById('mouseCursor');
  const cursorChild = cursorParent.children[0];
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mousedown', mousedown);
  window.addEventListener('mouseup', mouseup);

  let scale = 1
  let stage = ''
  let cursorX = 0, cursorY = 0
  function mousemove(e) {
    cursorX = e.pageX - cursorParent.offsetWidth / 2
    cursorY = e.pageY - cursorParent.offsetHeight / 2
    cursorParent.style.transform =
      `translate3d(${cursorX}px, ${cursorY}px, 0)`;

    switch(e.target.getAttribute('data-cursor')) {
      case 'rain':
        if (stage === 'rain') return
        scale = 5
        stage = 'rain'
        cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'))
        cursorParent.className = 'cursor_text_mode'
        break
      case 'card':
        if (stage === 'card') return
        scale = 5
        stage = 'card'
        cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'))
        cursorParent.className = 'cursor_text_mode'
        break
      case 'link':
        if (stage === 'link') return
        scale = 5
        stage = 'link'
        cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'))
        cursorParent.className = 'cursor_text_mode'
        break
      default:
        if (stage === '') return
        scale = 1
        stage = ''
        cursorChild.setAttribute('data-name', '')
        cursorParent.className = ''
        break
    }
    cursorChild.style.setProperty('--cursor-scale', scale)
  }
  function mousedown(e) {
    scale *= 0.8
    cursorChild.style.setProperty('--cursor-scale', scale)
  }
  function mouseup(e) {
    scale *= 1.25
    cursorChild.style.setProperty('--cursor-scale', scale)
  }
})();

/**
 * =======================================
 * section01 나무
 * =======================================
 */
/* treeIndex.js 파일 */


/**
 * =======================================
 * section02 카드 애니메이션
 * =======================================
 */
(function () {
  class CardFlipOnScroll {
    constructor(wrapper, sticky) {
      this.wrapper = wrapper
      this.sticky = sticky
      this.cards = sticky.querySelectorAll('.card')
      this.length = this.cards.length

      this.start = 0
      this.end = 0
      this.step = 0
    }

    init() {
      this.start = this.wrapper.offsetTop - 100
      this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2
      this.step = (this.end - this.start) / (this.length * 2)
    }

    animate() {
      this.cards.forEach((card, i) => {
        const s = this.start + this.step * i
        const e = s + this.step * (this.length + 1)

        if (scrollY <= s) {
          card.style.transform = `
            perspective(100vw)
            translateX(100vw) 
            rotateY(180deg)
          `
        } else if (scrollY > s && scrollY <= e - this.step) {
          card.style.transform = `
            perspective(100vw)
            translateX(${100 + (scrollY - s) / (e - s) * -100}vw)
            rotateY(180deg)
          `
        } else if (scrollY > e - this.step && scrollY <= e) {
          card.style.transform = `
            perspective(100vw)
            translateX(${100 + (scrollY - s) / (e - s) * -100}vw)
            rotateY(${180 + -(scrollY - (e - this.step)) / this.step * 180}deg)
          `
        } else if (scrollY > e) {
          card.style.transform = `
            perspective(100vw)
            translateX(0vw) 
            rotateY(0deg)
          `
        }
      })
    }
  }

  const mainContent1 = document.querySelector('.main-content-1')
  const sticky = document.querySelector('.sticky')
  const cardFlipOnScroll = new CardFlipOnScroll(mainContent1, sticky)
  cardFlipOnScroll.init()

  window.addEventListener('scroll', () => {
    cardFlipOnScroll.animate()
  })

  window.addEventListener('resize', () => {
    cardFlipOnScroll.init()
  })
})();



