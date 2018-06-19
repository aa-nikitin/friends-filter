import model from './modules/model.js';
import controller from './modules/controller.js';



(async () => {
    try {
        await model.auth('6488338', 2);
        await controller.addFriends();
    } catch (e) {
        console.error('Ошибка: ' + e.message);
    }
})();


let currentDrag;

const friendsVK = document.getElementById('friends-vk');
const friendsFavorite = document.getElementById('friends-favorite');
const searchFriends = document.getElementById('search-friends');
const searchFavoriteFriends = document.getElementById('search-friends-favorite');
const saveFavoriteFriends = document.getElementById('save-friends-favorite');
const openDrugofilter = document.getElementById('open-drugofilter');
const closeDrugofilter = document.getElementById('drugo-filter-close');
const modalDrugofilter = document.getElementById('drugo-filter');



openDrugofilter.addEventListener('click', (e) => {
    modalDrugofilter.classList.add('modal_active');
});

closeDrugofilter.addEventListener('click', (e) => {
    modalDrugofilter.classList.remove('modal_active');
});

friendsVK.addEventListener('click', (e) => {
    const friend = e.target.parentElement;
    if (e.target.getAttribute('data-action') === 'add') {
        controller.moveFriend(friend, friendsFavorite);
        if (searchFavoriteFriends.value) {
            controller.search(searchFavoriteFriends.value, friendsFavorite);
        }
    } 
});

friendsFavorite.addEventListener('click', (e) => {
    const friend = e.target.parentElement;
    if (e.target.getAttribute('data-action') === 'del') {
        controller.moveFriend(friend, friendsVK);
        if (searchFriends.value) {
            controller.search(searchFriends.value, friendsVK);
        }
    } 
});

saveFavoriteFriends.addEventListener('click', (e) => {
    try {
        controller.addLocalStorage();
        alert('Выбранные друзья успешно сохранены');
    } catch (e) {
        alert( "Извините, не получилось сохранить друзей" );
        console.error( e.message );
    }   
});

searchFriends.addEventListener('keyup', function() {
    controller.search(searchFriends.value, friendsVK);
});

searchFavoriteFriends.addEventListener('keyup', function() {
    controller.search(searchFavoriteFriends.value, friendsFavorite);
});

document.addEventListener('dragstart', (e) => {
    const friend = getFriends(e.target);
    
    if (friend) {
        currentDrag = { startZone: friend, node: e.target };
    }
});

document.addEventListener('dragover', (e) => {
    const friend = getFriends(e.target);

    if (friend) {
        e.preventDefault();
    }
});

document.addEventListener('drop', (e) => {
    if (currentDrag) {
        const friend = getFriends(e.target);

        e.preventDefault();
        if (friend && currentDrag.startZone !== friend) {
            
            controller.moveFriend(currentDrag.node, friendsFavorite);
        }

        currentDrag = null;
    }
});

function getFriends(from) {
    do {
        if (from.classList.contains('friends-list')) {
            return from;
        }
    } while (from = from.parentElement);

    return null;
}






