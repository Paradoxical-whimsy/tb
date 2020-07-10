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
	
	for (el of labels) {
		if (el === e.target) {
			el.className = 'label selected';
		} else {
			el.className = 'label';
		}
	}
});

document.querySelector('#search-input').addEventListener('keyup', (e) => e.target.className = e.target.value ? '' : 'magnifier');

search_file_img.onclick = () => search_file.click();

//news栏
let news_titles = document.querySelectorAll('.news-title');
let news_contents = document.querySelectorAll('.news-content');
let news_cur_index = 0;
document.querySelector('#news-titles').addEventListener('mouseover', function(e) {
	for (let i in news_titles) {
		if (e.target === news_titles[i]) {
			if (i !== news_cur_index) {
				news_titles[i].className = 'news-title news-link cur-title';
				news_titles[news_cur_index].className = 'news-title news-link';
				news_contents[i].className = 'news-content cur-content';
				news_contents[news_cur_index].className = 'news-content';
				news_cur_index = i;
				break;
			}
		}
	}
});

//顶部搜索栏
let html = document.querySelector('html');
let top_search = document.querySelector('#top-search');
let is_hidden = true;
document.querySelector('body').onscroll = function() {
	if (is_hidden && html.scrollTop > 1000) {
		top_search.style.display = 'block';
		is_hidden = false;
	} else if (!is_hidden && html.scrollTop < 1000) {
		top_search.style.display = 'none';
		is_hidden = true;
	}
};