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
    
    var conditions = ["SL","WL","Toggle"];  
    

    var condition = jsPsych.randomization.sampleWithoutReplacement(conditions, 1)[0]
        //var condition = c;
    var toggleInstrOrder = jsPsych.randomization.sampleWithoutReplacement(['SL','WL'], 2);
        
    console.log("condition:", condition);
    
    window.addEventListener('resize', function(event){
        mainwidth = getdims();
        console.log(widths);
    });

    
    mainwidth = getdims();
        
    function getdims() {
        
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth * .95;
        console.log(windowWidth);
        
        var mwtest = (windowHeight - 50) * 1.78;    
        if (mwtest > windowWidth){
            mwtest = windowWidth;
        }
        
        var mw = (windowHeight - 265)* 1.78;
        if (mw > windowWidth){
            mw = "100%"
        } else {
            mw = mw/windowWidth * 100 + "%";        
        }

        var mw2 = (windowHeight - 191)* 1.78;
        if (mw2 > windowWidth){
            mw2 = "100%"
        } else {
            mw2 = mw2/windowWidth * 100 + "%";
        }
        
        var mw3 = (windowHeight - 265) * 1.78 * 2 + 20;
        if (mw3 > windowWidth){
            mw3 = (windowWidth - 20)/(2* windowWidth) * 100 + "%";
        } else {
            mw3 = mw3/windowWidth * 100 + "%";
        }
        
        var mw4 = (windowHeight - 191) * 1.78 * 2 + 20;
        if (mw4 > windowWidth){
            mw4 = (windowWidth - 20)/(2* windowWidth) * 100 + "%";
        } else {
            mw4 = mw4/windowWidth * 100 + "%";
        }
        
        //update instruction image widths
        instructarray1 = makeInstructions(condition, mw, mw2, mw3, mw4, toggleInstrOrder);

        return(mwtest)
    }
        
    
    
    unitDefault = "meters";
    unitChoices = ["meters", "feet"];
    
    visibilityArray = [];
    visibilityArray2 = [];
    //visStimuli = [];
    for (var i = 10; i < 255; i+=5) {
        imgname = i + "m.jpg"
        visibilityArray.push("images/" + imgname);
        visibilityArray.push("images/Experiment_Background.jpg")
              //  visStimuli.push({stimulus: "images/" + imgname, data: {test_part: "visibility_image"}})
        visibilityArray2.push("images/" + imgname);
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
  
    //Probably need to force full screen/ask mike what min pixel dimensions should be
    //get data in the format we want
    //maybe give them the negative on the orientation?
    //fix instructions
    //tweak data collection on visibility test
    //record which image shown first in instructions (toggle)
    //make toggle instructions side by side the whole time, no interaction
    //if using spaced out visibility option, figure out how to record the right distance if the hit the key when it's blank
    
    
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
   
    ntrials = 2;
    
    switch (condition){
        case "SL":
            views = jsPsych.randomization.sampleWithReplacement(["SL"],combos.length);
            for (var i = 0; i < combos.length; i++) {
                tempstr = combos[i].numbers + "_" + combos[i].orientations + "_" + combos[i].distances + "_sl.jpg";
                images.push("images/" + tempstr);    
            }
            break;
        case "WL":
            views = jsPsych.randomization.sampleWithReplacement(["WL"],combos.length);
            for (var i = 0; i < nunique; i++) {    
                tempstr = combos[i].numbers + "_" + combos[i].orientations + "_" + combos[i].distances + "_wl.jpg";
                images.push("images/" + tempstr);
            }
            break;
        case "Toggle":
            var firstviews1 = jsPsych.randomization.sampleWithReplacement(["_sl.jpg"], combos.length/2)
            var firstviews2 = jsPsych.randomization.sampleWithReplacement(["_wl.jpg"], combos.length/2)
            firstviews = jsPsych.randomization.sampleWithoutReplacement(firstviews1.concat(firstviews2),combos.length)
            for (var i = 0; i < nunique; i++) {    
                tempstr = combos[i].numbers + "_" + combos[i].orientations + "_" + combos[i].distances + firstviews[i];
                images.push("images/" + tempstr);
                if (firstviews[i] == "_sl.jpg"){
                    views.push("SL")
                } else {
                    views.push("WL")
                }    
            }
    }
    
    test_stimuli = [];
    tempviewdata = ""
    for (var i = 0; i < images.length; i++) {
        if (condition == "Toggle"){
            //tempviewdata = views[i];
        } 
        test_stimuli.push({
            stimulus: images[i],
            estimate_type: combos[i].estimate_types,
            data: {condition: condition, test_part: "estimate", view: views[i], distance: combos[i].distances, orientation: combos[i].orientations, number: combos[i].numbers, estimate_type: combos[i].estimate_types, nswitches: 0, time_in_SL: 0, time_in_WL: 0, //firstview: tempviewdata, lastview: tempviewdata}
                   firstview: "", lastview: ""}
        })
    }   

    /* create timeline */
    var timeline = []; 

    var skipinstructions = {
        type: 'html-button-response',
        stimulus: '<p>Condition: ' + condition + '</p><p>Just for testing: Skip instructions?</p>',
        choices: ['yes','no']
    }    
    timeline.push(skipinstructions);
    
    var instructionset1 = {
        type: 'instructions',
        pages: [],
        on_start: function(trial){
          //recalculate size of image on every trial, in case window size changed since start of exp
            trial.pages = instructarray1
        },
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
      on_start: function(trial){
          //recalculate size of image on every trial, in case window size changed since start of exp
          trial.stimulus_width = mainwidth;
      },
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
            trial.stimulus_width = mainwidth;
            if (jsPsych.data.get().last(1).values()[0].view == "WL"){
                trial.stimulus = trial.stimulus.replace("wl", "sl");
                trial.data = {view: "SL", nswitches: nswitches};

            } else if (jsPsych.data.get().last(1).values()[0].view == "SL"){
                trial.stimulus = trial.stimulus.replace("sl", "wl");
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
            //have one of the units selected by default (should be whatever the person picked last)
            radiobtn = document.getElementById(unitDefault);
            if (radiobtn != null){
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
                data.firstview = firstview;
                data.lastview = lastview;
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
    
    visDec = {
        prompt: 'Press any key when the target is no longer visible (Animation Option #1)', 
        stimulus: visibilityArray, 
        data: {condition: condition, test_part: 'visibility', order: "decreasing"}}
    visInc = {
        prompt: 'Press any key when the target becomes visible (Animation Option #1)', 
        stimulus: visibilityArray.slice().reverse(),
        data: {condition: condition, test_part: 'visibility', order: "increasing"}}     
    
    visStimuli = [visDec, visInc, visDec, visInc];
   
    
    var visibilityinstruct = {
        type: "html-button-response",
          stimulus: jsPsych.timelineVariable('prompt'),
          choices: ["Ready"],
          post_trial_gap: 100
    }
    
    var visibilityanim = {
        type: "animation2",
        on_start: function(trial){
          //recalculate size of image on every trial, in case window size changed since start of exp
          trial.stimulus_width = mainwidth;
        },
        on_finish: function(data){
            console.log(data.stimulus);
            if(data.stimulus != null){
                data.distance = data.stimulus.slice(7, data.stimulus.length-5);
                console.log(data.distance);
            }
            //data.distance = data.stimulus
        },
        stimuli: jsPsych.timelineVariable('stimulus'),
        frame_time: 500,
        prompt: jsPsych.timelineVariable('prompt'),
        post_trial_gap: 500,
        data: jsPsych.timelineVariable('data')
    }
    
    var vis_procedure = {
          timeline: [visibilityinstruct, visibilityanim],
          timeline_variables: visStimuli,
          randomize_order: false,
          repetitions: 1
        }
    
    timeline.push(vis_procedure);
    
    visDec2 = {
        prompt: 'Press any key when the target is no longer visible (Animation Option #2)', 
        stimulus: visibilityArray2, 
        data: {condition: condition, test_part: 'visibility', order: "decreasing"}}
    visInc2 = {
        prompt: 'Press any key when the target becomes visible (Animation Option #2)', 
        stimulus: visibilityArray2.slice().reverse(),
        data: {condition: condition, test_part: 'visibility', order: "increasing"}}     
    
    visStimuli2 = [visDec2, visInc2, visDec2, visInc2];
    
        var visibilityinstruct2 = {
        type: "html-button-response",
          stimulus: jsPsych.timelineVariable('prompt'),
          choices: ["Ready"],
          post_trial_gap: 100
    }
    
    var visibilityanim2 = {
        type: "animation2",
        on_start: function(trial){
          //recalculate size of image on every trial, in case window size changed since start of exp
          trial.stimulus_width = mainwidth;
        },
        stimuli: jsPsych.timelineVariable('stimulus'),
        frame_time: 500,
        prompt: jsPsych.timelineVariable('prompt'),
        post_trial_gap: 500,
        data: jsPsych.timelineVariable('data')
    }
    
    var vis_procedure2 = {
          timeline: [visibilityinstruct2, visibilityanim2],
          timeline_variables: visStimuli2,
          randomize_order: false,
          repetitions: 1
        }
    
    timeline.push(vis_procedure2);
    
//    var visibilityimage = {
//        type: "image-button-response",
//        stimulus: jsPsych.timelineVariable('stimulus'),
//        choices: ["Stop"],
//        trial_duration: 500,
//        //prompt: "stop",
//        data: jsPsych.timelineVariable('data')
//    }
    
//    var if_node3 = {
//        timeline: [visibilityimage],
//        conditional_function: function(){
//        // get the data from the previous trial,
//        // and check which key was pressed
//        var data = jsPsych.data.get().last(1).values()[0];
//        console.log(data);
//       if(data.test_part == "visibility_image" & data.button_pressed == 0){
//            return false;
//        } else {
//            return true;
//        }
//    }
//}
//    
//        var vis_procedure = {
//          timeline: [if_node3],
//          timeline_variables: visStimuli,
//          randomize_order: false,
//          repetitions: 1
//        }
     //timeline.push(vis_procedure);
    
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
//        timeline.push(demographics);

//        
        jsPsych.init({
            //display_element: "experiment-container",
            timeline: timeline,
            //experiment background is getting loaded repeatedly this way - fix that
            preload_images: images.concat(visibilityArray),
            //preload_images: images,
            exclusions: {
                min_width: 1000,
                min_height: 550
              },
            //experiment_width: expwidth,
            on_finish: function() {
                
        //jsPsych.data.displayData();
                jsPsych.data.get().filter([{trial_type: 'survey-html-form'}, {trial_type: 'survey-multi-choice'}, {trial_type: 'animation2'}]).ignore(['trial_type','trial_index','time_elapsed,','internal_node_id']).localSave('csv');
      
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