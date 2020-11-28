$("#bmiTableButton").click(function(){
    $("#bmiTable").toggleClass("collapse pt-3 pb-5");
});

$('[data-toggle="info"]').popover();

function getWeightLimit(factor, height) {
    let limit = (factor / 1.3) * Math.pow(height / 100, 2.5);
    limit = (limit.toFixed(0));
    return limit;
}

function getAge(byear) {
    let currentDate = new Date(); 
    let year = currentDate.getFullYear();

    let age = year - byear;
    if (age > 20 && age < 60) {
        return age;
    } else {
        $("#warning").modal('show');
        $("#warning #modalHeader").html("Error!")
        $("#warning #modalBody").html("<p>BMI is only for people between the ages of 20 and 60!</p>")
        return;
    };
}

function isNumberKey(evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
    return false;
    return true;
}  

$("#getBmi").click(function(bmifunction){
    let byear = $("#byear").val();
    getAge(byear);
    let weight = $("#weight").val();
    let height = $("#height").val();

    if ( $("#weight").val() === "" || $("#byear").val() === "" ||  $("#height").val() === "") {
            
        $("#warning").modal('show');
        $("#warning #modalHeader").html("No set input")
        $("#warning #modalBody").html("<p>Please set numerical input to the BMI fields!</p>")
        return;
    }

    let bmi = weight / Math.pow(height, 2.5) * 1.3 * 100000;
    let normalWeightLow = getWeightLimit(18.5, height);
    let normalWeightUpper = getWeightLimit(24.9, height);

    $("#bmiresult").val(bmi.toFixed(1));
    $("#normalweight").val(normalWeightLow + " - " + normalWeightUpper);

    if (bmi < 17) {
        $("#0").addClass("bg-danger text-white font-italic");
    }
    else if (bmi < 18.5) {
        $("#1").addClass("bg-warning text-white font-italic");
    }
    else if (bmi < 25) {
        $("#2").addClass("text-white bg-success");
    }
    else if (bmi < 30) {
        $("#3").addClass("bg-warning text-white font-italic");
    }
    else if (bmi < 35) {
        $("#4").addClass("bg-warning text-white font-weight-bold");
    }
    else if(bmi < 40) {
        $("#5").addClass("bg-danger text-white font-italic");
    }
    else {
        $("#6").addClass("bg-danger text-white font-weight-bold");
    }
});

$("#byear, #weight, #height").change(function(){
    $("#0").removeClass("bg-danger text-white font-italic");
    $("#1").removeClass("bg-warning text-white font-italic");
    $("#2").removeClass("text-white bg-success");
    $("#3").removeClass("bg-warning text-white font-italic");
    $("#4").removeClass("bg-warning text-white font-weight-bold");
    $("#5").removeClass("bg-danger text-white font-italic");
    $("#6").removeClass("bg-danger text-white font-weight-bold");

    $("#bmiresult").val("");
    $("#normalweight").val("");

});

$("[name=maleorfemale").click(function(){
    $("#fm").addClass("collapse");
    $("#m").addClass("collapse");

    $("#m1").removeClass("bg-success text-white");
    $("#m2").removeClass("bg-warning text-white font-italic");
    $("#m3").removeClass("bg-danger text-white font-weight-bold");
    $("#fm1").removeClass("bg-success text-white");
    $("#fm2").removeClass("bg-warning text-white font-italic");
    $("#fm3").removeClass("bg-danger text-white font-weight-bold");
    $("#noRisk").removeClass("bg-success text-white");
    $("#slightRisk").removeClass("bg-warning text-white font-italic");
    $("#greatRisk").removeClass("bg-danger text-white font-weight-bold");

    let value = Number($("[name=maleorfemale]:checked").val());

    if (value === 1) {
        $("#m").removeClass("collapse");
    } else{
        $("#fm").removeClass("collapse");
    }
    
});

$("#waistButton").click(function(){
    let waist = $("#waist").val();
    if ( $("#waist").val() === "") {
            
        $("#warning").modal('show');
        $("#warning #modalHeader").html("Please set input!")
        $("#warning #modalBody").html("<p>Please set numerical input to Waist!</p>")
        return;
    }

    if ($("#fm").hasClass("collapse")) {
        if (waist < 90) {
            $("#m1").addClass("bg-success text-white");
            $("#noRisk").addClass("bg-success text-white");
        } else if (waist < 101) {
            $("#m2").addClass("bg-warning text-white font-italic");
            $("#slightRisk").addClass("bg-warning text-white font-italic");
        } else {
            $("#m3").addClass("bg-danger text-white font-weight-bold");
            $("#greatRisk").addClass("bg-danger text-white font-weight-bold");
        }
    }

    if ($("#m").hasClass("collapse")) {
        if (waist < 80) {
            $("#fm1").addClass("bg-success text-white");
            $("#noRisk").addClass("bg-success text-white");
        } else if (waist < 91) {
            $("#fm2").addClass("bg-warning text-white font-italic");
            $("#slightRisk").addClass("bg-warning text-white font-italic");
        } else {
            $("#fm3").addClass("bg-danger text-white font-weight-bold");
            $("#greatRisk").addClass("bg-danger text-white font-weight-bold");
        }
    }
});

$("#waist").change(function(){
$("#m1").removeClass("bg-success text-white");
$("#m2").removeClass("bg-warning text-white font-italic");
$("#m3").removeClass("bg-danger text-white font-weight-bold");
$("#fm1").removeClass("bg-success text-white");
$("#fm2").removeClass("bg-warning text-white font-italic");
$("#fm3").removeClass("bg-danger text-white font-weight-bold");
$("#noRisk").removeClass("bg-success text-white");
$("#slightRisk").removeClass("bg-warning text-white font-italic");
$("#greatRisk").removeClass("bg-danger text-white font-weight-bold");
});