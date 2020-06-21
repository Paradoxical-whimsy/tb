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