'use strict';

//courtesy of chase, yvette, keith and in class efforts

const filter = [];

function Image(image) {
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    this.horns = image.horns;
    filter.push(this);

}

Image.prototype.render = function (container) {
    let $container = $(container);
    let $template = $('#photo-template');
    let $image = $template.clone();
    $image.removeAttr('id');
    $image.find('h2.image-name').text(this.title);
    $image.find('img.image-display').attr('src', this.image_url);
    $image.find('p').text(this.description);
    $container.append($image);
}

const keywords = [];
function makeMyMenu(image) {
    let $menu = $('.dropdown');
    let $createOptions = $("<option>");
    $createOptions.text(image.keyword);
    $createOptions.val(image.keyword);
    if (!keywords.includes(image.keyword)) {
        keywords.push(image.keyword);
        $menu.append($createOptions);
    }
};


const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

let images = null;

$.ajax('./data/page-1.json', ajaxSettings).then(function (data) {
    images = data;
    renderImages('default');
    images.forEach(image => makeMyMenu(image));
});

function renderImages(filter) {
    $('main').empty();
    images.forEach((image) => {
        let displayImage = new Image(image);
        if (displayImage.keyword === filter) {
            displayImage.render('main');
        } else if (filter === 'default') {
            displayImage.render('main');
        }
    });
}


$('.dropdown').on('change', function() {
    let $this = $(this),
        filterValue = $this.val();
    renderImages(filterValue);
})