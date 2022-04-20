import { API_KEY } from './config.js';

const getPlayerData = (username) => {
    var json = new Object;
    json.profile = new Object;
    json.stats = new Object; 
    $.ajax
    ({
        type: "GET",
        async: false,
        url: `https://open.faceit.com/data/v4/players?nickname=${username}`,
        dataType: 'json',
        headers: {
            "Authorization": API_KEY
        },
        success: function (data) {
            json.profile = data;
        }
    });
    $.ajax
    ({
        type: "GET",
        async: false,
        url: `https://open.faceit.com/data/v4/players/${json.profile.player_id}/stats/csgo`,
        dataType: 'json',
        headers: {
            "Authorization": API_KEY
        },
        success: function (data) {
            json.stats = data;
        }
    });
    return json;
}


$("#playersearchbtn").on('click', () => {
    var user = getPlayerData($("#playersearch").val());
    console.log(user);
    $("#playerimg").attr("src", user.profile.avatar);
})
