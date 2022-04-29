import { getData } from './fetch.js';
import { fillPage } from './generator.js';

//init = true for first time loading
let init = true;
let load = false;
$("#loader-container").hide();

//if button is clicked, make search
$("#playersearchbtn").on('click', () => {
    if (load == false) {
        main();
    }
});

//if enter key is pressed, make search
$("#playersearch").on('keypress', (e) => {
    if (e.which == 13) {
        if (load == false) {
            main();
        }
    }
});

var main = async () => {
    console.time("load")
    load = true;
    //gets player username from inputfield
    $("#aftersearch").attr('hidden', true);
    $("#loader-container").show();

    //start function that calculates page values
    fillPage(await getData($("#playersearch").val()), init);

    console.timeEnd("load")
    load = false;
    //show page
    $("#loader-container").hide();
    $("#aftersearch").attr('hidden', false);
    $("#searchText").hide();

    init = false;
};
