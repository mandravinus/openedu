
//var DATA; 
//var API = "http://127.0.0.1/";   
//indexconfig.js
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
    var NEWSELECT='';


$('#newselect').on('change', function () {
    var newselect = $("#newselect option").filter(":selected").text();
    if(newselect == 'Διοικητικό Προσωπικό'){
        $('#el-sxolh').attr("disabled", true);
	$('#tmimaerg').empty();
	$('#tmimaerg1').empty();
        NEWSELECT = 'dioikitiko';
    }else if(newselect == 'Μεταπτυχιακός φοιτητής'){
        $('#el-sxolh').attr("disabled", true);
	$('#tmimaerg').empty();
	$('#tmimaerg1').empty();
	$('#tmimaerg').append(tmimaerg);
        NEWSELECT = 'meta';
    }else{
	$('#tmimaerg').empty();
	$('#tmimaerg1').empty();
	$('#tmimaerg').append(tmimaerg);
        NEWSELECT = 'allo';
    }
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
	if(NEWSELECT == 'dioikitiko'){
		$('#eltmhmalession').empty();
		$('#eltmhmalession').append(tmimaselecturl);
		$('#add_field_button').remove();
		$('.del_field_button_url').remove();
	}else if(NEWSELECT == 'meta'){
		$('#eltmhmalession').empty();
		$('#eltmhmalession').append(tmimaselecturlmeta);
		$('#add_field_button').remove();
		$('#eltmhmalessionadd').prepend(tmimaselect1);
		//$('#add_field_button').remove();
	}else{
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
	}
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
tmimaselect +='<input class="form-control input-sm eltmimalessonurl" value="" name="erga[]" placeholder="ΤΟΠΟΘΕΣΙΑ ΑΝΟΙΧΤΗΣ ΤΕΧΝΟΛΟΓΙΑΣ/ΛΟΓΙΣΜΙΚΟΥ/ΠΕΡΙΕΧΟΜΕΝΟΥ" type="text">';

tmimaselect +='<button class="del_field_button" type="button" style="color:blue">Διαγραφή μαθήματος</button>';
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

tmimaselecturlmeta ='<label class="bg-info eltmimalessonurl control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">Τμήμα </label>';
tmimaselecturlmeta +='<div class="eltmimalessonurldiv eltmimalessonurl col-xs-12 col-sm-12 col-md-9">';
tmimaselecturlmeta +='<input class="form-control input-sm eltmimalesson eltmimalessonurl" value="" name="erga[]" placeholder="Tμήμα" type="text">';
tmimaselecturlmeta +='</div>';
tmimaselecturlmeta +='<label class="eltmimalessonurl control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">Τίτλος μεταπτυχιακού </label>';
tmimaselecturlmeta +='<div class="eltmimalessonurldiv eltmimalessonurl col-xs-12 col-sm-12 col-md-9">';
tmimaselecturlmeta +='<input class="form-control input-sm eltmimalesson eltmimalessonurl" value="" name="erga[]" placeholder="όνομα μεταπτυχιακού προγράματος" type="text">';
tmimaselecturlmeta +='</div>';
tmimaselecturlmeta +='<label class="eltmimalessonurl control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">Μάθημα </label>';
tmimaselecturlmeta +='<div class="eltmimalessonurldiv eltmimalessonurl col-xs-12 col-sm-12 col-md-9">';
tmimaselecturlmeta +='<input class="form-control input-sm eltmimalesson eltmimalessonurl" value="" name="erga[]" placeholder="Μάθημα" type="text">';
tmimaselecturlmeta +='</div>';

tmimaselecturlmeta +='<label class="eltmimalessonurl control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">ΑΝΟΙΧΤΗ ΤΕΧΝΟΛΟΓΙΑ </label>';
tmimaselecturlmeta +='<div class="eltmimalessonurldiv eltmimalessonurl col-xs-12 col-sm-12 col-md-9">';
tmimaselecturlmeta +='<input class="form-control input-sm eltmimalesson eltmimalessonurl" value="" name="erga[]" placeholder="ΑΝΟΙΧΤΗ ΤΕΧΝΟΛΟΓΙΑ/ΛΟΓΙΣΜΙΚΟ/ΠΕΡΙΕΧΟΜΕΝΟ" type="text">';
tmimaselecturlmeta +='<input class="form-control input-sm eltmimalessonurl" value="" name="erga[]" placeholder="ΤΟΠΟΘΕΣΙΑ ΑΝΟΙΧΤΗΣ ΤΕΧΝΟΛΟΓΙΑΣ/ΛΟΓΙΣΜΙΚΟΥ/ΠΕΡΙΕΧΟΜΕΝΟΥ" type="text">';
tmimaselecturlmeta +='<button class="del_field_button" type="button" style="color:blue">Διαγραφή μαθήματος</button>';
tmimaselecturlmeta +='<button class="add_field_button_url pull-right eltmimalessonurl" type="button" style="color:blue;">Προσθήκη τεχνολογίας</button>';
tmimaselecturlmeta +='<div class="eltmimalessonurl" style="margin-top:5px"> &nbsp; </div>';
tmimaselecturlmeta +='</div>';
tmimaselecturlmeta +='</div>';
tmimaselecturlmeta +='</div>';

tmimaerg =  '<p>Συμμετέχετε σε καποιο εργαστήριο/ερευνητική ομάδα στο ίδρυμα σας, που ασχολείται ή χρησιμοποιεί Ανοιχτές τεχνολογίες , Ανοιχτό λογισμικό ή περιεχόμενο?</p>';
tmimaerg +=  '	<div class="row">';
tmimaerg += '		<div class="col-sm-6">';
tmimaerg += '		    <div class="radio radio-inline">';
tmimaerg += '			<input class="radio1" name="radio1" id="radio1" value="option1" checked="" type="radio">';
tmimaerg += '			<label for="radio1">';
tmimaerg += '			    Οχι';
tmimaerg += '			</label>';
tmimaerg += '		    </div>';
tmimaerg += '		    <div class="radio radio-inline">';
tmimaerg += '			<input class="radio1" name="radio1" id="radio2" value="option2" type="radio">';
tmimaerg += '			<label for="radio2">';
tmimaerg += '			    Ναι';
tmimaerg += '			</label>';
tmimaerg += '		    </div>';
tmimaerg += '		</div>';
tmimaerg += '	</div>';
tmimaerg += '<div  style="margin-top:5px"> &nbsp; </div>';

tmimaerg1 ='<label class="control-label hidden-xs hidden-sm col-md-5" for="el-tmhma"> Όνομα εργαστηρίου/ Ερευνητικής ομάδας </label>';
tmimaerg1 +='<div class="col-xs-12 col-sm-15 col-md-20">';
tmimaerg1 +='<input class="form-control input-sm eltmimalesson" value="" name="erga[]" placeholder="Όνομα εργαστηρίου/ Ερευνητικής ομάδας" type="text">';
tmimaerg1 += '</div>';

tmimaerg1 +='<label class="control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">ΔΡΑΣΤΗΡΙΟΤΗΤΑ </label>';
tmimaerg1 +='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaerg1 +='<input class="form-control input-sm eltmimalesson" value="" name="erga[]" placeholder="ΔΡΑΣΤΗΡΙΟΤΗΤΑ" type="text">';
tmimaerg1 += '</div>';

tmimaerg1 +='<label class="control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">Περιγραφή</label>';
tmimaerg1 +='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaerg1 +='<input class="form-control input-sm eltmimalesson" value="" name="erga[]" placeholder="Περιγραφή δράσης" type="text">';
tmimaerg1 += '</div>';

tmimaerg1 +='<label class="control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">ΥΠΕΥΘΥΝΟΣ</label>';
tmimaerg1 +='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaerg1 +='<input class="form-control input-sm eltmimalesson" value="" name="erga[]" placeholder="ΥΠΕΥΘΥΝΟΣ ΕΡΓΑΣΤΗΡΙΟΥ/ΟΜΑΔΑΣ" type="text">';
tmimaerg1 += '</div>';

tmimaerg1 +='<label class="control-label hidden-xs hidden-sm col-md-3" for="el-tmhma">ΙΣΤΟΣΕΛΙΔΑ</label>';
tmimaerg1 +='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaerg1 +='<input class="form-control input-sm eltmimalesson" value="" name="erga[]" placeholder="ΙΣΤΟΣΕΛΙΔΑ ΕΡΓΑΣΤΗΡΙΟΥ ΟΜΑΔΑΣ" type="text">';
tmimaerg1 += '</div>';

tmimaselect1 ='<div class="col-xs-12 col-sm-12 col-md-9">';
tmimaselect1 +='<button id="add_field_button" class="btn btn-lg btn-primary" type="button" name="buttonerga[]">Προσθήκη Επιπλέον Μαθήματος</button>';
tmimaselect1 +='</div>';

$('#el-sxolh').on('change', function () {
    var key = this.value;
    var unisxolh = $("#el-sxolh option").filter(":selected").text();
    var department = $("#el-idrima option").filter(":selected").text();
    if(NEWSELECT == 'dioikitiko'){
    }else if(NEWSELECT == 'meta'){
    }else{
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
			var selectlesson = $('#eltmhmalession').find("select:last");
			$.each(data.result.data, function(index, d){
				selectlesson.append($("<option></option>")
						    .attr("value", d.id)
						    .text(d.lesson));
			});
		}
	    });
    }
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
    if(NEWSELECT == 'meta'){
    	$('#eltmhmalession').append(tmimaselecturlmeta);
    }else{
    	$('#eltmhmalession').append(tmimaselect);
    	getlessons();
    }
});

