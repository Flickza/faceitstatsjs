import { skill_levels, recentResults } from '../../icons.js';

var fillPage = user => {
    //first section

    //player avatar
    $("#playerimg").attr("src", user.profile.avatar);

    //player profile link
    $("#playerurl").html(`<a href="${user.profile.url}" target="_blank">${user.profile.nickname}</a>`);

    //player cover image
    $(".playerprofile").css('background-image', `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url("${user.profile.cover_image}")`);

    //player country identificator
    $("#playercountry").attr("src", `https://countryflagsapi.com/png/${user.profile.country}`);

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
    var playersLast20 = {
        Kills: 0,
        Deaths: 0,
        HeadshotsPercentage: 0,
        Wins: 0,
        kd: [],
        kr: []
    };

    user.last20Stats.forEach(match => {
        playersLast20.Kills += parseInt(match.Kills);
        playersLast20.Deaths += parseInt(match.Deaths);
        playersLast20.HeadshotsPercentage += parseInt(match["Headshots %"]);
        playersLast20.Wins += parseInt(match.Result);
        playersLast20.kd.push(match["K/D Ratio"]);
        playersLast20.kr.push(match["K/R Ratio"]);
    });

    console.log(playersLast20);



    $("#playerkd").html(user.stats.lifetime["Average K/D Ratio"] + " K/D");
    $("#playerhs").html(user.stats.lifetime["Average Headshots %"] + " %");
    $("#playerkdLast20").html((playersLast20.Kills / playersLast20.Deaths).toFixed(2));
    $("#playerhsLast20").html((playersLast20.HeadshotsPercentage / 20) + "%");
    /* W/L Rating Card */

    //player winrate
    $("#playerwinrate").html(user.stats.lifetime["Win Rate %"] + "%");

    //player wins
    $("#playerwins").html(user.stats.lifetime["Wins"] + " Wins");

    //player losses
    $("#playerlosses").html(user.stats.lifetime["Matches"] - user.stats.lifetime["Wins"] + " Losses");

    //player wins last 20 matches
    $("#playerWinsLast20").html(playersLast20.Wins + " W");
    //player losses last 20 matches
    $("#playerLossesLast20").html((20 - playersLast20.Wins) + " L");
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


    //K/D last 20 chart
    const kdChart = $('#kdChart');
    const kdChartRender = new Chart(kdChart, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
            datasets: [{
                label: 'K/D per match',
                data: playersLast20.kd,
                backgroundColor: [
                    'rgba(255, 85, 0, 0.1)',
                ],
                borderColor: [
                    'rgba(255, 85, 0, 1)',
                ],
                borderWidth: 1,
                tension: 0.2,
                pointRadius: 1.5,
                pointHitRadius: 20
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    
    //K/R Chart last 20 Matches
    const krChart = $('#krChart');
    const krChartRender = new Chart(krChart, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
            datasets: [{
                label: 'K/R per match',
                data: playersLast20.kr,
                backgroundColor: [
                    'rgba(255, 85, 0, 0.1)',
                ],
                borderColor: [
                    'rgba(255, 85, 0, 1)',
                ],
                borderWidth: 1,
                tension: 0.2,
                pointRadius: 1.5,
                pointHitRadius: 20
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    
};


export var fillPage;