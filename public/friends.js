const friendPopup = document.querySelector('.friends-popup');
const closeBtn = document.querySelector('.friendClose');
const friendButton = document.querySelector('.friendButton')


friendButton.addEventListener('click', () => {
    friendPopup.style.display = 'block'
})

window.addEventListener('click', event => {
    if (event.target === closeBtn) {
        friendPopup.style.display = 'none';
    }
});



const requestFriend = async(profile_id) => {
    console.log('Friend Request Button Created')
    const response = await fetch('/api/friend',{
        method: 'POST',
        body: JSON.stringify({profile_id}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        console.log('Response OK')
    
    } else {
        alert(response.statusText);
    }
}

//Is this the correct ID? and how do we get that id from the front end?
const acceptFriend = async(profile_id) => {
    console.log('Friend Request Accepted')
    const response = await fetch('api/friend/accept', {
        method: 'PUT',
        body: JSON.stringify({profile_id}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok){
        console.log('Response OK')
    } else {
        alert(response.statusText);
    }
}

const declineFriend = async(profile_id) => {
    console.log('Friend Request Accepted')
    const response = await fetch('api/friend/decline', {
        method: 'PUT',
        body: JSON.stringify({profile_id}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok){
        console.log('Response OK')
    } else {
        alert(response.statusText);
    }
}

//How do we get the id of the profile?
document.getElementById('add-friend-button').addEventListener('click', function(e){
    const profileId = e.target.getAttribute('data-id');
    requestFriend(profileId)
})

