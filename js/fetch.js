import { API_KEY } from './config.js';

//get player ...'s stats
var getPlayerData = (username) => {

    //first make a player search to avoid search being case sensitive
    $.ajax
        ({
            type: "GET",
            async: false,
            url: `https://open.faceit.com/data/v4/search/players?nickname=${username}&offset=0&limit=10`,
            dataType: 'json',
            headers: {
                "Authorization": API_KEY
            },
            success: function (data) {
                //if it finds a player with the name entered, get the true nickname of player
                data.items.forEach(player => {
                    if (player.nickname.toLowerCase() == username.toLowerCase()) {
                        username = player.nickname;
                    }
                });
            }
        });
    var json = new Object;
    json.profile = new Object;
    json.stats = new Object;
    json.maps = new Array;
    json.last20 = new Array;
    json.last20Stats = new Array;
    //first ajax call to get player profile
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
    //use player_id from first call to get player stats for csgo
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
                //get stats from all relevant maps
                data.segments.forEach(segment => {
                    if (segment.mode == "5v5") {
                        json.maps.push(segment);
                    }
                });
            }
        });
    //get last 20 matches
    $.ajax
        ({
            type: "GET",
            async: false,
            url: `https://open.faceit.com/data/v4/players/${json.profile.player_id}/history?game=csgo&offset=0&limit=20`,
            dataType: 'json',
            headers: {
                "Authorization": API_KEY
            },
            success: function (data) {
                //get stats of last 20 matches
                data.items.forEach(match => {
                    $.ajax
                        ({
                            type: "GET",
                            async: false,
                            url: `https://open.faceit.com/data/v4/matches/${match.match_id}/stats`,
                            dataType: 'json',
                            headers: {
                                "Authorization": API_KEY
                            },
                            success: function (data) {
                                json.last20.push(data.rounds[0]);
                            }
                        });
                });
            }
        });
    json.last20.forEach(match => {
        match.teams.forEach(teams => {
            teams.players.forEach(x => {
                if (x.nickname == json.profile.nickname) {
                    json.last20Stats.push(x.player_stats);
                }
            });
        });
    });
    return json;
}

export var getPlayerData;