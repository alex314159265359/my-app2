$(function () {
     

});

function tickTimer(){
    var oldTime = techTime;
    if(oldTime<=0) {
        $("#tech").css("display","none");
    }
    else{
        $("#tech").css("display","block");
    }
    var minutes = Math.floor(oldTime / 60);
    var seconds = oldTime % 60;
    oldTime = "";
    var days = 0;

    if(minutes>60){
    	var hours = Math.floor(minutes/60);
        if(hours>=24){
            days = Math.floor(hours/24);
            hours = hours-Math.floor(hours/24)*24;
        }

    	var hminutes = minutes-Math.floor(minutes/60)*60;

        if(days!=0){
            if(days!=0)
            oldTime += days+' дн. ';
        }

        if(hours!=0)
            oldTime += hours + ' ч. ';
        if(hminutes!=0)
            oldTime += hminutes + ' мин. ';

            oldTime += seconds + ' сек.';
    }
    else{
        if(minutes!=0)
	    oldTime += minutes + ' мин. ';
        oldTime += seconds+' сек.'
    }
    $("#time-tick").html(oldTime);
    techTime--;
}


function checkTech() {
    $.ajax({
        url: "/tech",
        type: "GET",
        success: function (data) {
            techTime = data.time
        }
    });
}


function getCoursesMain(){
	$.get({
			url: '/getcoursesmain',
			success: function (data) {
				console.log(data);
				if( data["response"] == "success"){
					$('.courses_main_page__courses').animate({
                        'opacity' : 0
                    }, 400, function(){
                        $('.courses_main_page__courses').html(CreateCoursesMain(data)).animate({'opacity': 1}, 400);});
            
                }
			}
	});
}


function showErrors(data) {
    $(".error-msg, .not_valid_field").remove();
    
    $('.in-text, .to-text, .in-inputs.pay-input input, .to-inputs.pay-input input, #pay-email, #ref-inputs input, .pay__where input').css('border','1px solid #162f66');
    
    console.log( data );
    for (var i = 0; i < data['errors'].length; i++) {
        if (data['errors'][i]['field'] == 'email') {
          
            $('#pay-email').css('border','1px solid #fa0000');
            $('#pay-email').after('<div class="not_valid_field">' + data['errors'][i]['message'] + '</div>');

        }else if (data['errors'][i]['field'] == 'from_pay') {
           
            $('.in-text').css('border','1px solid #fa0000');0
            $('.minmax_in_err').append('<div class="not_valid_field">' + data['errors'][i]['message'] + '</div>');

        } else if (data['errors'][i]['field'] == 'to_pay') {
            $('.to-text').css('border','1px solid #fa0000');
            $('.minmax_out_err').append('<div class="not_valid_field">' + data['errors'][i]['message'] + '</div>');
       
        } else if (data['errors'][i]['field'] == 'summ') {
            $("#summ-error").css("display","");
            $("#summ-error").html(data['errors'][i]['message']);
        } else if (data['errors'][i]['field'] == 'ip') {
            $("#general_error_modal").html("<div style='padding: 0; text-align: center;' class='not_valid_field'>" + data['errors'][i]['message'] + "</div>")
            $("#general_error_modal").modal(
                {
                    fadeDuration: 100
                });
        }else {
            $("#" + data['errors'][i]['field']).css('border','1px solid #fa0000');
            $("#" + data['errors'][i]['field']).after("<div class='not_valid_field'>" + data['errors'][i]['message'] + "</div>");
        }
    }

}

function deleteErrors() {
    $(".error-msg, .not_valid_field").remove();
    $('.in-text, .to-text, .in-inputs.pay-input input, .to-inputs.pay-input input, #pay-email, #ref-inputs input, .pay__where input, .reserve_btns input').css('border','1px solid #162f66');
 }

function claim() {
    /*var email = $("#pay-email input").val();*/
    var email = $("#pay-email").val();

    
    var intext = $(".in-text").val();
    var totext = $(".to-text").val();

    paydata = "";

    if ($("#pay-email").length != 0)
        paydata = "email=" + email;

    var payinputs = $(".in-inputs.pay-input input");

    from_requis = [];
    to_requis = [];

    for (var i = 0; i < payinputs.length; i++) {
        paydata += "&from_requis" + (i + 1) + "=" + encodeURIComponent($(payinputs[i]).val());
        from_requis.push($(payinputs[i]).val());
    }

    payinputs = $(".to-inputs.pay-input input");

    for (var i = 0; i < payinputs.length; i++) {
        paydata += "&to_requis" + (i + 1) + "=" + encodeURIComponent($(payinputs[i]).val());
        to_requis.push($(payinputs[i]).val());
    }

    paydata += "&gives=" + from_to[0];
    paydata += "&gets=" + from_to[1];
    //paydata +="&g-recaptcha-response="+grecaptcha.getResponse(claim__captcha);
    paydata += "&from_pay=" + intext + "&to_pay=" + totext;
    paydata += "&csrfmiddlewaretoken=" + $("input[name='csrfmiddlewaretoken']").val();

    $.ajax({
        url: "/",
        type: "POST",
        data: paydata,
        success: function (data) {
            if (data["response"] == "error") {
                showErrors(data);
            } else if (data["response"] == "success") {
                deleteErrors();
                if (!data['verify'])
                    getForm(data, [intext, totext, from_requis, to_requis]);
                else {
                    verifyCard(data);
                }
            }
        }
    });
}