$(document).on('change', '.radio1', function(){ 
	var radio = $('input[name=radio1]').filter(':checked').val();;
	if(radio == "option1"){
    		$('#tmimaerg1').empty();
	}
	if(radio == "option2"){
    		$('#tmimaerg1').append(tmimaerg1);
	}


});

$(document).on('click', '.add_field_button_url', function(){ 
    	$(this).parent().parent().append(tmimaselecturl);
});

$(document).on('click', '.del_field_button_url', function(){ 
	$(this).parent().prev('label.eltmimalessonurl').remove();
	$(this).parent().remove();
});

$(document).on('click', '.del_field_button', function(){ 
    	var del = $(".del_field_button"); //Fields wrapper
	//$(this).parent().parent().remove();
        $("#eltmhmalession").empty();	
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
    var cc=0;
    $("#eltmhmalession .eltimagroup").each(function(i, obj) {
		etmimalession[i] = {};
		etmimalession[i]["m"]=$(this).first().find("option:selected").text();
		etmimalession[i]["s"]=$(this).first().find('input').val();
		c++;
    	$("#eltmhmalession .eltmimalesson").each(function(i, obj) {
		//alert($(this).val());
    	});
    	$("#eltmhmalession .eltmimalessonurl").each(function(i, obj) {
		//alert($(this).val());
    	});
    });
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

