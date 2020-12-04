document.addEventListener("DOMContentLoaded", function() {

//var consumable_condition = null;
//    function initialize(){
//        $(document).tooltip({
//            content: function () {
//                return this.getAttribute("title");
//            },
//            position: {
//                my: "left top-10",
//                at: "right top",
//                collision: "flipfit"
//            },
//            classes: {
//                "ui-tooltip": "definition"
//            }
//        
//        });
//        
//        //randomize what dataset/condition the participant is in?
//
//        if ("c_set" in variables && variables['c_set'].length > 0) {
//          getConsumables("explainable_ai", variables['c_set'], 1, setCondition);
//        } else {
//          var d = jsPsych.randomization.sampleWithoutReplacement(["Census", "Compas"],1)[0]
//          var c = jsPsych.randomization.sampleWithoutReplacement(["Control", "AI", "AI_expl"],1)[0]
//          conditionReady(d,c);
//        }
//    }
//
//    function setCondition(c, err) {
//        consumable_condition = c;
//        c = JSON.parse(c[0]);
//        //console.log("setCondition",c);
//        conditionReady(c[0],c[1]);
//    }

    //function conditionReady(d,c) {
    
    //try to get the screen size here
    windowHeight = window.innerHeight;
    console.log(windowHeight);
    
    var conditions = ["SL","WL","Toggle"];    

    var condition = jsPsych.randomization.sampleWithoutReplacement(conditions, 1)[0]
        //var condition = c;
        
    console.log("condition:", condition);
    
    unitDefault = "meters";
    unitChoices = ["meters", "feet"];
    
    visibilityArray = [];
    visStimuli = [];
    for (var i = 10; i < 255; i+=5) {
                imgname = i + "m.jpg"
                visibilityArray.push("images/" + imgname);   
                visStimuli.push({stimulus: "images/" + imgname})
            }
    
    
    
    
    //use "/attachment/ to get image files in VS"
//    var test_stimuli = [
//      { stimulus: "WL_Stim_1.png"},
//    ];
    
//    for (var i=0; i<setSizes.length; i++) {
//    for (var j=1; j<=nreps; j++){
//        stimuli.push("/attachment/" + setSizes[i] + "present" + j + ".png");
//        stimuli.push("/attachment/" + setSizes[i] + "absent" + j + ".png");
//    }
//}
    
    //Need to assign a condition
    //Probably need to force full screen/ask mike what min pixel dimensions should be
    //should there be a maximum too? probably.
    //get data in the format we want
    //still need instructions
    //still need staircase procedure
    //for toggle condition, need to aggregate the time spent in each view, number of switches, final view
    //maybe give them the negative on the orientation?
    //add demographics collection
    
    
    allvars = {
        distances: [15,25,50,75,100,150,200],
        orientations: [0,-10,-20,-30],
        numbers: [1,3,6],
        estimate_types: ["Distance", "Orientation", "Number"]
    }
    
    combos = jsPsych.randomization.factorial(allvars, 1);
    
    nunique = combos.length/3
    
    images = [];
    views = [];
   
    ntrials = 10;
    instructions = "<p>In today's task, you will view an image of a park with virtual icons to indicate the location of hypothetical team mates.</p><p>"
    switch (condition){
        case "SL":
            views = jsPsych.randomization.sampleWithReplacement(["SL"],combos.length);
            for (var i = 0; i < combos.length; i++) {
                tempstr = combos[i].numbers + "_" + combos[i].orientations + "_" + combos[i].distances + "_sl.jpg";
                images.push("images/" + tempstr);    
            }
            instructions +=  "These icons will appear on a mini-map visible within the image." 
            instruct_image = "SL.PNG"
            break;
        case "WL":
            views = jsPsych.randomization.sampleWithReplacement(["WL"],combos.length);
            for (var i = 0; i < nunique; i++) {    
                tempstr = combos[i].numbers + "_" + combos[i].orientations + "_" + combos[i].distances + "_wl.jpg";
                images.push("images/" + tempstr);
            }
            instructions +=  "These icons will appear in the image at the location of your team mate."
            instruct_image = "WL.PNG"
            break;
        case "Toggle":
            var firstviews1 = jsPsych.randomization.sampleWithReplacement(["_sl.jpg"], combos.length/2)
            var firstviews2 = jsPsych.randomization.sampleWithReplacement(["_wl.jpg"], combos.length/2)
            firstviews = jsPsych.randomization.sampleWithoutReplacement(firstviews1.concat(firstviews2),combos.length)
//            firstviews.push(jsPsych.randomization.sampleWithReplacement(["_wl.png"],combos.length/2));
            for (var i = 0; i < nunique; i++) {    
                tempstr = combos[i].numbers + "_" + combos[i].orientations + "_" + combos[i].distances + firstviews[i];
                console.log(tempstr);
                images.push("images/" + tempstr);
                if (firstviews[i] == "_sl.jpg"){
                    views.push("SL")
                } else {
                    views.push("WL")
                }    
            }
            instructions +=  "You can choose whether these icons appear in the image at the location of your team mate, or on a mini-map visible within the image." 
            instruct_image = jsPsych.randomization.sampleWithReplacement(["SL.PNG","WL.PNG"],1);
    }
    
    instructions += "</p><p>In this experiment you will be asked to estimate the distance to the average location of the icons, estimate the heading (from your location) to the average location of the icons, or identify how many icons are visible.</p>"
    // }
    test_stimuli = [];
    for (var i = 0; i < images.length; i++) {
        if (condition == "Toggle"){
            test_stimuli.push({
                stimulus: images[i],
                estimate_type: combos[i].estimate_types,
                data: {condition: condition, view: views[i], distance: combos[i].distances, orientation: combos[i].orientations, number: combos[i].numbers, estimate_type: combos[i].estimate_types, nswitches: 0, time_in_SL: 0, time_in_WL: 0, firstview: "", lastview: ""}
            })
        } else {
            test_stimuli.push({
                stimulus: images[i],
                estimate_type: combos[i].estimate_types,
                data: {condition: condition, view: views[i], distance: combos[i].distances, orientation: combos[i].orientations, number: combos[i].numbers, estimate_type: combos[i].estimate_types, nswitches: 0, time_in_SL: 0, time_in_WL: 0, firstview: views[i], lastview: views[i]}
            })
        }
    }
                

//        /* create timeline */
        var timeline = []; 
//        
//
var skipinstructions = {
    type: 'html-button-response',
    stimulus: '<p>Condition: ' + condition + '</p><p>Just for testing: Skip instructions?</p>',
    choices: ['yes','no']
}    
timeline.push(skipinstructions);
var instructionset1 = {
    type: 'instructions',
    pages: [
        instructions,
        '<img src=' + instruct_image + '></img>',
         'To estimate distances, enter the distance (in any metric you feel comfortable) into the text-field. Please indicate which metric you are using by selecting the metric in the drop-down menu. If multiple icons are visible, please indicate the average distance to the icons.',
        'image with 2 icons and 10m distance indicated',
        'To help you calibrate distances in the image, you will see a flag located 10m from your location. Please estimate the average distance to the two targets.<br><br><div class = "estimate">Distance: <input id = "mynumberinput" name="estimate" type="number" required/></div><div class = "estimate"><input name="unit" type="radio" value = "feet" id = "feet"> <label for = "feet">Feet</label><br><input type="radio" name="unit" value="meters" id="meters"><label for="meters"> Meters</label></div><br>',
        'The actual distance was 20m (translate to other units?)',
        'To estimate heading, enter your response, in degrees, into the text field. If multiple icons are visible, please enter the average heading of the icons.',
        'image with 2 icons and orientation lines',
        'To help calibrate headings, we are displaying a line that indicates 0 degrees (or straight ahead) and one indicating 10 degrees to the left. Please practice estimating the heading to the two visible targets',
        'To estimate the quantity of icons, please enter the number of icons you see',
        'Image with 2 icons (same as above',
        'Allow participants to enter estimate, provide “2” for feedback'
    ],
    show_clickable_nav: true
}

var if_node = {
    timeline: [instructionset1],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which key was pressed
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.button_pressed == 0){
            return false;
        } else {
            return true;
        }
    }
}
    
    timeline.push(if_node);
    
        
        var questionPrompt = {
          type: "html-keyboard-response",
          stimulus: function(){
              var temp_html = "<p> You will be asked to estimate <span style='color:red;font-weight: bold'>" + jsPsych.timelineVariable('estimate_type',true) + "</span></p>"
              return temp_html;
          },
          choices: jsPsych.NO_KEYS,
          trial_duration: 500,
          post_trial_gap: 500
          };
    
        var image = {
          type: "image-button-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ["Ready"],
          post_trial_gap: 250,
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data){
                if (data.view == "WL"){
                    time_in_WL += data.rt;
                } else {
                    time_in_SL += data.rt;
                }

                console.log("time in WL: " + time_in_WL);
                console.log("time in SL: " + time_in_SL);
                
            },
          };
 
    var nswitches = 0;
    var firstview = "?";
    var lastview = "?";
    var time_in_SL = 0;
    var time_in_WL = 0;
    
    var toggle_image = {
        on_start: function(trial){
            if (jsPsych.data.get().last(1).values()[0].view == "WL"){
                trial.stimulus = trial.stimulus.replace("wl", "sl");
    //            var tempswitches = trial.data.nswitches
    //            console.log(tempswitches, tempswitches+1);
                trial.data = {view: "SL", nswitches: nswitches};

            } else if (jsPsych.data.get().last(1).values()[0].view == "SL"){
                trial.stimulus = trial.stimulus.replace("sl", "wl");
    //            var tempswitches = trial.data.nswitches
                trial.data = {view: "WL", nswitches: nswitches};
            } else {
                firstview = trial.data.view;
            }
        },
        
        on_finish: function(data){
            if (data.view == "WL"){
                time_in_WL += data.rt;
            } else {
                time_in_SL += data.rt;
            }
            console.log("time in WL: " + time_in_WL);
            console.log("time in SL: " + time_in_SL);
                
        },
        type: "image-button-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ["Toggle View", "Ready"],
          post_trial_gap: 250,
        data: jsPsych.timelineVariable('data')
        
    }
        
    
    var loop_node = {

        timeline: [toggle_image],
        loop_function: function(data){
            if(data.values()[0].button_pressed == 0){
    //            console.log(data.values()[0].stimulus)
                nswitches++;
                console.log(nswitches);

                return true;
            } else {
//                console.log(nswitches);
//                console.log(firstview);
                lastview = jsPsych.data.get().last(1).values()[0].view;
//                console.log(lastview);
                var toggled_data = jsPsych.data.get().last(nswitches + 1);
                    console.log(toggled_data.csv());
                return false;
            }
        }
    }
    
    estimate_html1 = '<p> <div class = "estimate">'
    estimate_html2 = ': <input id = "mynumberinput" name="estimate" type="number" required/>'
    estimate_html3 = '</div><div class = "estimate"><input name="unit" type="radio" value = "feet" id = "feet"> <label for = "feet">Feet</label><br><input type="radio" name="unit" value="meters" id="meters"><label for="meters"> Meters</label><br>'
    estimate_html4 = '</div></p>'
    
    var form_trial = {
        type: 'survey-html-form',
        post_trial_gap: 500,
        on_load: function() {
            document.getElementById("mynumberinput").focus();

            radiobtn = document.getElementById(unitDefault);
                if (radiobtn != null){
                    console.log(radiobtn);
                radiobtn.checked = true;
                }
        },
    
        html: function(){
            var temp_type = jsPsych.timelineVariable('estimate_type',true)
            var temp_html = estimate_html1 + temp_type + estimate_html2;
            if (temp_type == "Distance"){
                temp_html += estimate_html3;
            } else if (temp_type == "Orientation"){
                temp_html += '&nbspdegrees';
            } 
            
            temp_html += estimate_html4;
            return temp_html;
        },
        
        data: jsPsych.timelineVariable('data'),
        on_finish: function(data){
            if(condition == "Toggle"){
                //console.log(nswitches);
                //var toggled_data = jsPsych.data.get().last(nswitches + 1);
                //console.log(toggled_data.csv());
                //console.log(jsPsych.data.getLastTimelineData().csv());
                
                data.firstview = firstview;
                data.lastview = lastview;
                
//            } else if(condition == "WL"){
//                data.time_in_WL = time_in_WL;
//            } else {
//                data.time_in_SL = time_in_SL;
            }
            
            data.nswitches = nswitches;
            nswitches = 0;
            data.time_in_WL = time_in_WL;
                data.time_in_SL = time_in_SL;
                time_in_SL = 0;
                time_in_WL = 0;
        
            if(data.estimate_type == "Distance"){
                unitDefault = JSON.parse(data.responses).unit;
            }
        
        }
    };
    


    if (condition == "Toggle"){
        var test_procedure = {
          timeline: [questionPrompt, loop_node, form_trial],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 1,
            sample: {
                type: 'without-replacement',
                size: ntrials,
            }
        }
    } else {
        
        var test_procedure = {
          timeline: [questionPrompt, image, form_trial],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 1,
            sample: {
                type: 'without-replacement',
                size: ntrials,
            }
        }
    
    };
        //timeline.push(test_procedure);
    
    var if_node2 = {
    timeline: [test_procedure],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which key was pressed
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.button_pressed == 0){
            return false;
        } else {
            return true;
        }
    }
}
    var skiptovis = {
    type: 'html-button-response',
    stimulus: '<p>Condition: ' + condition + '</p><p>Just for testing: Skip to visibility test?</p>',
    choices: ['yes','no']
}    
timeline.push(skiptovis);
    
    timeline.push(if_node2);
    
    var visibilityimage = {
        type: "image-button-response",
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: ["Stop"],
        trial_duration: 500,
        prompt: "stop"
        
    }
    
        var vis_procedure = {
          timeline: [visibilityimage],
          timeline_variables: visStimuli,
          randomize_order: false,
          repetitions: 1
        }
    //how to stop the procedure if they press a button?
    
     timeline.push(vis_procedure);
    
    var age_options = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
    var gender_options = ["Male", "Female"];
    var yn_options = ["Yes", "No"];

        
        var demographics = {
            type: "survey-multi-choice",
            questions: [
                {prompt: "How old are you?", name: 'Age', options: age_options, required:true}, 
                {prompt: "What is your gender?", name: 'Gender', options: gender_options, required: true},
                {prompt: "Do you have any prior military experience?", name: 'Mil', options: yn_options, required: true},
                {prompt: "Do you have any prior law enforcement experience?", name: 'Law', options: yn_options, required: true},
                {prompt: "Do you have any form of color blindness?", name: 'Col', options: yn_options, required: true}
            ],
            data: {test_part: 'demographics'}
        };
        timeline.push(demographics);

