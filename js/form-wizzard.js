if (typeof(Storage) !== "undefined") {
var res_no = 0;
var mode = "create";
var type = "";
var questions = {};
var responses = {};
var q_num = 0;
var login = window.sessionStorage.getItem('login');
var quest_container;
var c_quest;
var c_type;
var c_idx;
if(login && mode=="create"){
    $('.signup-form').slideUp(400);
    $('.admin-web-quest').slideDown(600);
    $('#left-icon').slideUp(400);
    $('#quiz-left').slideDown(600);
}
localData = localDataStorage( 'passphrase.life' );
$('.admin-submit').click(function(e){
    var inputClass = $(e.target).attr('data-submit');
    var inputs = $('.' + inputClass);
    var username = $(inputs[0]).val();
    var password = $(inputs[1]).val();
    if(username.length == 0){
        swal('oops','username is required', 'error');
    }
    else if(username.length > 30 || username.length < 4){
        swal ('oops', 'username should be less than 30 digits and more than 4 digits', 'error')
    } 
    else if(password.length == 0){
        swal('oops','password is required', 'error');
    }
    else if(password.length > 30 || password.length < 6){
        swal ('oops','password should be less than 30 digits and more than 6 digits', 'error')
    }
    else{
        console.log(username, password);
        if(!localData.get('admin')){
            admins = [];
            localData.set('admin', admins);
        }
        admins = localData.chopget('admin');
        console.log(admins);
        if(admins.length >= 3){
            swal ('oops','maximum number of admins reached', 'error')
        }
        else{
            admin1 = {username: username, password: password};
            admins.push(admin1);
            localData.set('admin', admins)
            var current = admins.length;
            var remaining = 3 - current;
            window.sessionStorage.setItem('login', true);
            swal ('congratulations',
                'admin registered succesfully. Remains ' + remaining + ' admin registration slot(s)' , 
                'success');
            $('.signup-form').slideUp(400);
            $('.admin-web-reg').slideDown(600);
        }
    }               
//    console.log(email);
})
$('.try-login').click(function(e){
    //    var inputClass = $(e.target).attr('data-submit');
    //    var inputs = $('.' + inputClass);
    //    var username = $(inputs[0]).val();
    //    var password = $(inputs[1]).val();
    var loginClass = $(e.target).attr('data-slide');
    $('.signup-form').slideUp(400);
    $('.admin-web-reg').slideDown(600);
//    console.log(email);
})
$('.admin-login').click(function(e){
    var inputClass = $(e.target).attr('data-submit');
    var inputs = $('.' + inputClass);
    var username = $(inputs[0]).val();
    var password = $(inputs[1]).val();
    var admins = localData.get('admin');
    console.log(admins);
    var auth = false;
    if(admins && admins.length > 0){
        admins.forEach(element => {
            console.log(element);
            if(element.username == username && element.password == password){
                auth = true;
            }
        });
    }
    if(auth == true){
        var login = window.sessionStorage.setItem('login', true);
        swal ('congratulations',
                    'Admin login successful' , 
                    'success');
        $('.admin-web-reg').slideUp(400);
        $('.admin-web-quest').slideDown(600);
    }
    else{
        swal ('oops',
                    'Sorry the admin user and password do not match' , 
                    'error');
    }
    
    //    console.log(email);
})
$('.next-question').click(function(e){
    console.log('submitted');
    var inputClass = $(e.target).attr('data-submit');
    var inputs = $('.' + inputClass);
    var value = $(inputs[0]).val();
    if(value.length == 0 && q_num == 0){
        swal('oops','title is required', 'error');
    }
    else if(q_num == 0 && value.length > 30 || value.length < 4){
        swal ('oops', 'title should be less than 30 digits and more than 4 digits', 'error')
    }
    else{
        if(q_num == 0){
            questions = {};
            questions.title = value;
            $('#cre-title').text(value);
            var children = $('#type-code').clone(true);
            console.log(children);
            quest_container = $('.' + inputClass).parent().attr('id');
            console.log(quest_container);
            $('.'+inputClass).parent().empty().append(children.children());
            // var = "<label for=\"first-question\">First Question</label><select name=\"first-type\" placeholder=\"First Question\" class=\"admin-quest\"><div class=\"good\"><i class=\"fa fa-check\"></i></div>";
            var mode = $('#mod-tab').children()[q_num + 1];
            $(mode).addClass('m-active');
        }
    }
    if(value.length == 0 && q_num > 0){
        swal('oops','question is required', 'error');
    }
    else if( q_num > 0 && value.length > 100 || value.length < 4){
        swal ('oops', 'question should be less than 100 characters and more than 4 digits', 'error')
    }
    else{
        if(q_num > 0 && q_num < 4 && type == "short"){
            console.log(questions.title);
            questions['question' + q_num] = {question: value, type: "short"};
            console.log(questions);
            $('#cre-title').text(value);
            if(q_num < 3){
            var children = $('#type-code').children().clone(true);
            console.log(children);
            quest_container = $('.' + inputClass).parent().attr('id');
            console.log(quest_container);
            $('.'+inputClass).parent().empty().append(children);
            // var = "<label for=\"first-question\">First Question</label><select name=\"first-type\" placeholder=\"First Question\" class=\"admin-quest\"><div class=\"good\"><i class=\"fa fa-check\"></i></div>";
            var mode = $('#mod-tab').children()[q_num + 1];
            $(mode).addClass('m-active');
            }
        }
    }
    q_num++; 
    if(q_num == 4){
        console.log(questions)
    if(!localData.get('questions')){
            admins = [];
            localData.set('questions', []);
        }
    var quest = localData.chopget('questions');
    quest.push(questions);
    localData.set('questions', quest);
    swal ('congratulations',
                    'Question created successfully', 
                    'success'); 
    mode="question";
    switchToQuestion();
    }
//    console.log(email);
})
$('#type-inp').change(function(e){
    type = "short";
    var selected = $(e.target).val();
    if(selected == 0){
        var children = $('#short-quest').clone(true);
        children.find("#u-quest").addClass("admin-quest");
        console.log(children);
        $('#'+ quest_container).append(children.children());
    }
    console.log(selected);
})    
} else {
swal("Sorry your browser is not supported please try another browser");
}
$('#mode-tab>li').click(function(e){
console.log('here');
var sel = $(e.target).text();
console.log(sel);
if(sel == "Question mode"){
    mode = "question"
    switchToQuestion();
}
else{
    mode="create"
    $('.signup-form').slideUp(400);
    $('.admin-web-quest').slideDown(600);
    $('.admin-web-res').slideUp(400);
    $('#left-icon').slideUp(400);
    $('#quiz-left').slideDown(600);
    var mode = $('#mode-tab').children()[1];
    var mode2 = $('#mode-tab').children()[0]; 
    $(mode2).addClass('m-active');
    console.log(mode, mode2);
    $(mode).removeClass('m-active');
}
})
function switchToQuestion(from){
// var mo = mod == 'create' ? 0 : 1;
var mode = $('#mode-tab').children()[1];
var mode2 = $('#mode-tab').children()[0]; 
$(mode).addClass('m-active');
console.log(mode, mode2);
$(mode2).removeClass('m-active');
$('#mo-tab').addClass('hidden');
var list = $('#res-list').clone();
list.find('#res-ul').empty();
var quests = localData.get('questions');
console.log(quests);
quests.forEach(function(item, idx){
    var li = document.createElement('li');
    li.innerText = item.title;
    $(li).click(function(e){
        c_idx = idx;
        startResponse(idx);
    });
    console.log(li);
    list.find('#res-ul').append(li);
})
$('.admin-web-res').find('.bodyForm').empty().append(list);
    $('.signup-form').slideUp(400);
    $('.admin-web-quest').slideUp(400);
    $('#left-icon').slideUp(400);
    $('#quiz-left').slideDown(600);
    $('.admin-web-res').slideDown(600);
}
function startResponse(response){
var intro = $('#res-intro').clone(true);
var quests = localData.get('questions');
quest = quests[response];
c_quest = quest;
intro.find('h3').text(quest.title);
$('#mo-tab').removeClass('hidden');
$('.admin-web-res').find('.bodyForm').empty().append(intro);
}
$('#res-begin').click(function(e){
res_no = 1;
quest = $('#short-res').clone(true).children();
c_type = c_quest['question' + res_no].question
quest.find('h3').text(c_quest['question' + res_no].question);
quest.find('input').addClass('admin-res');
$('.admin-web-res').find('.bodyForm').empty().append(quest);
var mode = $('#mo-tab').children()[res_no];
$(mode).addClass('m-active');
})
$('.next-response').click(function(e){
    console.log('submitted');
    console.log(res_no);
    var inputClass = $(e.target).attr('data-submit');
    var inputs = $('.' + inputClass);
    var value = $(inputs[0]).val();
    if(value.length == 0 && res_no == 1){
        swal('oops','response is required', 'error');
        return;
    }
    else if(res_no == 1 && value.length > 30 || value.length < 4){
        swal ('oops', 'response should be less than 30 digits and more than 4 digits', 'error')
        return
    }
    else{
        console.log('first');
        if(res_no == 1){
            responses = {};
            $('#cre-title').text(value);
            responses['response' + res_no] = {response: value};
            quest = $('#short-res').clone(true).children();
            c_type = c_quest['question' + (res_no + 1)].question
            quest.find('h3').text(c_quest['question' + (res_no + 1)].question);
            quest.find('input').addClass('admin-res');
            $('.admin-web-res').find('.bodyForm').empty().append(quest);
            // var = "<label for=\"first-question\">First Question</label><select name=\"first-type\" placeholder=\"First Question\" class=\"admin-quest\"><div class=\"good\"><i class=\"fa fa-check\"></i></div>";
            var mode = $('#mo-tab').children()[res_no + 1];
            $(mode).addClass('m-active');
            res_no++;
            return;
        }
    }
    if(res_no > 1 && value.length == 0){
        swal('oops','question is required', 'error');
        return;
    }
    else if(value.length > 100 || value.length < 4 && q_num > 1){
        swal ('oops', 'question should be less than 100 characters and more than 4 digits', 'error');
        return;
    }
    else{
        if(res_no > 1){
            $('#cre-title').text(value);
            if(res_no < 3){
                console.log('here', res_no);
                responses['response' + res_no] = {response: value};
                quest = $('#short-res').clone(true).children();
                c_type = c_quest['question' + (res_no + 1)].question
                quest.find('h3').text(c_quest['question' + (res_no + 1)].question);
                quest.find('input').addClass('admin-res');
                $('.admin-web-res').find('.bodyForm').empty().append(quest);
            // var = "<label for=\"first-question\">First Question</label><select name=\"first-type\" placeholder=\"First Question\" class=\"admin-quest\"><div class=\"good\"><i class=\"fa fa-check\"></i></div>";
                var mode = $('#mo-tab').children()[res_no + 1];
                $(mode).addClass('m-active');
                res_no++;
                return;
            }
        }
    }
    if(res_no == 3){
    $('#cre-title').text(value);
    responses['response' + res_no] = {response: value};
    responses.q_id = c_idx;
    if(!localData.get('responses')){
            admins = [];
            localData.set('responses', []);
        }
    var resp = localData.chopget('responses');
    resp.push[responses]; 
    localData.set('responses', resp);
    swal ('congratulations',
                    'Question created successfully', 
                    'success'); 
    }
    //    console.log(email);
    switchToQuestion();
})