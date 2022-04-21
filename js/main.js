import { getPlayerData } from './fetch.js';
import { skill_levels, recentResults } from './icons.js';

$("#aftersearch").hide();
$("#playersearchbtn").on('click', () => {
    var user = getPlayerData($("#playersearch").val());

    console.log(user);

    //first section

    //player avatar
    $("#playerimg").attr("src", user.profile.avatar);

    //player profile link
    $("#playerurl").html(`<a href="${user.profile.url}" target="_blank">${user.profile.nickname}</a>`);

    //player cover image
    $(".playerprofile").css('background-image', `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url("${user.profile.cover_image}")`);

    //player country identificator
    $("#playercountry").html(user.profile.country);

    //player elo rating
    $("#playerelo").html(user.profile.games.csgo.faceit_elo);

    //player skill level
    $("#playerlevel").html(skill_levels[user.profile.games.csgo.skill_level]);

    //Player recent results (last 5 matches)
    var recenthtml = "";
    user.stats.lifetime["Recent Results"].forEach(result => {
        recenthtml += recentResults[result] + " ";
    });
    $("#recentresults").html(recenthtml);

    //second section

    /* K/D Ratio Card */

    //player K/D Ratio
    $("#playerkd").html(user.stats.lifetime["Average K/D Ratio"]);


    /* W/L Rating Card */

    //player winrate
    $("#playerwinrate").html(user.stats.lifetime["Win Rate %"] + "%");

    //player wins
    $("#playerwins").html(user.stats.lifetime["Wins"] + " Wins");

    //player losses
    $("#playerlosses").html(user.stats.lifetime["Matches"] - user.stats.lifetime["Wins"] + " Losses");

    /* HLTV Rating card */

    /* Multi Kills Mvps & total stats Cards*/
    var playerStatistics = {
        totalKills: 0,
        totalAces: 0,
        totalDeaths: 0,
        totalHeadshots: 0,
        total4Ks: 0,
        totalAssists: 0,
        totalMvps: 0,
        total3Ks: 0
    }
    user.maps.forEach(map => {
        playerStatistics.totalKills += parseInt(map.stats.Kills);
        playerStatistics.totalAces += parseInt(map.stats["Penta Kills"]);
        playerStatistics.totalDeaths += parseInt(map.stats.Deaths);
        playerStatistics.totalHeadshots += parseInt(map.stats.Headshots);
        playerStatistics.total4Ks += parseInt(map.stats["Quadro Kills"]);
        playerStatistics.totalAssists += parseInt(map.stats.Assists);
        playerStatistics.totalMvps += parseInt(map.stats.MVPs);
        playerStatistics.total3Ks += parseInt(map.stats["Triple Kills"]);
    });
    Object.keys(playerStatistics).forEach(stat => {
        $("#" + stat).html(playerStatistics[stat]);
    });

    /* Matches card */

    $("#totalMatches").html(user.stats.lifetime["Matches"]);
    $("#highestWstreak").html(user.stats.lifetime["Longest Win Streak"]);
    $("#currentWstreak").html(user.stats.lifetime["Current Win Streak"]);

    $("#aftersearch").show();
})