//        
        jsPsych.init({
            // display_element: "explainable_ai",
            timeline: timeline,
            preload_images: images.concat(visibilityArray),
            exclusions: {
                min_width: 1000,
                min_height: 550
              },
            experiment_width: (windowHeight - 50) * 1.78,
            on_finish: function() {
                
        //jsPsych.data.displayData();
                jsPsych.data.get().filter([{trial_type: 'survey-html-form'}, {trial_type: 'survey-multi-choice'}]).ignore(['trial_type','trial_index','time_elapsed,','internal_node_id']).localSave('csv');
      
            //console.log(jsPsych.data.get().filter({trial_type: 'image-button-response'}).csv());
            //console.log(jsPsych.data.get().filter([{test_part: 'practice'}, {test_part: 'test'}, {test_part: 'confidence'}, {test_part: 'demographics'}, {test_part: 'freeresponse'}]).ignore('stimulus').csv());
            //submit(jsPsych.data.get().filter([{test_part: 'practice'}, {test_part: 'test'}, {test_part: 'confidence'}, {test_part: 'demographics'}, {test_part: 'freeresponse'}]).ignore('stimulus').csv());
            //if ("c_set" in variables && variables['c_set'].length > 0) {
            //  setConsumables("explainable_ai", variables['c_set'], consumable_condition);
            //} 
            //payAMT(true, 0.0, true);
            }
       });
//       }
    
})