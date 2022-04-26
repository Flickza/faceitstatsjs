import { getData } from './fetch.js';
import { fillPage } from './generator.js';

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
    // var user = await getData($("#playersearch").val());
    console.time("load")
    //start function that calculates page values
    fillPage(await getData("Flickza"));
    console.timeEnd("load")
    //show page
    $("#aftersearch").attr('hidden', false);
    $("#searchText").hide();
};
main();