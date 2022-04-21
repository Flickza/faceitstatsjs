import { getPlayerData } from '../js/fetch.js';
import { fillPage } from '../js/generator.js';

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

const main = () => {
    //gets player username from inputfield
    var user = getPlayerData($("#playersearch").val());
    
    //start function that calculates page values
    fillPage(user);
    
    //show page
    $("#aftersearch").attr('hidden', false);
    $("#searchText").hide();
};