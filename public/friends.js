const friendPopup = document.querySelector('.friends-popup');
const closeBtn = document.querySelector('.friendClose');
const friendButton = document.querySelector('.friendButton');
const friendToggle = document.querySelector('.friend-toggle');
const pendingToggle = document.querySelector('.pending-toggle');
const acceptedFriends = document.querySelector('.accepted-friends');
const pendingFriends = document.querySelector('.pending-friends');
const acceptButtons = document.querySelectorAll('.accept-button');
const declineButtons = document.querySelectorAll('.decline-button');
const requestFriendButton = document.querySelector('#add-friend-button');



friendToggle.addEventListener('click', () => {
    acceptedFriends.style.display = 'block'
    pendingFriends.style.display = 'none'
    friendToggle.style.color = "#00C4CC"
    pendingToggle.style.color = "#43245c"
})

pendingToggle.addEventListener('click', () => {
    pendingFriends.style.display = 'block'
    acceptedFriends.style.display = 'none'
    pendingToggle.style.color = "#00C4CC"
    friendToggle.style.color = "#43245c"
})


friendButton.addEventListener('click', () => {
    friendPopup.style.display = 'block'
})

window.addEventListener('click', event => {
    if (event.target === closeBtn) {
        friendPopup.style.display = 'none';
    }
});

acceptButtons.forEach(acceptButton => {
   acceptButton.addEventListener('click', () => {
    var requester_id = acceptButton.getAttribute("data-requester-id")
    console.log('Accept Friend Clicked')
    acceptFriend(requester_id)
   })
})

declineButtons.forEach(declineButton => {
    declineButton.addEventListener('click', () => {
     var requester_id = acceptButton.getAttribute("data-requester-id")
     declineFriend(requester_id)
    })
 })

 requestFriendButton.addEventListener('click', () => {
    var accepter_id = requestFriendButton.getAttribute("data-id")
    requestFriend(accepter_id)
 })


const requestFriend = async(accepter_id) => {
    console.log('Friend Request Button Created')
    console.log(accepter_id)
    const response = await fetch('/api/friend',{
        method: 'POST',
        body: JSON.stringify({"accepter_id": accepter_id}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        console.log('Response OK')
    
    } else {
        alert(response.statusText);
    }
}

//Is this the correct ID? and how do we get that id from the front end?
const acceptFriend = async(requester_id) => {
    console.log('Friend Request Accepted')
    console.log(requester_id)
    const response = await fetch('/api/friend/accept', {
        method: 'PUT',
        body: JSON.stringify({"requester_id": requester_id}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok){
        console.log('Response OK')
    } else {
        alert(response.statusText);
    }
}

const declineFriend = async(requester_id) => {
    console.log('Friend Request Accepted')
    const response = await fetch('/api/friend/decline', {
        method: 'PUT',
        body: JSON.stringify({"requester_id": profile_id}),
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

