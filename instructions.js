instruct_images = {
    SL: "images/Instructions_SL_JustMarkers.jpg", 
    WL: "images/Instructions_WL_JustMarkers.jpg"
};

instruct_text = {
    SL: 'on a mini-map visible within the image', 
    WL: 'in the image at the location of your teammates'
}

instruct0 = "<p>In today's task, you will view an image of a park with virtual icons to indicate the location of hypothetical teammates.</p>";
//instruct1 = 'These icons will appear ';
instruct3 = 'You will be asked to estimate the <b>distance</b> to the average location of the icons, estimate the <b>heading</b> (from your location) to the average location of the icons, or identify the <b>number</b> of icons that are visible.</p>';
instruct4 = 'To estimate distances, enter the distance (in any metric you feel comfortable) into the text-field. <p>Please indicate which metric you are using by selecting the metric in the drop-down menu.</p><p>If multiple icons are visible, please indicate the average distance to the icons.</p>';
instruct5 = '<p>Please estimate the average <b>distance</b> to the targets.</p>';
instruct7 = 'The distance is 50m or 164ft</p>'
instruct8 = 'To estimate heading, enter your response, in degrees, into the text field. If multiple icons are visible, please enter the average heading of the icons.'
instruct9 = '<p>Please estimate the average <b>heading</b> to the targets.</p>';
instruct11 = 'The heading is -10 degrees';
instruct12 = '<p>Please estimate the <b>number</b> of targets.</p>';
instruct14 = 'There are 3 targets shown';
    
//make a function to put the instructions together
function makeInstructions(condition, width1, width2, width3, width4, order = ['SL','WL']) {
    console.log(width3)
    var invisp = '<p class = "invis">'
    var visp = '<p>'
    
    if (condition == "Toggle"){
        var temp1 = 'You can choose whether these icons will appear ' + instruct_text[order[0]] + ', or ' + instruct_text[order[1]] + '</p>';
        var temp2 = '<img src=' + instruct_images[order[0]] + ' style="max-width:' + width3 + ';height:auto;padding:5px;"></img><img src=' + instruct_images[order[1]] + ' style="max-width:' + width3 + ';height:auto;padding:5px;"></img></p>';
        var temp6 = '<img src=' + 'images/' + order[0] + '_DistanceExample.jpg style="max-width:' + width4 + ';height:auto;padding:5px"/><img src=' + 'images/' + order[1] + '_DistanceExample.jpg style="max-width:' + width4 + ';height:auto;padding:5px"/></p>';
        var temp10 = '<img src=' + 'images/' + order[0] + '_HeadingExample.jpg style="max-width:' + width4 + ';height:auto;padding:5px"/><img src=' + 'images/' + order[1] + '_HeadingExample.jpg style="max-width:' + width4 + ';height:auto;padding:5px"/></p>';
        var temp13 = '<img src=' + instruct_images[order[0]] + ' style="max-width:' + width4 + ';height:auto;padding:5px"/><img src=' + instruct_images[order[0]] + ' style="max-width:' + width4 + ';height:auto;padding:5px"/></p>';
    } else {
        var temp1 = 'These icons will appear ' + instruct_text[condition] + '</p>';
        var temp2 = '<img src=' + instruct_images[condition] + ' style="max-width:' + width1 + ';height:auto;"/></p>';
        var temp6 = '<img src=' + 'images/' + condition + '_DistanceExample.jpg style="max-width:' + width2 + ';height:auto;"/></p>'; 
        var temp10 = '<img src=' + 'images/' + condition + '_HeadingExample.jpg style="max-width:' + width2 + ';height:auto;"/></p>'; 
        var temp13 = '<img src=' + instruct_images[condition] + ' style="max-width:' + width2 + ';height:auto;"/></p>';
    }
    

    
    var temparray = [
        instruct0 + invisp + temp1 + invisp + temp2 + invisp + instruct3,
        instruct0 + visp + temp1 + invisp + temp2 + invisp + instruct3,
        instruct0 + visp + temp1 + visp + temp2 + invisp + instruct3,
        instruct0 + visp + temp1 + visp + temp2 + visp + instruct3,
        instruct4, 
        instruct5 + invisp + temp6 + invisp + instruct7,
        instruct5 + visp + temp6 + invisp + instruct7,
        instruct5 + visp + temp6 + visp + instruct7,
        instruct8,
        instruct9 + invisp + temp10 + invisp + instruct11,
        instruct9 + visp + temp10 + invisp + instruct11,
        instruct9 + visp + temp10 + visp + instruct11,
        instruct12 + invisp + temp13 + invisp + instruct14,
        instruct12 + visp + temp13 + invisp + instruct14,
        instruct12 + visp + temp13 + visp + instruct14,
    ]
    
    return(temparray);
}


