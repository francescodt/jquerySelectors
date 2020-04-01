'use strict';

const array = [];

function Animal(animal) {
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;
    array.push(this.keyword);

}

Animal.prototype.render = function (container) {
    let $container = $(container);
    let $template = $container.find('.photo-template');

    let $animal = $template.clone();
    $animal.removeClass('photo-template')
    $animal.find('.animal-name').text(this.name);
    $animal.find('img.animal-image').attr('src', this.image_url);
    $animal.find('.animal-description').text(this.description);
    $animal.find('.animal-horns').text(this.horns);
    $container.append($animal);

}

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

//Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
//Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.

console.log('aJax', ajaxSettings);

$.ajax('data/page-1.json', ajaxSettings)
    .then(function (data) {
        console.log(data);

        data.forEach(animal => {
            let actualAnimal = new Animal(animal);
            actualAnimal.render('main');
        })

        for (let i = 0; i < array.length; i++) {
            $('.dropdown').append(
                $('<option>').text(array[i]).val(i));
        }

    });
