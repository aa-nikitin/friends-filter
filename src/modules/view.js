export default {
    renderFromVK(data, templateName) { // отрисовка при загрузке из вк
        const template = document.getElementById(templateName).textContent;
        const render = Handlebars.compile(template);
        const html = render(data);
        
        return html;
    },
    renderMove(friend, friendsList, params) { // отрисовка при перемещении друга
        const frientItem = friend.parentNode;

        frientItem.setAttribute('draggable', params.dnd);
        friend.setAttribute('data-action', params.actionInvert);
        friend.classList.remove(`friend_${params.action}`);
        friend.classList.add(`friend_${params.actionInvert}`);
        friendsList.appendChild(frientItem);
    }
};