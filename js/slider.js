// Simple Slider transitions for hero sliders and testimonial carousels
class STEMQuestSlider {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll(".slide");
    this.currentIndex = 0;
    this.intervalTime = options.interval || 5000;
    this.autoPlay = options.autoPlay !== false;
    this.timer = null;

    this.init();
  }

  init() {
    if (this.slides.length <= 1) return;
    
    // Hide all slides except the first one
    this.slides.forEach((slide, idx) => {
      if (idx !== 0) slide.style.display = "none";
    });

    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  showSlide(index) {
    if (index >= this.slides.length) this.currentIndex = 0;
    else if (index < 0) this.currentIndex = this.slides.length - 1;
    else this.currentIndex = index;

    this.slides.forEach((slide, idx) => {
      slide.style.display = idx === this.currentIndex ? "block" : "none";
    });
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.timer = setInterval(() => this.nextSlide(), this.intervalTime);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

window.STEMQuestSlider = STEMQuestSlider;
