export class CategoryNav {
  constructor(container) {
    this.nav = document.querySelector(container);

		this.handleIntersect = (entries, observer) => {
		  entries.forEach(entry => {
		  	if(entry.intersectionRatio < 1) {
		  		this.nav.classList.add('stuck');
		  	} else {
		  		this.nav.classList.remove('stuck');
		  	}
		  });
		}

		this.observer = new IntersectionObserver(this.handleIntersect, {
		  root: null,
		  rootMargin: '-1px 0px 0px 0px',
		  threshold: 1
		});

		this.observer.observe(this.nav);

    if (this.nav.scrollWidth > this.nav.clientWidth) {
      const list = this.nav.querySelector('ul');
      const selected = list.querySelector('.selected');

      this.nav.scrollTo(
        (
          (selected.offsetLeft + selected.offsetWidth / 2)
          - this.nav.offsetWidth / 2
        ), 0
      );
    }
  }
}
