$(document).ready(function () {
    console.log('hello world');
    var ticketsApp = new Vue({
        el: '#tickets',
        data: {
            tickets: []
        }
    });

    var ticketApp

    var app = new Vue({
        el: '#app',
        data: {
            hello: 'Привет, Vue!'
        }
    });

/*    var markdownText = "Hello.\\n\\n* This is markdown.\\n* It is fun\\n* Love it or leave it.";
    console.log(markdown);
    var text = markdown.toHTML(markdownText);
    $('body').append(text);*/
});