var nowClaim = null;
function verifyCard(data) {
    $("#verify-modal #fileupload").attr('onclick',"uploadFiles('"+data.claim.uuid+"')");
    nowClaim = data.claim.uuid;
    $("#verify-modal").modal(
        {
            fadeDuration: 100
        });
}

function getStatusClaim(link) {
    $("#claim-auto-check .close-modal").click();
    $("#claim-auto-status-check").modal();
    setTimeout(function () {
        location.href = link;
    }, 3000);
}

function getForm(claim, data) {
    if (!claim.claim.is_automatic) {
        $("#claim-link").attr('href', "claim/" + claim.claim.uuid);
        $("#claim-check").modal(
            {
                fadeDuration: 100
            }
        );
    } else {
        $("#claim-auto-link").attr('href', "claim/" + claim.claim.uuid);
        $("#claim-auto-link").attr('onclick', "getStatusClaim('" + claim.link + "')");
        $("#claim-auto-check").modal(
            {
                fadeDuration: 100
            }
        );
    }
}

function resendActivation() {
    $("#success_activate").css("opacity", 1);
    setTimeout(function () {
        $("#success_activate").css("opacity", 0);
    }, 5000);
    $.ajax({
        url: "reactivate",
        type: "POST",
        data: {
            'csrfmiddlewaretoken': $("input[name='csrfmiddlewaretoken']").val()
        },
        success: function (data) {

        }
    });
}

function voucherPay() {
    $.ajax({
        url: location.href + "/confirm",
        type: "POST",
        data: $("#voucherForm").serialize(),
        success: function (data) {
            if (data['response'] == 'error') {
                showErrors(data);
            } else {
                location.href = data['link'];
            }
        }
    });
}

function verifyToo() {
   
    $('#progress .progress-bar').css('width', '0%');
    $('#progress .progress-bar').css("background", "rgb(66, 139, 202)");
    $('#progress .progress-bar').html("");
   
    $("#error-verify").css("display","none");
    $("#check-verify").css("display","none");
    $("#main-verify").css("display","");
}

var checkVerify = null;
function verifyDone(uuid) {
    $.ajax({
        url: "/verification/"+uuid+"/confirm",
        type: "POST",
        success: function (data) {
            if (data['response'] == 'success') {
                $("#error-verify").css("display","none");
                $("#check-verify").css("display","");
                $("#main-verify").css("display","none");
                checkVerify = setInterval(function () {
                    verifyCheck(uuid);
                },2000);
            }
        }
    });
}

function verifyCheck(uuid) {
    $.ajax({
        url: "/verification/"+uuid+"/check",
        type: "POST",
        success: function (data) {
            if(data.status=='N'){

            }
            else if(data.status=='V'){
                location.href = "/claim/"+nowClaim
            }
            else if(data.status=='O'){
                $("#error-verify").css("display","");
                $("#verify-error").html(data['error']);
                $("#check-verify").css("display","none");
                $("#main-verify").css("display","none");
                clearInterval(checkVerify);
            }
        }
    });
}

function uploadFiles(uuid) {
    $('#progress .progress-bar').css('width', '0%');
    $('#progress .progress-bar').css("background", "rgb(66, 139, 202)");
    $('#progress .progress-bar').html("");

    'use strict';
    var url = '/verification/'+uuid;
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $('.upload-errors').html('');
            if(data.result['response']=='error'){
                $('.upload-errors').html(data.result['errors'][0]['message']);
            }
            else{
                $("#done-verify-btn").attr('onclick', "verifyDone('"+data.result['verify']+"')")
            }
        },
        error: function () {
            $('.upload-errors').html('Ошибка загрузки. Вероятно слишком большой файл(> 10МБ).');
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );

            $('#progress .progress-bar').html(progress + "%");
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
}

function ReserveClaim() {
    reserve_data = "";
   
    reserve_data += "reserve_email="+$('#reserve_email').val(); 
    reserve_data += "&reserve_summ="+$('#reserve_summ').val();
   
    reserve_data += "&ps_reserve=" + from_to[1];
    reserve_data += "&csrfmiddlewaretoken=" + $("input[name='csrfmiddlewaretoken']").val();
    console.log(reserve_data);
   
    $.ajax({
        url: "/reserve/reserve_claim",
        type: "POST",
        data: reserve_data,
        success: function (data) {
            console.log(data);
            if (data["response"] == "error") {
                showErrors(data);
            }else if (data["response"] == "success") {
                deleteErrors();
                $('.success_put_reserve').css('display','block');
                setTimeout(function(){
                    $('.success_put_reserve').css('display','none');
                    $('#reserve_summ').val('');
                    $.modal.close();
                }, 3000)
            
            }
       
        }
    });
    

}