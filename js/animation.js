function getStyle(el, property) {
	return getComputedStyle ? window.getComputedStyle(el)[property] : el.currentStyle[property];
}

function animate(el, properties) {
	clearInterval(el.interval);
	el.interval = setInterval(function() {
		for (let property in properties) {
			let current = property === 'opacity' ? Math.round(parseFloat(getStyle(el, 'opacity')) * 100) : parseInt(getStyle(el, property));
			let speed = (properties[property] - current) / 20;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			el.style[property] = property === 'opacity' ? (current + speed) / 100 : speed + current + 'px';
		}
	}, 1);
}

let [curIndex, lis, liWidth, len, id, list, focusIndex, bullets] = [[], [], [], [], [], [], [], []];

function slideNext(n) {
	curIndex[n]++;
	slideTo(curIndex[n], n);
}

function slidePrev(n) {
	curIndex[n]--;
	slideTo(curIndex[n], n);
}

function slideTo(index, n) {
	if (index === len[n]) {
		curIndex[n] = index = 2;
		list[n].style.left = -liWidth[n] + 'px';
	}
	
	if (index === -1) {
		curIndex[n] = index = len[n] - 3;
		list[n].style.left = -(len[n] - 2) * liWidth[n] + 'px';
	}

	if (index === 0) {
		focusIndex[n] = bullets[n].length - 1;
	} else if (index === len[n] - 1) {
		focusIndex[n] = 0;
	} else {
		focusIndex[n] = index - 1;
	}
	
	if (n === 0) {
		document.querySelector('.top-bullet.focus').className = 'top-bullet';
		bullets[n][focusIndex[n]].className = 'top-bullet focus';
	} else if (n === 1) {
		document.querySelector('.bottom-bullet.focus').className = 'bottom-bullet';
		bullets[n][focusIndex[n]].className = 'bottom-bullet focus';
		document.querySelector('#cur-num').innerHTML = focusIndex[n] + 1;
	}

	let left = -index * liWidth[n];
	animate(list[n], {
		left: left
	});
}

function auto(n) {
	clearInterval(id[n]);
	id[n] = setInterval(() => slideNext(n), 5000);
}

function stop(n) {
	clearInterval(id[n]);
}

export default function init(el, n) {
	curIndex[n] = 1;
	let li_1 = document.querySelector(`.${el}-roll-ad:first-of-type`);
	let copy_1 = li_1.cloneNode(true);
	let li_last = document.querySelector(`.${el}-roll-ad:last-of-type`);
	let copy_last = li_last.cloneNode(true);
	list[n] = document.querySelector(`#${el}-roll-ad`);
	list[n].appendChild(copy_1);
	list[n].insertBefore(copy_last, li_1);
	
	lis[n] = document.querySelectorAll(`.${el}-roll-ad`);
	liWidth[n] = lis[n][0].offsetWidth;
	len[n] = lis[n].length;

	list[n].style.width = liWidth[n] * len[n] + 'px';
	list[n].style.left = -liWidth[n] + 'px';

	document.querySelector(`#${el}-prev`).onclick = function() {
		slidePrev(n);
	}

	document.querySelector(`#${el}-next`).onclick = function() {
		slideNext(n);
	}
	bullets[n] = document.querySelectorAll(`.${el}-bullet`);
	for (let i = 0; i < bullets[n].length; i++) {
		bullets[n][i].index = i;
		bullets[n][i].onclick = function() {
			curIndex[n] = this.index + 1;
			slideTo(curIndex[n], n);
		}
	}

	document.querySelector(`#${el}-roll-ad`).onmouseover = () => stop(n);
	document.querySelector(`#${el}-roll-ad`).onmouseout = () => auto(n);
	auto(n);
}