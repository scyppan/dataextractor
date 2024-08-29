function loadpage() {
    //alert("I'm running the loadpage");
    const url = window.location.href;

    // Check if the URL indicates a player-related page
    if (url.includes('/player/') || url.includes('/player_summary/')) {
        setupForPlayer();  // Ensure setupForPlayer is defined and loaded
    }

    // Check if the URL indicates a team-related page
    if (url.includes('/team/') || url.includes('/teams/')) {
        setupForTeam();  // Ensure setupForTeam is defined and loaded correctly
    }
}

loadpage();
