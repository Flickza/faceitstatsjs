import { getData } from './fetch.js';
import { fillPage } from './generator.js';

$("#loader-container").hide();

//if button is clicked, make search
$("#playersearchbtn").on('click', () => {
    main();
});

//if enter key is pressed, make search
$("#playersearch").on('keypress', (e) => {
    if (e.which == 13) {
        main();
    }
});

var main = async () => {
    //gets player username from inputfield
    console.time("load")
    $("#aftersearch").attr('hidden', true);
    $("#loader-container").show();

    //start function that calculates page values
    fillPage(await getData($("#playersearch").val()));
    
    console.timeEnd("load")
    //show page
    $("#loader-container").hide();
    $("#aftersearch").attr('hidden', false);
    $("#searchText").hide();
};
