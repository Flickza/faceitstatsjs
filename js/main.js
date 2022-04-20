import { getPlayerData } from './fetch.js';
import { skill_levels, recentResults } from './icons.js';

$("#aftersearch").hide();
$("#playersearchbtn").on('click', () => {
    var user = getPlayerData($("#playersearch").val());
    console.log(user);

    //first section
    $("#playerimg").attr("src", user.profile.avatar);
    $("#playerurl").html(`<a href="${user.profile.url}" target="_blank">${user.profile.nickname}</a>`);
    $(".playerprofile").css('background-image', `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url("${user.profile.cover_image}")`);
    $("#playercountry").html(user.profile.country);
    $("#playerelo").html(user.profile.games.csgo.faceit_elo);
    $("#playerlevel").html(skill_levels[user.profile.games.csgo.skill_level]);
    //recentresults
    var recenthtml = "";
    user.stats.lifetime["Recent Results"].forEach(result => {
    recenthtml += recentResults[result] + " ";
    });
    $("#recentresults").html(recenthtml);
    $("#aftersearch").show();
})