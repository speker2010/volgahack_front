$(document).ready(function () {
    console.log('hello world');
    var ticketsApp = new Vue({
        el: '#tickets',
        data: {
            tickets: [
                { title: 'Титле 1', description: 'описание 1', price: '500' }
            ]
        }
    });

    var app = new Vue({
        el: '#app',
        data: {
            hello: 'Привет, Vue!'
        }
    });

    var usersApp = new Vue({
        el: '#user',
        data: {
            user:
                { username: 'Саня', karma: '100', about: 'Сражаюсь с криминалом', social_link: 'vk.com' }
        }
    });
    /*    var markdownText = "Hello.\\n\\n* This is markdown.\\n* It is fun\\n* Love it or leave it.";
        console.log(markdown);
        var text = markdown.toHTML(markdownText);
        $('body').append(text);*/
});

function getUrlParameters(parameter, staticURL, decode) {

    var currLocation = (staticURL.length) ? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        } else {
            returnBool = false;
        }
    }

    if (!returnBool) return false;
}

var idParameter = getUrlParameters("id", "", true);
console.log(idParameter);
