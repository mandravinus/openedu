
var DATA;
var API = "http://127.0.0.1/";
$(document).ready(function() {
    $('#el-idrima').attr("disabled", true);
    $('#el-sxolh').attr("disabled", true);
    $('#el-ereunitiko').attr("disabled", true);
    $('#el-institute').attr("disabled", true);
    $('#el-other').attr("disabled", true);

    $('label[for="el-ereunitiko"]').attr("disabled", true);
    $('label[for="el-institute"]').attr("disabled", true);
    $('label[for="el-other"]').attr("disabled", true);
    $('label[for="el-idrima"]').attr("disabled", true);
    $('label[for="el-sxolh"]').attr("disabled", true);



$('#newselect').on('change', function () {
    $.ajax({
        url: API+'uni',
        type: 'GET',
        dataType: 'json',
    	success: function (data, statusText, resObject) {
   
			var key = this.value;

			$('#el-idrima').prop("disabled", false); 
		$('#el-idrima').empty();
		$('#el-sxolh').empty();
		$('#eltmhmalession').empty();
				$('#el-idrima').append($("<option></option>")
				                    .attr("value", '1')
				                    .text('Ίδρυμα'));
       		$.each(data.result.data, function(index, d){            

				$('#el-idrima').append($("<option></option>")
				                    .attr("value", d.id)
				                    .text(d.name));
			});
       
   }
});
});

$('#el-idrima').on('change', function () {

    var key = this.value;
    var uni = $("#el-idrima option").filter(":selected").text();
    $.ajax({
        url: API+'department',
        type: 'GET',
        data:{"department":uni},
        dataType: 'json',
    	success: function (data, statusText, resObject) {
		$('#el-sxolh').prop("disabled", false); 
		$('#el-sxolh').empty();
		$('#eltmhmalession').empty();
		$('#el-sxolh').append($("<option></option>").attr("value", '1').text('Σχολή'));
   		$.each(data.result.data, function(index, d){            
			$('#el-sxolh').append($("<option></option>")
			                    .attr("value", d.id)
			                    .text(d.department));
		});

    }
        
   
  });
});

var tmimaselect = '<div class="eltimagroup">';
tmimaselect +='<label class="bg-info control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">Μάθημα</label>';
tmimaselect +='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaselect +='<select class="form-control input-sm eltmima" data-placeholder="Τμήμα" name="tmhma[]">';
tmimaselect +='<option selected=""  value="">Μάθημα</option>';
tmimaselect +='<option value="1"></option>';
tmimaselect +='</select>';
tmimaselect +='</div>';

tmimaselect +='<label class="control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">ΑΝΟΙΧΤΗ ΤΕΧΝΟΛΟΓΙΑ </label>';
tmimaselect +='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaselect +='<input class="form-control input-sm eltmimalesson" value="" name="erga[]" placeholder="ΑΝΟΙΧΤΗ ΤΕΧΝΟΛΟΓΙΑ/ΛΟΓΙΣΜΙΚΟ/ΠΕΡΙΕΧΟΜΕΝΟ" type="text">';
//tmimaselect +='</div>';

//tmimaselect +='<label class="control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">URL</label>';
//tmimaselect +='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaselect +='<input class="form-control input-sm eltmimalessonurl" value="" name="erga[]" placeholder="ΤΟΠΟΘΕΣΙΑ ΑΝΟΙΧΤΗΣ ΤΕΧΝΟΛΟΓΙΑΣ/ΛΟΓΙΣΜΙΚΟΥ/ΠΕΡΙΕΧΟΜΕΝΟΥ" type="text">';
//tmimaselect +='</div>';

tmimaselect +='<button class="del_field_button" type="button" style="color:blue">Διαγραφή μαθήματος</button>';
//tmimaselect +='<button class="del_field_button_url pull-right" type="button" style="color:blue;">Διαγραφή τεχνολογίας</button>';
tmimaselect +='<button class="add_field_button_url pull-right" type="button" style="color:blue;">Προσθήκη τεχνολογίας</button>';
tmimaselect +='<div style="margin-top:5px"> &nbsp; </div>';
tmimaselect +='</div>';
tmimaselect +='</div>';
tmimaselect +='</div>';

tmimaselecturl ='<label class="eltmimalessonurl control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">ΑΝΟΙΧΤΗ ΤΕΧΝΟΛΟΓΙΑ </label>';
tmimaselecturl +='<div class="eltmimalessonurldiv eltmimalessonurl col-xs-12 col-sm-12 col-md-9">';
tmimaselecturl +='<input class="form-control input-sm eltmimalesson eltmimalessonurl" value="" name="erga[]" placeholder="ΑΝΟΙΧΤΗ ΤΕΧΝΟΛΟΓΙΑ/ΛΟΓΙΣΜΙΚΟ/ΠΕΡΙΕΧΟΜΕΝΟ" type="text">';
tmimaselecturl +='<input class="form-control input-sm eltmimalessonurl" value="" name="erga[]" placeholder="ΤΟΠΟΘΕΣΙΑ ΑΝΟΙΧΤΗΣ ΤΕΧΝΟΛΟΓΙΑΣ/ΛΟΓΙΣΜΙΚΟΥ/ΠΕΡΙΕΧΟΜΕΝΟΥ" type="text">';

tmimaselecturl +='<button class="del_field_button_url pull-right eltmimalessonurl" type="button" style="color:blue;">Διαγραφή τεχνολογίας</button>';
tmimaselecturl +='<button class="add_field_button_url pull-right eltmimalessonurl" type="button" style="color:blue;">Προσθήκη τεχνολογίας</button>';
tmimaselecturl +='<div class="eltmimalessonurl" style="margin-top:5px"> &nbsp; </div>';
tmimaselecturl +='</div>';
tmimaselecturl +='</div>';
tmimaselecturl +='</div>';


tmimaselect1 ='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaselect1 +='<button id="add_field_button" class="btn btn-lg btn-primary" type="button" name="buttonerga[]">Προσθήκη Επιπλέον Μαθήματος</button>';
tmimaselect1 +='</div>';

$('#el-sxolh').on('change', function () {
    var key = this.value;

    var unisxolh = $("#el-sxolh option").filter(":selected").text();
    var department = $("#el-idrima option").filter(":selected").text();
    $.ajax({
        url: API+'mathima',
        type: 'GET',
        data:{"institution":department,"unisxolh":unisxolh},
        dataType: 'json',
    	success: function (data, statusText, resObject) {


		$('#eltmhmalession').empty();
		$('#eltmhmalession').append(tmimaselect);
		$('#add_field_button').remove();
		$('#eltmhmalessionadd').prepend(tmimaselect1);
		//var selectlesson = $('#eltmhmalession').children("eltmhma :last");
		var selectlesson = $('#eltmhmalession').find("select:last");
                $.each(data.result.data, function(index, d){

                        selectlesson.append($("<option></option>")
                                            .attr("value", d.id)
                                            .text(d.lesson));
                });
        }


    });
});

function getlessons() {
    var key = this.value;

    var unisxolh = $("#el-sxolh option").filter(":selected").text();
    var department = $("#el-idrima option").filter(":selected").text();
    $.ajax({
        url: API+'mathima',
        type: 'GET',
        data:{"institution":department,"unisxolh":unisxolh},
        dataType: 'json',
    	success: function (data, statusText, resObject) {


		//$('#eltmhmalession').append(tmimaselect);
		//var selectlesson = $('#eltmhmalession').children("eltmhma :last");
		var selectlesson = $('#eltmhmalession').find("select:last");
                $.each(data.result.data, function(index, d){

                        selectlesson.append($("<option></option>")
                                            .attr("value", d.id)
                                            .text(d.lesson));
                });
        }


    });
};

$(document).on('click', '#add_field_button', function(){ 
    var max_fields = 10; //maximum input boxes allowed
    var add_button = $("#add_field_button"); //Add button ID

    $('#eltmhmalession').append(tmimaselect);
    getlessons();
});


$(document).on('click', '.add_field_button_url', function(){ 
    	//$(".eltimagroup").append(tmimaselecturl);
    	$(this).parent().parent().append(tmimaselecturl);
});

$(document).on('click', '.del_field_button_url', function(){ 
	$(this).parent().prev('label.eltmimalessonurl').remove();
	//$(this).parent().find(".eltmimalessonurl").remove();
	//$(this).parent().parent().children('.eltmimalessonurldiv').closest().remove();
	$(this).parent().remove();
	//$(this).parent().prev('div.eltmimalessonurldiv').remove();
	//$('.eltmimagroup > div:last-child').remove();

	//$(document).children("div[class=eltmimalessonurldiv]:last").remove();
	//$(".eltmimagroup").children("div[class=eltmimalessonurldiv]:last").remove();
});

$(document).on('click', '.del_field_button', function(){ 
    var del = $(".del_field_button"); //Fields wrapper

	$(this).parent().parent().remove();


});

$(document).on('click', '#submit', function(){ 
    var newselect = $("#newselect option").filter(":selected").text();
    var onoma = $("#el-onoma").val();
    var epitheto = $("#el-epitheto").val();
    var email = $("#el-email").val();
    var unisxolh = $("#el-sxolh option").filter(":selected").text();
    var department = $("#el-idrima option").filter(":selected").text();
    var etmimalession = {};
    var c=0;
    $("#eltmhmalession .eltimagroup").each(function() {
	etmimalession[c] = {};
	etmimalession[c]["m"]=$(this).first().find("option:selected").text();
	etmimalession[c]["s"]=$(this).first().find('input').val();
	c++;
    });
    //var etmimalessionstring = JSON.stringify(etmimalession);
    $.ajax({
        url: API+'mathima',
        type: 'POST',
        data:{"onoma":onoma,"epitheto":epitheto,"email":email,"newselect":newselect,"unisxolh":unisxolh,"department":department,"etmimalession":etmimalession},
        dataType: 'json',
    	success: function (data, statusText, resObject) {
                        //.append($("<option></option>") .attr("value", d.id) .text(d.lesson));
        }
    });
});

});

