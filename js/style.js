//搜索栏
let labels = document.querySelectorAll('.label');
let search_input = document.querySelector('#search-input');
let search_file_img = document.querySelector('#search-file-img');
let search_file = document.querySelector('#search-file');
let search_recommands = document.querySelector('#search-recommands');
document.querySelector('#labels').addEventListener('click', function (e) {
	switch (e.target.id) {
		case 'baobei':
			search_input.setAttribute('placeholder', '      omi欧米女包');
			search_file_img.style.visibility = 'visible';
			search_recommands.style.display = 'flex';
			break;
		case 'tianmao':
			search_input.setAttribute('placeholder', '');
			search_file_img.style.visibility = 'hidden';
			search_recommands.style.display = 'none';
			break;
		case 'dianpu':
			search_input.setAttribute('placeholder', '');
			search_file_img.style.visibility = 'hidden';
			search_recommands.style.display = 'flex';
			break;
		default:
			break;
	}
	
	let cur_label = document.querySelector('.label.selected');
	[cur_label.className, e.target.className] = [e.target.className, cur_label.className];
});

document.querySelector('#search-input').addEventListener('keyup', (e) => e.target.className = e.target.value ? '' : 'magnifier');

search_file_img.onclick = () => search_file.click();

//news栏
let news_titles = document.querySelectorAll('.news-title');
let news_contents = document.querySelectorAll('.news-content');
let news_cur_index = 0;
document.querySelector('#news-titles').addEventListener('mouseover', function(e) {
	for (let i in news_titles) {
		if (e.target === news_titles[i] && i !== news_cur_index) {
			news_titles[i].className = 'news-title news-link cur-title';
			news_titles[news_cur_index].className = 'news-title news-link';
			news_contents[i].className = 'news-content cur-content';
			news_contents[news_cur_index].className = 'news-content';
			news_cur_index = i;
			break;
		}
	}
});

//顶部搜索栏和右侧导航栏
let html = document.querySelector('html');
let top_search = document.querySelector('#top-search');
let propagation = document.querySelector('#propagation');
let propagations = document.querySelectorAll('.propagation');
let top_btn = document.querySelector('#top-btn');
let is_hidden = true;
let is_contact = false;
let cur_propagation = 0;
document.querySelector('body').onscroll = function() {
	if (is_hidden && html.scrollTop > 200) {
		top_search.style.display = top_btn.style.display = 'block';
		is_hidden = false;
	} else if (!is_hidden && html.scrollTop < 200) {
		top_search.style.display = top_btn.style.display = 'none';
		is_hidden = true;
	}
	
	if (!is_contact && html.scrollTop > 200) {
		propagation.style.top = '77px';
		is_contact = true;
	} else if (is_contact && html.scrollTop < 200) {
		propagation.style.top = '0px';
		is_contact = false;
	}
};

let top_search_select = document.querySelectorAll('.top-search-select');
document.querySelector('#top-search-select').addEventListener('click', function(e) {
	switch (e.target.id) {
		case 'search-second':
			[top_search_select[0].innerHTML, top_search_select[1].innerHTML] = [top_search_select[1].innerHTML, top_search_select[0].innerHTML];
			break;
		case 'search-third':
			[top_search_select[0].innerHTML, top_search_select[1].innerHTML, top_search_select[2].innerHTML] = [top_search_select[1].innerHTML, top_search_select[2].innerHTML, top_search_select[0].innerHTML];
			break;
		default:
			break;
	}
});

document.querySelector('#top-search-input').addEventListener('keyup', (e) => e.target.className = e.target.value ? '' : 'magnifier');
let top_search_file = document.querySelector('#top-search-file');
document.querySelector('#top-search-file-img').onclick = () => top_search_file.click();

propagation.addEventListener('click', function(e) {
	let id = e.target.id;
	if (id[0] === 'l') {
		window.scrollTo({top: document.querySelector(`#${id.slice(2)}`).offsetTop - 50, behavior: 'smooth'});
	}
	for (let i = 0; i < 5; i++) {
		if (propagations[i] === e.target && i !== cur_propagation) {
			[propagations[i].className, propagations[cur_propagation].className] = ['propagation cur-propagation', 'propagation'];
			cur_propagation = i;
			break;
		}
	}
});
